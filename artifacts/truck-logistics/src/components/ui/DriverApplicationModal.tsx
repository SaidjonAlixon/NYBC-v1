import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Truck,
  User,
  Clock,
  FileText,
  Check,
  ChevronRight,
  Upload,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  ArrowRight,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { useApplicationModal } from "@/contexts/ApplicationModalContext";
import { useLenisControl } from "@/contexts/LenisContext";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { Logo } from "@/components/layout/Logo";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface FileUploadState {
  name: string;
  url: string | null;
  status: "uploading" | "uploaded" | "error";
  error?: string;
}

type FileFieldKey =
  | "licenseFront"
  | "licenseBack"
  | "medicalCard"
  | "truckInspection"
  | "truckEngine"
  | "truckUnderEngine"
  | "truckTires"
  | "registrationCard"
  | "resume";

function isUploaded(field: FileUploadState | null): boolean {
  return field?.status === "uploaded" && !!field.url;
}

const steps = [
  { id: 1, label: "Role", headline: "Choose your path", icon: Truck },
  { id: 2, label: "Contact", headline: "How we reach you", icon: User },
  { id: 3, label: "Credentials", headline: "License & experience", icon: Clock },
  { id: 4, label: "Review", headline: "Confirm & send", icon: FileText },
] as const;

const positions: {
  title: string;
  desc: string;
  tags: string[];
  icon: LucideIcon;
  accent: string;
}[] = [
  {
    title: "Company Driver",
    desc: "Drive our fleet — weekly pay, modern equipment, home time.",
    tags: ["Weekly Pay", "2019+ Fleet", "Regional Routes"],
    icon: Truck,
    accent: "from-primary/20 to-primary/5",
  },
  {
    title: "Owner Operator",
    desc: "Run your own truck with our dispatch and fuel support.",
    tags: ["High % Pay", "Fuel Cards", "24/7 Dispatch"],
    icon: Truck,
    accent: "from-slate-500/15 to-slate-500/5",
  },
  {
    title: "Investor",
    desc: "Partner on fleet growth with transparent returns.",
    tags: ["Partnership", "Fleet Growth", "Long-term"],
    icon: TrendingUp,
    accent: "from-amber-500/15 to-amber-500/5",
  },
];

interface FormData {
  position: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  cdlType: string;
  experience: string;
  licenseFront: FileUploadState | null;
  licenseBack: FileUploadState | null;
  medicalCard: FileUploadState | null;
  truckInspection: FileUploadState | null;
  truckEngine: FileUploadState | null;
  truckUnderEngine: FileUploadState | null;
  truckTires: FileUploadState | null;
  registrationCard: FileUploadState | null;
  resume: FileUploadState | null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Step2Field = "firstName" | "lastName" | "email" | "phone" | "address";

function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

function isValidUsPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return true;
  return digits.length === 11 && digits.startsWith("1");
}

function formatUsPhone(input: string): string {
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("1") && digits.length > 10) {
    digits = digits.slice(1);
  }
  digits = digits.slice(0, 10);
  if (!digits.length) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function getStep2Errors(form: FormData): Partial<Record<Step2Field, string>> {
  const errors: Partial<Record<Step2Field, string>> = {};
  if (!form.firstName.trim()) errors.firstName = "First name is required";
  if (!form.lastName.trim()) errors.lastName = "Last name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!isValidEmail(form.email)) errors.email = "Enter a valid email address";
  if (!form.phone.trim()) errors.phone = "Phone is required";
  else if (!isValidUsPhone(form.phone)) errors.phone = "Enter a valid US phone number";
  if (!form.address.trim()) errors.address = "Home address is required";
  return errors;
}

const emptyForm: FormData = {
  position: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  cdlType: "",
  experience: "",
  licenseFront: null,
  licenseBack: null,
  medicalCard: null,
  truckInspection: null,
  truckEngine: null,
  truckUnderEngine: null,
  truckTires: null,
  registrationCard: null,
  resume: null,
};

export function DriverApplicationModal() {
  const { isOpen, closeModal } = useApplicationModal();
  const lenis = useLenisControl();
  useBodyScrollLock(isOpen);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [step2Touched, setStep2Touched] = useState<Partial<Record<Step2Field, boolean>>>({});
  const [step2Attempted, setStep2Attempted] = useState(false);

  const currentStep = steps[step - 1];
  const progress = Math.round((step / steps.length) * 100);
  const isOwnerOperator = form.position === "Owner Operator";
  const isCompanyDriver = form.position === "Company Driver";
  const isInvestor = form.position === "Investor";

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      setStep(1);
      setSubmitted(false);
      setSubmitError(null);
      setForm(emptyForm);
      setStep2Touched({});
      setStep2Attempted(false);
    } else {
      lenis?.start();
    }
    return () => lenis?.start();
  }, [isOpen, lenis]);

  const step2Errors = getStep2Errors(form);
  const isStep2Valid = Object.keys(step2Errors).length === 0;

  const showStep2Error = (field: Step2Field) => {
    const message = step2Errors[field];
    if (!message) return false;
    if (step2Attempted || step2Touched[field]) return true;
    if (field === "email" && form.email.trim()) return true;
    if (field === "phone" && form.phone.trim()) return true;
    return false;
  };

  const markStep2Touched = (field: Step2Field) => {
    setStep2Touched((prev) => ({ ...prev, [field]: true }));
  };

  const isAnyFileUploading = (
    [
      "licenseFront",
      "licenseBack",
      "medicalCard",
      "truckInspection",
      "truckEngine",
      "truckUnderEngine",
      "truckTires",
      "registrationCard",
      "resume",
    ] as FileFieldKey[]
  ).some((key) => form[key]?.status === "uploading");

  const handleFileUpload = async (field: FileFieldKey, file: File | null) => {
    if (!file) {
      setForm((f) => ({ ...f, [field]: null }));
      return;
    }

    setForm((f) => ({
      ...f,
      [field]: { name: file.name, url: null, status: "uploading" },
    }));

    try {
      const { uploadToBlob } = await import("@/lib/api");
      const url = await uploadToBlob(file);
      setForm((f) => ({
        ...f,
        [field]: { name: file.name, url, status: "uploaded" },
      }));
    } catch (err) {
      setForm((f) => ({
        ...f,
        [field]: {
          name: file.name,
          url: null,
          status: "error",
          error: err instanceof Error ? err.message : "Upload failed",
        },
      }));
    }
  };

  const handleContinue = () => {
    if (step === 2 && !isStep2Valid) {
      setStep2Attempted(true);
      return;
    }
    setStep((s) => s + 1);
  };

  const canContinue = () => {
    if (step === 1) return !!form.position;
    if (step === 2) return isStep2Valid;
    if (step === 3) {
      if (isAnyFileUploading) return false;
      if (isOwnerOperator || isInvestor) return true;
      return !!(form.cdlType && form.experience);
    }
    return true;
  };

  const handleSubmit = async () => {
    if (isAnyFileUploading) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      const { submitDriverApplication } = await import("@/lib/api");

      const docFields: { key: FileFieldKey; label: string }[] = [
        { key: "licenseFront", label: "Driver License (Front)" },
        { key: "licenseBack", label: "Driver License (Back)" },
        { key: "medicalCard", label: "Medical Card" },
        { key: "truckInspection", label: "Annual Truck Inspection" },
        { key: "truckEngine", label: "Truck Photo — Engine" },
        { key: "truckUnderEngine", label: "Truck Photo — Under Engine" },
        { key: "truckTires", label: "Truck Photo — Tires" },
        { key: "registrationCard", label: "Registration Card (Cap Card)" },
        { key: "resume", label: "Resume" },
      ];

      const documents = docFields
        .filter(({ key }) => isUploaded(form[key]))
        .map(({ key, label }) => ({ label, url: form[key]!.url! }));

      await submitDriverApplication({
        position: form.position,
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        phone: form.phone,
        address: form.address,
        cdlType: form.cdlType,
        experience: form.experience,
        documents,
      });
      setSubmitted(true);
      setTimeout(() => {
        closeModal();
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[200] bg-[hsl(223_55%_6%)]/80 backdrop-blur-md"
            onClick={closeModal}
            onWheel={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed inset-0 z-[201] flex items-end justify-center p-0 sm:items-center sm:p-4 md:p-6"
          >
            <div
              className="pointer-events-auto flex h-[100dvh] w-full max-w-[920px] flex-col overflow-hidden bg-background shadow-[0_32px_80px_rgba(0,0,0,0.45)] sm:h-auto sm:max-h-[min(92vh,680px)] sm:flex-row sm:rounded-2xl sm:border sm:border-border/80"
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="driver-app-title"
            >
              {submitted ? (
                <SuccessPanel />
              ) : (
                <>
                  {/* —— Left rail —— */}
                  <aside className="relative flex shrink-0 flex-col bg-primary text-primary-foreground sm:w-[240px] md:w-[260px]">
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.12]"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                      }}
                      aria-hidden
                    />

                    <div className="relative flex items-center justify-between px-4 py-4 sm:flex-col sm:items-stretch sm:px-5 sm:py-6">
                      <div className="rounded-lg bg-white px-2.5 py-1.5 shadow-sm sm:mx-auto">
                        <Logo className="h-8 w-auto sm:h-9" />
                      </div>
                      <button
                        data-testid="button-close-modal"
                        onClick={closeModal}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20 sm:absolute sm:right-4 sm:top-4"
                        aria-label="Close application form"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* Mobile step strip */}
                    <div className="flex gap-1.5 overflow-x-auto px-4 pb-3 sm:hidden">
                      {steps.map((s) => (
                        <span
                          key={s.id}
                          className={cn(
                            "shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider",
                            step === s.id ? "bg-white text-primary" : "bg-white/15 text-white/70",
                          )}
                        >
                          {s.label}
                        </span>
                      ))}
                    </div>

                    {/* Desktop vertical nav */}
                    <nav className="relative hidden flex-1 flex-col gap-1 px-4 pb-6 sm:flex" aria-label="Application steps">
                      {steps.map((s) => {
                        const Icon = s.icon;
                        const done = step > s.id;
                        const active = step === s.id;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            disabled={!done && !active}
                            onClick={() => done && setStep(s.id)}
                            className={cn(
                              "flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-all",
                              active && "bg-white/15 shadow-inner",
                              done && !active && "cursor-pointer hover:bg-white/10",
                              !active && !done && "opacity-45",
                            )}
                          >
                            <span
                              className={cn(
                                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold",
                                active || done ? "bg-white text-primary" : "bg-white/10 text-white/60",
                              )}
                            >
                              {done ? <Check size={16} strokeWidth={3} /> : s.id}
                            </span>
                            <div className="min-w-0">
                              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">{s.label}</p>
                              <p className="truncate text-sm font-semibold">{s.headline}</p>
                            </div>
                          </button>
                        );
                      })}
                    </nav>

                    <div className="relative hidden px-5 pb-6 sm:block">
                      <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/60">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/20">
                        <motion.div
                          className="h-full rounded-full bg-white"
                          initial={false}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-white/70">
                        <Shield size={14} className="mt-0.5 shrink-0" />
                        Your info stays private. Recruiters respond within 24–48 hrs.
                      </p>
                    </div>
                  </aside>

                  {/* —— Main panel —— */}
                  <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-background">
                    <header className="shrink-0 border-b border-border px-5 py-5 sm:px-8 sm:py-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary">
                        Driver application · Step {step} of {steps.length}
                      </p>
                      <h2 id="driver-app-title" className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        {currentStep.headline}
                      </h2>
                    </header>

                    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8">
                      <AnimatePresence mode="wait">
                        {step === 1 && (
                          <StepPanel stepKey="step1">
                            <p className="mb-5 max-w-md text-sm text-muted-foreground">
                              Select the role that fits you. All paths include 24/7 dispatch support.
                            </p>
                            <div className="grid gap-3 sm:grid-cols-1">
                              {positions.map((pos) => {
                                const PosIcon = pos.icon;
                                const selected = form.position === pos.title;
                                return (
                                  <button
                                    key={pos.title}
                                    type="button"
                                    data-testid={`button-position-${pos.title.toLowerCase().replace(/\s+/g, "-")}`}
                                    onClick={() => setForm((f) => ({ ...f, position: pos.title }))}
                                    className={cn(
                                      "group relative overflow-hidden rounded-xl border-2 p-0 text-left transition-all duration-200",
                                      selected
                                        ? "border-primary shadow-[0_8px_28px_hsl(var(--primary)/0.2)]"
                                        : "border-border hover:border-primary/40",
                                    )}
                                  >
                                    <div className={cn("absolute inset-0 bg-gradient-to-r opacity-80", pos.accent)} />
                                    <div className="relative flex items-stretch gap-0">
                                      <div
                                        className={cn(
                                          "flex w-14 shrink-0 items-center justify-center sm:w-16",
                                          selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                                        )}
                                      >
                                        <PosIcon size={22} />
                                      </div>
                                      <div className="flex flex-1 items-center justify-between gap-3 p-4">
                                        <div>
                                          <p className="font-bold text-foreground">{pos.title}</p>
                                          <p className="mt-0.5 text-xs text-muted-foreground">{pos.desc}</p>
                                          <div className="mt-2 flex flex-wrap gap-1.5">
                                            {pos.tags.map((tag) => (
                                              <span
                                                key={tag}
                                                className="rounded-md bg-background/80 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
                                              >
                                                {tag}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                        <div
                                          className={cn(
                                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                                            selected ? "border-primary bg-primary" : "border-border bg-background",
                                          )}
                                        >
                                          {selected && <Check size={12} className="text-primary-foreground" strokeWidth={3} />}
                                        </div>
                                      </div>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </StepPanel>
                        )}

                        {step === 2 && (
                          <StepPanel stepKey="step2">
                            <div className="grid max-w-lg gap-4 sm:grid-cols-2">
                              <FormField
                                label="First name"
                                required
                                icon={<User size={14} />}
                                placeholder="John"
                                value={form.firstName}
                                error={showStep2Error("firstName") ? step2Errors.firstName : undefined}
                                onChange={(v) => setForm((f) => ({ ...f, firstName: v }))}
                                onBlur={() => markStep2Touched("firstName")}
                                testId="input-first-name"
                              />
                              <FormField
                                label="Last name"
                                required
                                icon={<User size={14} />}
                                placeholder="Doe"
                                value={form.lastName}
                                error={showStep2Error("lastName") ? step2Errors.lastName : undefined}
                                onChange={(v) => setForm((f) => ({ ...f, lastName: v }))}
                                onBlur={() => markStep2Touched("lastName")}
                                testId="input-last-name"
                              />
                            </div>
                            <div className="mt-4 max-w-lg space-y-4">
                              <FormField
                                label="Email"
                                required
                                icon={<Mail size={14} />}
                                placeholder="john@example.com"
                                type="email"
                                value={form.email}
                                error={showStep2Error("email") ? step2Errors.email : undefined}
                                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                                onBlur={() => markStep2Touched("email")}
                                testId="input-email"
                              />
                              <FormField
                                label="Phone"
                                required
                                icon={<Phone size={14} />}
                                placeholder="(816) 608-8636"
                                type="tel"
                                inputMode="tel"
                                value={form.phone}
                                error={showStep2Error("phone") ? step2Errors.phone : undefined}
                                onChange={(v) => setForm((f) => ({ ...f, phone: formatUsPhone(v) }))}
                                onBlur={() => markStep2Touched("phone")}
                                testId="input-phone"
                              />
                              <FormField
                                label="Home address"
                                required
                                icon={<MapPin size={14} />}
                                placeholder="City, State, ZIP"
                                value={form.address}
                                error={showStep2Error("address") ? step2Errors.address : undefined}
                                onChange={(v) => setForm((f) => ({ ...f, address: v }))}
                                onBlur={() => markStep2Touched("address")}
                                testId="input-address"
                              />
                            </div>
                          </StepPanel>
                        )}

                        {step === 3 && (
                          <StepPanel stepKey="step3">
                            <div className="max-w-xl space-y-5">
                              {isCompanyDriver && (
                                <>
                                  <div>
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                      CDL class
                                    </label>
                                    <select
                                      data-testid="select-cdl-type"
                                      value={form.cdlType}
                                      onChange={(e) => setForm((f) => ({ ...f, cdlType: e.target.value }))}
                                      className="w-full rounded-lg border-2 border-border bg-muted/30 px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    >
                                      <option value="">Select CDL type…</option>
                                      <option value="A">Class A — Tractor-trailer</option>
                                      <option value="B">Class B — Heavy straight</option>
                                      <option value="C">Class C — Passengers / Hazmat</option>
                                    </select>
                                  </div>

                                  <div>
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                      Years of experience
                                    </label>
                                    <input
                                      data-testid="input-experience-years"
                                      type="number"
                                      min="0"
                                      max="50"
                                      placeholder="e.g. 3"
                                      value={form.experience}
                                      onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))}
                                      className="w-full rounded-lg border-2 border-border bg-muted/30 px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                  </div>
                                </>
                              )}

                              {isOwnerOperator ? (
                                <>
                                  <LicenseUploadPair
                                    frontValue={form.licenseFront}
                                    backValue={form.licenseBack}
                                    onFront={(file) => handleFileUpload("licenseFront", file)}
                                    onBack={(file) => handleFileUpload("licenseBack", file)}
                                  />
                                  <FileUploadField
                                    label="Medical card"
                                    testId="upload-medical-card"
                                    hint="PDF, JPG, PNG up to 10MB"
                                    value={form.medicalCard}
                                    onChange={(file) => handleFileUpload("medicalCard", file)}
                                  />
                                  <FileUploadField
                                    label="Annual truck inspection"
                                    testId="upload-truck-inspection"
                                    hint="PDF, JPG, PNG up to 10MB"
                                    value={form.truckInspection}
                                    onChange={(file) => handleFileUpload("truckInspection", file)}
                                  />
                                  <TruckPhotosUpload
                                    engine={form.truckEngine}
                                    underEngine={form.truckUnderEngine}
                                    tires={form.truckTires}
                                    onEngine={(file) => handleFileUpload("truckEngine", file)}
                                    onUnderEngine={(file) => handleFileUpload("truckUnderEngine", file)}
                                    onTires={(file) => handleFileUpload("truckTires", file)}
                                  />
                                  <ResumeUpload
                                    value={form.resume}
                                    onChange={(file) => handleFileUpload("resume", file)}
                                  />
                                </>
                              ) : isCompanyDriver ? (
                                <>
                                  <LicenseUploadPair
                                    frontValue={form.licenseFront}
                                    backValue={form.licenseBack}
                                    onFront={(file) => handleFileUpload("licenseFront", file)}
                                    onBack={(file) => handleFileUpload("licenseBack", file)}
                                  />
                                  <FileUploadField
                                    label="Medical card"
                                    testId="upload-medical-card"
                                    hint="PDF, JPG, PNG up to 10MB"
                                    value={form.medicalCard}
                                    onChange={(file) => handleFileUpload("medicalCard", file)}
                                  />
                                  <ResumeUpload
                                    value={form.resume}
                                    onChange={(file) => handleFileUpload("resume", file)}
                                  />
                                </>
                              ) : isInvestor ? (
                                <>
                                  <FileUploadField
                                    label="Registration card (cap card)"
                                    testId="upload-registration-card"
                                    hint="PDF, JPG, PNG up to 10MB"
                                    value={form.registrationCard}
                                    onChange={(file) => handleFileUpload("registrationCard", file)}
                                  />
                                  <FileUploadField
                                    label="Annual truck inspection"
                                    testId="upload-truck-inspection"
                                    hint="PDF, JPG, PNG up to 10MB"
                                    value={form.truckInspection}
                                    onChange={(file) => handleFileUpload("truckInspection", file)}
                                  />
                                  <TruckPhotosUpload
                                    engine={form.truckEngine}
                                    underEngine={form.truckUnderEngine}
                                    tires={form.truckTires}
                                    onEngine={(file) => handleFileUpload("truckEngine", file)}
                                    onUnderEngine={(file) => handleFileUpload("truckUnderEngine", file)}
                                    onTires={(file) => handleFileUpload("truckTires", file)}
                                  />
                                </>
                              ) : null}
                            </div>
                          </StepPanel>
                        )}

                        {step === 4 && (
                          <StepPanel stepKey="step4">
                            <p className="mb-5 text-sm text-muted-foreground">
                              Double-check your details before sending to our recruitment team.
                            </p>
                            <div className="max-w-lg overflow-hidden rounded-xl border border-border">
                              {[
                                { label: "Role", value: form.position },
                                { label: "Name", value: `${form.firstName} ${form.lastName}` },
                                { label: "Email", value: form.email },
                                { label: "Phone", value: form.phone },
                                { label: "Address", value: form.address || "—" },
                                ...(isCompanyDriver
                                  ? [
                                      { label: "CDL", value: form.cdlType ? `Class ${form.cdlType}` : "—" },
                                      { label: "Experience", value: form.experience ? `${form.experience} yrs` : "—" },
                                      {
                                        label: "License",
                                        value:
                                          isUploaded(form.licenseFront) && isUploaded(form.licenseBack)
                                            ? "Uploaded"
                                            : "—",
                                      },
                                      { label: "Medical card", value: isUploaded(form.medicalCard) ? "Uploaded" : "—" },
                                    ]
                                  : []),
                                ...(isOwnerOperator
                                  ? [
                                      {
                                        label: "License",
                                        value:
                                          isUploaded(form.licenseFront) && isUploaded(form.licenseBack)
                                            ? "Uploaded"
                                            : "—",
                                      },
                                      { label: "Medical card", value: isUploaded(form.medicalCard) ? "Uploaded" : "—" },
                                      {
                                        label: "Truck inspection",
                                        value: isUploaded(form.truckInspection) ? "Uploaded" : "—",
                                      },
                                      {
                                        label: "Truck photos",
                                        value:
                                          isUploaded(form.truckEngine) &&
                                          isUploaded(form.truckUnderEngine) &&
                                          isUploaded(form.truckTires)
                                            ? "Uploaded"
                                            : "—",
                                      },
                                    ]
                                  : []),
                                ...(isInvestor
                                  ? [
                                      {
                                        label: "Registration card",
                                        value: isUploaded(form.registrationCard) ? "Uploaded" : "—",
                                      },
                                      {
                                        label: "Truck inspection",
                                        value: isUploaded(form.truckInspection) ? "Uploaded" : "—",
                                      },
                                      {
                                        label: "Truck photos",
                                        value:
                                          isUploaded(form.truckEngine) &&
                                          isUploaded(form.truckUnderEngine) &&
                                          isUploaded(form.truckTires)
                                            ? "Uploaded"
                                            : "—",
                                      },
                                    ]
                                  : []),
                              ].map(({ label, value }, i) => (
                                <div
                                  key={label}
                                  className={cn(
                                    "flex items-center justify-between gap-4 px-4 py-3.5",
                                    i % 2 === 0 ? "bg-muted/40" : "bg-background",
                                  )}
                                >
                                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
                                  <span className="text-right text-sm font-semibold text-foreground">{value || "—"}</span>
                                </div>
                              ))}
                            </div>
                            <p className="mt-5 max-w-lg text-xs leading-relaxed text-muted-foreground">
                              By submitting, you agree to NYBC Trucking&apos;s privacy policy and consent to recruitment contact.
                            </p>
                          </StepPanel>
                        )}
                      </AnimatePresence>
                    </div>

                    <footer className="shrink-0 border-t border-border bg-muted/20 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8">
                      {submitError && (
                        <p className="mb-3 text-center text-sm font-semibold text-destructive">{submitError}</p>
                      )}
                      <div className="flex items-center gap-3">
                        {step > 1 ? (
                          <button
                            type="button"
                            data-testid="button-back"
                            onClick={() => setStep((s) => s - 1)}
                            className="rounded-lg border border-border px-4 py-3 text-sm font-bold text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                          >
                            Back
                          </button>
                        ) : (
                          <div className="hidden w-[72px] sm:block" />
                        )}

                        <div className="flex-1 sm:hidden">
                          <div className="h-1 overflow-hidden rounded-full bg-border">
                            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
                          </div>
                        </div>

                        {step < 4 ? (
                          <button
                            type="button"
                            data-testid="button-continue"
                            onClick={handleContinue}
                            disabled={!canContinue()}
                            className="ml-auto flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[0_6px_24px_hsl(var(--primary)/0.35)] transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none sm:px-10"
                          >
                            Continue
                            <ArrowRight size={16} />
                          </button>
                        ) : (
                          <button
                            type="button"
                            data-testid="button-submit-application"
                            onClick={handleSubmit}
                            disabled={submitting || isAnyFileUploading}
                            className="ml-auto flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[0_6px_24px_hsl(var(--primary)/0.35)] transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none sm:px-10"
                          >
                            {submitting ? "Uploading…" : "Submit application"}
                            <Check size={16} />
                          </button>
                        )}
                      </div>
                    </footer>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function StepPanel({ stepKey, children }: { stepKey: string; children: React.ReactNode }) {
  return (
    <motion.div
      key={stepKey}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SuccessPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center sm:py-24"
    >
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/15">
        <Check size={40} className="text-emerald-600 dark:text-emerald-400" strokeWidth={2.5} />
      </div>
      <h2 className="mb-2 text-2xl font-bold text-emerald-700 dark:text-emerald-400">You&apos;re on the list!</h2>
      <p className="max-w-sm text-emerald-700/70 dark:text-emerald-400/80">
        Application sent successfully. Our team will reach out within 24–48 hours.
      </p>
    </motion.div>
  );
}

function FormField({
  label,
  icon,
  placeholder,
  type = "text",
  inputMode,
  required = false,
  value,
  error,
  onChange,
  onBlur,
  testId,
}: {
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  required?: boolean;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  testId: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
        <input
          data-testid={testId}
          type={type}
          inputMode={inputMode}
          placeholder={placeholder}
          value={value}
          required={required}
          aria-invalid={!!error}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={cn(
            "w-full rounded-lg border-2 bg-muted/30 py-3 pl-10 pr-4 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2",
            error
              ? "border-destructive focus:border-destructive focus:ring-destructive/20"
              : "border-border focus:border-primary focus:ring-primary/20",
          )}
        />
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

function uploadStatusLabel(value: FileUploadState | null, hint: string): string {
  if (!value) return hint;
  if (value.status === "uploading") return "Uploading…";
  if (value.status === "uploaded") return "Uploaded";
  if (value.status === "error") return value.error ?? "Upload failed";
  return hint;
}

function LicenseUploadPair({
  frontValue,
  backValue,
  onFront,
  onBack,
}: {
  frontValue: FileUploadState | null;
  backValue: FileUploadState | null;
  onFront: (file: File | null) => void;
  onBack: (file: File | null) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Driver license (both sides)
      </label>
      <div className="grid grid-cols-2 gap-3">
        <FileDropSlot
          testId="upload-license-front-side"
          title="Front side"
          hint="PDF, JPG, PNG"
          value={frontValue}
          onChange={onFront}
        />
        <FileDropSlot
          testId="upload-license-back-side"
          title="Back side"
          hint="PDF, JPG, PNG"
          value={backValue}
          onChange={onBack}
        />
      </div>
    </div>
  );
}

function TruckPhotosUpload({
  engine,
  underEngine,
  tires,
  onEngine,
  onUnderEngine,
  onTires,
}: {
  engine: FileUploadState | null;
  underEngine: FileUploadState | null;
  tires: FileUploadState | null;
  onEngine: (file: File | null) => void;
  onUnderEngine: (file: File | null) => void;
  onTires: (file: File | null) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Please upload truck pictures (engine, under engine, tires)
      </label>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <FileDropSlot testId="upload-truck-engine" title="Engine" value={engine} onChange={onEngine} compact />
        <FileDropSlot
          testId="upload-truck-under-engine"
          title="Under engine"
          value={underEngine}
          onChange={onUnderEngine}
          compact
        />
        <FileDropSlot testId="upload-truck-tires" title="Tires" value={tires} onChange={onTires} compact />
      </div>
    </div>
  );
}

function FileUploadField({
  label,
  testId,
  hint,
  value,
  onChange,
}: {
  label: string;
  testId: string;
  hint: string;
  value: FileUploadState | null;
  onChange: (file: File | null) => void;
}) {
  const uploaded = value?.status === "uploaded";
  const uploading = value?.status === "uploading";
  const errored = value?.status === "error";

  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</label>
      <label
        data-testid={testId}
        className={cn(
          "flex items-center gap-3 rounded-lg border-2 border-dashed p-4 transition-colors",
          uploading ? "cursor-wait" : "cursor-pointer",
          uploaded
            ? "border-emerald-500 bg-emerald-500/10"
            : uploading
              ? "border-primary/40 bg-primary/5"
              : errored
                ? "border-destructive bg-destructive/5"
                : "border-border bg-muted/20 hover:border-primary/50 hover:bg-primary/5",
        )}
      >
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
            uploaded
              ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
              : uploading
                ? "bg-primary/15 text-primary"
                : errored
                  ? "bg-destructive/15 text-destructive"
                  : "bg-muted text-muted-foreground",
          )}
        >
          {uploading ? (
            <Spinner className="size-[18px]" />
          ) : uploaded ? (
            <Check size={18} strokeWidth={2.5} />
          ) : (
            <Upload size={18} />
          )}
        </span>
        <div className="min-w-0">
          <p
            className={cn(
              "truncate text-xs font-semibold",
              uploaded
                ? "text-emerald-700 dark:text-emerald-400"
                : errored
                  ? "text-destructive"
                  : "text-foreground",
            )}
          >
            {value?.name || "Choose file"}
          </p>
          <p
            className={cn(
              "text-[10px]",
              uploaded
                ? "text-emerald-600/80 dark:text-emerald-400/80"
                : errored
                  ? "text-destructive/80"
                  : "text-muted-foreground",
            )}
          >
            {uploadStatusLabel(value, hint)}
          </p>
        </div>
        <input
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
          disabled={uploading}
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      </label>
    </div>
  );
}

function ResumeUpload({
  value,
  onChange,
}: {
  value: FileUploadState | null;
  onChange: (file: File | null) => void;
}) {
  const uploaded = value?.status === "uploaded";
  const uploading = value?.status === "uploading";
  const errored = value?.status === "error";
  const resumeHint = "PDF, DOCX up to 10MB — click or drag and drop";

  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Resume / work history <span className="font-normal normal-case text-muted-foreground/70">(optional)</span>
      </label>
      <label
        data-testid="upload-resume"
        className={cn(
          "flex items-center gap-3 rounded-lg border-2 border-dashed p-4 transition-colors",
          uploading ? "cursor-wait" : "cursor-pointer",
          uploaded
            ? "border-emerald-500 bg-emerald-500/10"
            : uploading
              ? "border-primary/40 bg-primary/5"
              : errored
                ? "border-destructive bg-destructive/5"
                : "border-border bg-muted/20 hover:border-primary/50 hover:bg-primary/5",
        )}
      >
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
            uploaded
              ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
              : uploading
                ? "bg-primary/15 text-primary"
                : errored
                  ? "bg-destructive/15 text-destructive"
                  : "bg-muted text-muted-foreground",
          )}
        >
          {uploading ? (
            <Spinner className="size-[18px]" />
          ) : uploaded ? (
            <Check size={18} strokeWidth={2.5} />
          ) : (
            <FileText size={18} />
          )}
        </span>
        <div className="min-w-0">
          <p
            className={cn(
              "truncate text-xs font-semibold",
              uploaded
                ? "text-emerald-700 dark:text-emerald-400"
                : errored
                  ? "text-destructive"
                  : "text-foreground",
            )}
          >
            {value?.name || "Attach resume (optional)"}
          </p>
          <p
            className={cn(
              "text-[10px]",
              uploaded
                ? "text-emerald-600/80 dark:text-emerald-400/80"
                : errored
                  ? "text-destructive/80"
                  : "text-muted-foreground",
            )}
          >
            {uploadStatusLabel(value, resumeHint)}
          </p>
        </div>
        <input
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx"
          disabled={uploading}
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      </label>
    </div>
  );
}

function FileDropSlot({
  testId,
  title,
  hint = "Choose file",
  value,
  onChange,
  compact = false,
}: {
  testId: string;
  title: string;
  hint?: string;
  value: FileUploadState | null;
  onChange: (file: File | null) => void;
  compact?: boolean;
}) {
  const uploaded = value?.status === "uploaded";
  const uploading = value?.status === "uploading";
  const errored = value?.status === "error";

  return (
    <label
      data-testid={testId}
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed text-center transition-colors",
        compact ? "p-4" : "p-5",
        uploading ? "cursor-wait" : "cursor-pointer",
        uploaded
          ? "border-emerald-500 bg-emerald-500/10"
          : uploading
            ? "border-primary/40 bg-primary/5"
            : errored
              ? "border-destructive bg-destructive/5"
              : "border-border bg-muted/20 hover:border-primary/50 hover:bg-primary/5",
      )}
    >
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg",
          uploaded
            ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
            : uploading
              ? "bg-primary/15 text-primary"
              : errored
                ? "bg-destructive/15 text-destructive"
                : "bg-muted text-muted-foreground",
        )}
      >
        {uploading ? (
          <Spinner className="size-4" />
        ) : uploaded ? (
          <Check size={16} strokeWidth={2.5} />
        ) : (
          <Upload size={16} />
        )}
      </span>
      <span
        className={cn(
          "text-xs font-bold uppercase tracking-wide",
          uploaded ? "text-emerald-700 dark:text-emerald-400" : errored ? "text-destructive" : "text-foreground",
        )}
      >
        {title}
      </span>
      <span
        className={cn(
          "truncate px-2 text-[10px]",
          uploaded
            ? "text-emerald-600/80 dark:text-emerald-400/80"
            : errored
              ? "text-destructive/80"
              : "text-muted-foreground",
        )}
      >
        {value?.status === "uploading"
          ? "Uploading…"
          : value?.status === "uploaded"
            ? value.name
            : value?.status === "error"
              ? (value.error ?? "Upload failed")
              : value?.name || hint}
      </span>
      <input
        type="file"
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png"
        disabled={uploading}
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </label>
  );
}

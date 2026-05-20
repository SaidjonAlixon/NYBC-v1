import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Truck, User, Clock, FileText, Check, ChevronLeft, ChevronRight, Upload, Phone, Mail, MapPin, TrendingUp, type LucideIcon } from "lucide-react";
import { useApplicationModal } from "@/contexts/ApplicationModalContext";
import { useLenisControl } from "@/contexts/LenisContext";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "POSITION", icon: Truck },
  { id: 2, label: "CONTACT", icon: User },
  { id: 3, label: "EXPERIENCE", icon: Clock },
  { id: 4, label: "REVIEW", icon: FileText },
];

/** Full-width section rule — visible in dark mode like light-theme reference */
function ModalDivider() {
  return <div role="separator" aria-hidden className="h-px w-full shrink-0 bg-border dark:bg-white/[0.14]" />;
}

const positions: { title: string; desc: string; tags: string[]; icon: LucideIcon }[] = [
  {
    title: "Company Driver",
    desc: "Drive our trucks and get paid per mile with full benefits",
    tags: ["Weekly Pay", "Modern Fleet", "Home Time"],
    icon: Truck,
  },
  {
    title: "Owner Operator",
    desc: "Bring your own truck and enjoy maximum earnings",
    tags: ["High % Pay", "Fuel Cards", "Dispatch Support", "Flexibility"],
    icon: Truck,
  },
  {
    title: "Investor",
    desc: "Partner with us and invest in fleet growth with transparent returns",
    tags: ["Fleet Growth", "Partnership", "Transparent Returns"],
    icon: TrendingUp,
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
  licenseFile: string;
  medicalCard: string;
}

export function DriverApplicationModal() {
  const { isOpen, closeModal } = useApplicationModal();
  const lenis = useLenisControl();
  useBodyScrollLock(isOpen);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    position: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    cdlType: "",
    experience: "",
    licenseFile: "",
    medicalCard: "",
  });

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      setStep(1);
      setSubmitted(false);
      setSubmitError(null);
      setForm({ position: "", firstName: "", lastName: "", email: "", phone: "", address: "", cdlType: "", experience: "", licenseFile: "", medicalCard: "" });
    } else {
      lenis?.start();
    }
    return () => {
      lenis?.start();
    };
  }, [isOpen, lenis]);

  const canContinue = () => {
    if (step === 1) return !!form.position;
    if (step === 2) return !!(form.firstName && form.lastName && form.email && form.phone);
    if (step === 3) return !!(form.cdlType && form.experience);
    return true;
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    try {
      const { submitDriverApplication } = await import("@/lib/api");
      await submitDriverApplication({
        position: form.position,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        cdlType: form.cdlType,
        experience: form.experience,
      });
      setSubmitted(true);
      setTimeout(() => {
        closeModal();
        setSubmitted(false);
      }, 3000);
    } catch {
      setSubmitError("Failed to submit. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm dark:bg-black/75"
            onClick={closeModal}
            onWheel={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed inset-0 z-[101] flex items-end justify-center p-0 sm:items-center sm:p-4"
          >
            <div
              className="pointer-events-auto flex h-[100dvh] w-full max-w-[540px] flex-col overflow-hidden rounded-none border border-border bg-card text-card-foreground shadow-2xl transition-colors duration-300 sm:h-auto sm:max-h-[min(90vh,720px)] sm:rounded-3xl dark:shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20 px-8 text-center"
                >
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <Check size={40} className="text-primary" />
                  </div>
                  <h2 className="mb-3 text-2xl font-bold text-foreground">Application Submitted!</h2>
                  <p className="text-muted-foreground">Our recruitment team will contact you within 24–48 hours.</p>
                </motion.div>
              ) : (
                <>
                  {/* Logo */}
                  <div className="relative shrink-0 px-4 pb-4 pt-5 sm:px-7 sm:pt-7">
                    <button
                      data-testid="button-close-modal"
                      onClick={closeModal}
                      className="absolute right-4 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground dark:border-white/15 sm:right-7 sm:top-7"
                      aria-label="Close application form"
                    >
                      <X size={16} />
                    </button>

                    <div className="flex justify-center px-10 sm:px-12">
                      <div className="rounded-xl border border-border bg-background px-5 py-3 shadow-sm ring-1 ring-border/60 dark:border-white/15 dark:bg-muted/90 dark:ring-white/10">
                        <Logo className="h-10 w-auto min-w-[132px] sm:h-12 sm:min-w-[148px]" />
                      </div>
                    </div>
                  </div>

                  <ModalDivider />

                  {/* Title + stepper */}
                  <div className="shrink-0 px-4 py-4 sm:px-7 sm:py-5">
                    <h2 className="mb-1 text-center text-xl font-bold text-foreground sm:text-left sm:text-2xl">Driver Application</h2>
                    <p className="text-center text-sm text-muted-foreground sm:text-left">
                      Step {step} of 4 —{" "}
                      <span className="text-foreground/80">{steps[step - 1].label.charAt(0) + steps[step - 1].label.slice(1).toLowerCase()}</span>
                    </p>

                    <div className="mt-5 flex items-center sm:mt-6">
                      {steps.map((s, i) => {
                        const Icon = s.icon;
                        const done = step > s.id;
                        const active = step === s.id;
                        return (
                          <div key={s.id} className="flex flex-1 items-center last:flex-none">
                            <div className="flex flex-col items-center gap-1.5">
                              <div
                                className={cn(
                                  "flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300 sm:h-10 sm:w-10",
                                  done && "border-primary bg-primary",
                                  active && !done && "border-primary bg-card dark:border-primary",
                                  !active && !done && "border-border bg-card dark:border-white/20",
                                )}
                              >
                                {done ? (
                                  <Check size={16} className="text-primary-foreground" strokeWidth={3} />
                                ) : (
                                  <Icon size={16} className={active ? "text-primary" : "text-muted-foreground/50 dark:text-white/35"} />
                                )}
                              </div>
                              <span
                                className={cn(
                                  "hidden text-[10px] font-bold tracking-wider min-[400px]:block",
                                  active || done ? "text-primary" : "text-muted-foreground/50",
                                )}
                              >
                                {s.label}
                              </span>
                            </div>
                            {i < steps.length - 1 && (
                              <div
                                className={cn(
                                  "mx-2 mb-5 h-[2px] flex-1 rounded transition-all duration-300",
                                  done ? "bg-primary" : "bg-border dark:bg-white/12",
                                )}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <ModalDivider />

                  {/* Body */}
                  <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-7">
                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                        >
                          <p className="mb-5 text-sm text-muted-foreground">
                            Choose the position that best matches your situation. We welcome all experience levels.
                          </p>
                          <div className="space-y-3">
                            {positions.map((pos) => {
                              const PosIcon = pos.icon;
                              return (
                              <button
                                key={pos.title}
                                data-testid={`button-position-${pos.title.toLowerCase().replace(/\s+/g, "-")}`}
                                onClick={() => setForm((f) => ({ ...f, position: pos.title }))}
                                className={cn(
                                  "w-full rounded-2xl border-2 p-4 text-left transition-all duration-200",
                                  form.position === pos.title
                                    ? "border-primary bg-primary/10 dark:bg-primary/15"
                                    : "border-border hover:border-primary/30 dark:border-white/15 dark:hover:border-primary/40",
                                )}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex items-start gap-3">
                                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted">
                                      <PosIcon size={16} className="text-muted-foreground" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-bold text-foreground">{pos.title}</p>
                                      <p className="mt-0.5 text-xs text-muted-foreground">{pos.desc}</p>
                                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                                        {pos.tags.map((tag) => (
                                          <span key={tag} className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                                            {tag}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  <div className={cn(
                                    "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                                    form.position === pos.title ? "border-primary bg-primary" : "border-border",
                                  )}>
                                    {form.position === pos.title && <div className="h-2 w-2 rounded-full bg-primary-foreground" />}
                                  </div>
                                </div>
                              </button>
                            );
                            })}
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <FormField label="FIRST NAME" icon={<User size={14} />} placeholder="John" value={form.firstName} onChange={(v) => setForm((f) => ({ ...f, firstName: v }))} testId="input-first-name" />
                            <FormField label="LAST NAME" icon={<User size={14} />} placeholder="Doe" value={form.lastName} onChange={(v) => setForm((f) => ({ ...f, lastName: v }))} testId="input-last-name" />
                          </div>
                          <FormField label="EMAIL ADDRESS" icon={<Mail size={14} />} placeholder="john@example.com" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} testId="input-email" />
                          <FormField label="PHONE NUMBER" icon={<Phone size={14} />} placeholder="(555) 000-0000" type="tel" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} testId="input-phone" />
                          <FormField label="HOME ADDRESS" icon={<MapPin size={14} />} placeholder="City, State, ZIP" value={form.address} onChange={(v) => setForm((f) => ({ ...f, address: v }))} testId="input-address" />
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-5"
                        >
                          <div>
                            <label className="mb-2 block text-[10px] font-bold tracking-widest text-muted-foreground">CHOOSE YOUR CDL TYPE</label>
                            <select
                              data-testid="select-cdl-type"
                              value={form.cdlType}
                              onChange={(e) => setForm((f) => ({ ...f, cdlType: e.target.value }))}
                              className="w-full appearance-none rounded-xl border-2 border-border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none"
                            >
                              <option value="">Select CDL Type...</option>
                              <option value="A">Class A — Full Tractor-Trailer</option>
                              <option value="B">Class B — Heavy Straight Vehicle</option>
                              <option value="C">Class C — Passengers/Hazmat</option>
                            </select>
                          </div>

                          <div>
                            <label className="mb-2 block text-[10px] font-bold tracking-widest text-muted-foreground">YEARS OF COMMERCIAL DRIVING EXPERIENCE?</label>
                            <input
                              data-testid="input-experience-years"
                              type="number"
                              min="0"
                              max="50"
                              placeholder="e.g. 3"
                              value={form.experience}
                              onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))}
                              className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-[10px] font-bold tracking-widest text-muted-foreground">DRIVER LICENSE (BOTH SIDES)</label>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                              {["Front side", "Back side"].map((side) => (
                                <label key={side} data-testid={`upload-license-${side.toLowerCase().replace(" ", "-")}`} className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-4 transition-all hover:border-primary/50 hover:bg-primary/5">
                                  <Upload size={18} className="text-muted-foreground" />
                                  <span className="text-xs font-semibold text-muted-foreground">{side}</span>
                                  <span className="text-[10px] text-muted-foreground/70">PDF, JPG, PNG</span>
                                  <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                                </label>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="mb-2 block text-[10px] font-bold tracking-widest text-muted-foreground">MEDICAL CARD</label>
                            <label data-testid="upload-medical-card" className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-border p-4 transition-all hover:border-primary/50 hover:bg-primary/5">
                              <Upload size={18} className="shrink-0 text-muted-foreground" />
                              <div>
                                <p className="text-xs font-semibold text-foreground">Choose file</p>
                                <p className="text-[10px] text-muted-foreground">PDF, JPG, PNG up to 10MB</p>
                              </div>
                              <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                            </label>
                          </div>

                          <div>
                            <label className="mb-2 block text-[10px] font-bold tracking-widest text-muted-foreground">RESUME / DOCUMENT <span className="font-normal normal-case text-muted-foreground/70">(optional)</span></label>
                            <label data-testid="upload-resume" className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-border p-4 transition-all hover:border-primary/50 hover:bg-primary/5">
                              <FileText size={18} className="shrink-0 text-muted-foreground" />
                              <div>
                                <p className="text-xs font-semibold text-foreground">Attach resume (optional)</p>
                                <p className="text-[10px] text-muted-foreground">PDF, DOCX up to 10MB</p>
                              </div>
                              <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                            </label>
                          </div>
                        </motion.div>
                      )}

                      {step === 4 && (
                        <motion.div
                          key="step4"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                        >
                          <p className="mb-5 text-sm text-muted-foreground">Review your application before submitting. Everything looks good?</p>

                          <div className="space-y-3">
                            {[
                              { label: "Position", value: form.position },
                              { label: "Name", value: `${form.firstName} ${form.lastName}` },
                              { label: "Email", value: form.email },
                              { label: "Phone", value: form.phone },
                              { label: "Address", value: form.address || "—" },
                              { label: "CDL Type", value: form.cdlType ? `Class ${form.cdlType}` : "—" },
                              { label: "Experience", value: form.experience ? `${form.experience} years` : "—" },
                            ].map(({ label, value }) => (
                              <div key={label} className="flex items-start justify-between border-b border-border py-3 last:border-0">
                                <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
                                <span className="max-w-[60%] text-right text-sm font-semibold text-foreground">{value || "—"}</span>
                              </div>
                            ))}
                          </div>

                          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                            By submitting, you agree to NYBC Trucking&apos;s Driver Privacy Policy and consent to being contacted by our recruitment team.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <ModalDivider />

                  {/* Footer */}
                  <div className="flex shrink-0 items-center justify-between px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-7 sm:py-5">
                    {step > 1 ? (
                      <button
                        data-testid="button-back"
                        onClick={() => setStep((s) => s - 1)}
                        className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <ChevronLeft size={16} />
                        Back
                      </button>
                    ) : (
                      <div />
                    )}

                    <span className="text-sm font-semibold text-muted-foreground">{step} / 4</span>

                    {step < 4 ? (
                      <button
                        data-testid="button-continue"
                        onClick={() => setStep((s) => s + 1)}
                        disabled={!canContinue()}
                        className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold tracking-wide text-primary-foreground shadow-[0_4px_20px_hsl(var(--primary)/0.35)] transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Continue
                        <ChevronRight size={16} />
                      </button>
                    ) : (
                      <>
                      {submitError && (
                        <p className="text-sm text-destructive font-semibold mb-2">{submitError}</p>
                      )}
                      <button
                        data-testid="button-submit-application"
                        onClick={handleSubmit}
                        className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold tracking-wide text-primary-foreground shadow-[0_4px_20px_hsl(var(--primary)/0.35)] transition-all hover:bg-primary/90"
                      >
                        Submit
                        <Check size={16} />
                      </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function FormField({
  label,
  icon,
  placeholder,
  type = "text",
  value,
  onChange,
  testId,
}: {
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  testId: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-bold tracking-widest text-muted-foreground">{label}</label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
        <input
          data-testid={testId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border-2 border-border bg-background py-3 pl-9 pr-4 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
        />
      </div>
    </div>
  );
}

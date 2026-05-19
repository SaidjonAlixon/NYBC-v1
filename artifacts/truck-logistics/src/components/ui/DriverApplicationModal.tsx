import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Truck, User, Clock, FileText, Check, ChevronLeft, ChevronRight, Upload, Phone, Mail, MapPin } from "lucide-react";
import { useApplicationModal } from "@/contexts/ApplicationModalContext";

const steps = [
  { id: 1, label: "POSITION", icon: Truck },
  { id: 2, label: "CONTACT", icon: User },
  { id: 3, label: "EXPERIENCE", icon: Clock },
  { id: 4, label: "REVIEW", icon: FileText },
];

const positions = [
  {
    title: "Company Driver",
    desc: "Drive our trucks and get paid per mile with full benefits",
    tags: ["Weekly Pay", "Modern Fleet", "Home Time"],
  },
  {
    title: "Owner Operator",
    desc: "Bring your own truck and enjoy maximum earnings",
    tags: ["High % Pay", "Fuel Cards", "Dispatch Support", "Flexibility"],
  },
  {
    title: "Lease Driver",
    desc: "Lease a truck from our fleet with flexible terms",
    tags: ["Low Down Payment", "Maintenance Included", "Purchase Option"],
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
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
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
      document.body.style.overflow = "hidden";
      setStep(1);
      setSubmitted(false);
      setForm({ position: "", firstName: "", lastName: "", email: "", phone: "", address: "", cdlType: "", experience: "", licenseFile: "", medicalCard: "" });
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const canContinue = () => {
    if (step === 1) return !!form.position;
    if (step === 2) return !!(form.firstName && form.lastName && form.email && form.phone);
    if (step === 3) return !!(form.cdlType && form.experience);
    return true;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      closeModal();
      setSubmitted(false);
    }, 3000);
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
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="w-full max-w-[540px] bg-white rounded-3xl shadow-2xl pointer-events-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20 px-8 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-[#C1121F]/10 flex items-center justify-center mb-6">
                    <Check size={40} className="text-[#C1121F]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#07152F] mb-3">Application Submitted!</h2>
                  <p className="text-gray-500">Our recruitment team will contact you within 24–48 hours.</p>
                </motion.div>
              ) : (
                <>
                  {/* Header */}
                  <div className="px-7 pt-7 pb-5">
                    {/* Brand badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C1121F]/30 bg-[#C1121F]/8">
                        <Truck size={13} className="text-[#C1121F]" />
                        <span className="text-xs font-bold tracking-widest text-[#C1121F]">AMTRUCK</span>
                      </div>
                      <button
                        data-testid="button-close-modal"
                        onClick={closeModal}
                        className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <h2 className="text-2xl font-bold text-[#07152F] mb-1">Driver Application</h2>
                    <p className="text-sm text-gray-400">
                      Step {step} of 4 —{" "}
                      <span className="text-gray-600">{steps[step - 1].label.charAt(0) + steps[step - 1].label.slice(1).toLowerCase()}</span>
                    </p>

                    {/* Progress Steps */}
                    <div className="flex items-center mt-6 mb-2">
                      {steps.map((s, i) => {
                        const Icon = s.icon;
                        const done = step > s.id;
                        const active = step === s.id;
                        return (
                          <div key={s.id} className="flex items-center flex-1 last:flex-none">
                            <div className="flex flex-col items-center gap-1.5">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                  done
                                    ? "bg-[#C1121F] border-[#C1121F]"
                                    : active
                                    ? "bg-white border-[#C1121F]"
                                    : "bg-white border-gray-200"
                                }`}
                              >
                                {done ? (
                                  <Check size={16} className="text-white" strokeWidth={3} />
                                ) : (
                                  <Icon size={16} className={active ? "text-[#C1121F]" : "text-gray-300"} />
                                )}
                              </div>
                              <span
                                className={`text-[10px] font-bold tracking-wider ${
                                  active ? "text-[#C1121F]" : done ? "text-[#C1121F]" : "text-gray-300"
                                }`}
                              >
                                {s.label}
                              </span>
                            </div>
                            {i < steps.length - 1 && (
                              <div className={`flex-1 h-[2px] mx-2 mb-5 rounded transition-all duration-300 ${done ? "bg-[#C1121F]" : "bg-gray-200"}`} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-100 mx-7" />

                  {/* Body */}
                  <div className="px-7 py-5 max-h-[420px] overflow-y-auto">
                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                        >
                          <p className="text-sm text-gray-500 mb-5">
                            Choose the position that best matches your situation. We welcome all experience levels.
                          </p>
                          <div className="space-y-3">
                            {positions.map((pos) => (
                              <button
                                key={pos.title}
                                data-testid={`button-position-${pos.title.toLowerCase().replace(/\s+/g, "-")}`}
                                onClick={() => setForm((f) => ({ ...f, position: pos.title }))}
                                className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
                                  form.position === pos.title
                                    ? "border-[#C1121F] bg-[#C1121F]/5"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                                      <Truck size={16} className="text-gray-500" />
                                    </div>
                                    <div>
                                      <p className="font-bold text-[#07152F] text-sm">{pos.title}</p>
                                      <p className="text-xs text-gray-400 mt-0.5">{pos.desc}</p>
                                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                                        {pos.tags.map((tag) => (
                                          <span key={tag} className="px-2.5 py-0.5 rounded-full border border-gray-200 text-[10px] font-semibold text-gray-500">
                                            {tag}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  <div className={`w-5 h-5 rounded-full border-2 shrink-0 mt-1 flex items-center justify-center transition-all ${
                                    form.position === pos.title ? "border-[#C1121F] bg-[#C1121F]" : "border-gray-300"
                                  }`}>
                                    {form.position === pos.title && <div className="w-2 h-2 rounded-full bg-white" />}
                                  </div>
                                </div>
                              </button>
                            ))}
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
                          <div className="grid grid-cols-2 gap-4">
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
                            <label className="text-[10px] font-bold tracking-widest text-gray-500 block mb-2">CHOOSE YOUR CDL TYPE</label>
                            <select
                              data-testid="select-cdl-type"
                              value={form.cdlType}
                              onChange={(e) => setForm((f) => ({ ...f, cdlType: e.target.value }))}
                              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-[#07152F] focus:outline-none focus:border-[#C1121F] transition-colors appearance-none bg-white"
                            >
                              <option value="">Select CDL Type...</option>
                              <option value="A">Class A — Full Tractor-Trailer</option>
                              <option value="B">Class B — Heavy Straight Vehicle</option>
                              <option value="C">Class C — Passengers/Hazmat</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-[10px] font-bold tracking-widest text-gray-500 block mb-2">YEARS OF COMMERCIAL DRIVING EXPERIENCE?</label>
                            <input
                              data-testid="input-experience-years"
                              type="number"
                              min="0"
                              max="50"
                              placeholder="e.g. 3"
                              value={form.experience}
                              onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))}
                              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-[#07152F] focus:outline-none focus:border-[#C1121F] transition-colors"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold tracking-widest text-gray-500 block mb-2">DRIVER LICENSE (BOTH SIDES)</label>
                            <div className="grid grid-cols-2 gap-3">
                              {["Front side", "Back side"].map((side) => (
                                <label key={side} data-testid={`upload-license-${side.toLowerCase().replace(" ", "-")}`} className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#C1121F]/50 hover:bg-[#C1121F]/5 transition-all">
                                  <Upload size={18} className="text-gray-400" />
                                  <span className="text-xs font-semibold text-gray-500">{side}</span>
                                  <span className="text-[10px] text-gray-400">PDF, JPG, PNG</span>
                                  <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                                </label>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] font-bold tracking-widest text-gray-500 block mb-2">MEDICAL CARD</label>
                            <label data-testid="upload-medical-card" className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#C1121F]/50 hover:bg-[#C1121F]/5 transition-all">
                              <Upload size={18} className="text-gray-400 shrink-0" />
                              <div>
                                <p className="text-xs font-semibold text-gray-600">Choose file</p>
                                <p className="text-[10px] text-gray-400">PDF, JPG, PNG up to 10MB</p>
                              </div>
                              <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                            </label>
                          </div>

                          <div>
                            <label className="text-[10px] font-bold tracking-widest text-gray-500 block mb-2">RESUME / DOCUMENT <span className="font-normal normal-case text-gray-400">(optional)</span></label>
                            <label data-testid="upload-resume" className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#C1121F]/50 hover:bg-[#C1121F]/5 transition-all">
                              <FileText size={18} className="text-gray-400 shrink-0" />
                              <div>
                                <p className="text-xs font-semibold text-gray-600">Attach resume (optional)</p>
                                <p className="text-[10px] text-gray-400">PDF, DOCX up to 10MB</p>
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
                          <p className="text-sm text-gray-500 mb-5">Review your application before submitting. Everything looks good?</p>

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
                              <div key={label} className="flex justify-between items-start py-3 border-b border-gray-100 last:border-0">
                                <span className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">{label}</span>
                                <span className="text-sm font-semibold text-[#07152F] text-right max-w-[60%]">{value || "—"}</span>
                              </div>
                            ))}
                          </div>

                          <p className="text-xs text-gray-400 mt-5 leading-relaxed">
                            By submitting, you agree to AMTRUCK's Driver Privacy Policy and consent to being contacted by our recruitment team.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Footer */}
                  <div className="px-7 py-5 border-t border-gray-100 flex items-center justify-between">
                    {step > 1 ? (
                      <button
                        data-testid="button-back"
                        onClick={() => setStep((s) => s - 1)}
                        className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        <ChevronLeft size={16} />
                        Back
                      </button>
                    ) : (
                      <div />
                    )}

                    <span className="text-sm font-semibold text-gray-400">{step} / 4</span>

                    {step < 4 ? (
                      <button
                        data-testid="button-continue"
                        onClick={() => setStep((s) => s + 1)}
                        disabled={!canContinue()}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C1121F] text-white text-sm font-bold tracking-wide hover:bg-[#a00e1a] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(193,18,31,0.35)]"
                      >
                        Continue
                        <ChevronRight size={16} />
                      </button>
                    ) : (
                      <button
                        data-testid="button-submit-application"
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C1121F] text-white text-sm font-bold tracking-wide hover:bg-[#a00e1a] transition-all shadow-[0_4px_20px_rgba(193,18,31,0.35)]"
                      >
                        Submit
                        <Check size={16} />
                      </button>
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
      <label className="text-[10px] font-bold tracking-widest text-gray-500 block mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
        <input
          data-testid={testId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border-2 border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm text-[#07152F] placeholder-gray-300 focus:outline-none focus:border-[#C1121F] transition-colors"
        />
      </div>
    </div>
  );
}

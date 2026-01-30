// export type SymptomRule = {
//   symptoms: string[];
//   condition: string;
//   department: string;
//   emergency: boolean;
// };

// export const symptomRules: SymptomRule[] = [
//   {
//     symptoms: ["chest pain", "not responding", "unconscious", "collapse"],
//     condition: "Possible Heart Attack or Cardiac Arrest",
//     department: "Cardiology",
//     emergency: true
//   },
//   {
//     symptoms: ["fever", "cough", "shortness of breath", "breathing problem"],
//     condition: "Possible Respiratory Infection",
//     department: "Pulmonology",
//     emergency: false
//   },
//   {
//     symptoms: ["headache", "vomiting", "dizziness"],
//     condition: "Possible Neurological Issue or Migraine",
//     department: "Neurology",
//     emergency: false
//   },
//   {
//     symptoms: ["stomach pain", "abdominal pain", "nausea", "loose motions"],
//     condition: "Possible Digestive or Gastric Issue",
//     department: "Gastroenterology",
//     emergency: false
//   },
//   {
//     symptoms: ["fracture", "injury", "accident", "bone pain"],
//     condition: "Possible Bone or Orthopedic Injury",
//     department: "Orthopedics",
//     emergency: true
//   },
//   {
//     symptoms: ["burn", "severe bleeding"],
//     condition: "Severe Trauma or Burn Injury",
//     department: "Emergency Medicine",
//     emergency: true
//   }
// ];

export type SymptomRule = {
  symptoms: string[];
  condition: string;
  department: string;
  emergency: boolean;
};

export const symptomRules: SymptomRule[] = [
  // 🚨 CARDIAC EMERGENCIES
  {
    symptoms: [
      "chest pain",
      "chest tightness",
      "left arm pain",
      "jaw pain",
      "not responding",
      "unconscious",
      "collapse",
      "sudden sweating"
    ],
    condition: "Possible Heart Attack or Cardiac Arrest",
    department: "Cardiology",
    emergency: true
  },

  // 🫁 RESPIRATORY ISSUES
  {
    symptoms: [
      "shortness of breath",
      "difficulty breathing",
      "breathing problem",
      "cough",
      "wheezing",
      "chest congestion"
    ],
    condition: "Possible Respiratory Infection or Asthma",
    department: "Pulmonology",
    emergency: false
  },

  // 🤒 FEVER & INFECTIONS
  {
    symptoms: [
      "fever",
      "high temperature",
      "chills",
      "body pains",
      "weakness",
      "fatigue"
    ],
    condition: "Possible Viral or Bacterial Infection",
    department: "General Medicine",
    emergency: false
  },

  // 🧠 NEUROLOGICAL ISSUES
  {
    symptoms: [
      "headache",
      "severe headache",
      "vomiting",
      "dizziness",
      "loss of balance",
      "blurred vision",
      "seizure"
    ],
    condition: "Possible Neurological Issue or Migraine",
    department: "Neurology",
    emergency: false
  },

  // 🚨 STROKE
  {
    symptoms: [
      "face drooping",
      "slurred speech",
      "arm weakness",
      "sudden confusion",
      "sudden paralysis"
    ],
    condition: "Possible Stroke",
    department: "Neurology",
    emergency: true
  },

  // 🤢 DIGESTIVE ISSUES
  {
    symptoms: [
      "stomach pain",
      "abdominal pain",
      "nausea",
      "vomiting",
      "loose motions",
      "diarrhea",
      "acid reflux"
    ],
    condition: "Possible Digestive or Gastric Issue",
    department: "Gastroenterology",
    emergency: false
  },

  // 🦴 ORTHOPEDIC / TRAUMA
  {
    symptoms: [
      "fracture",
      "bone pain",
      "joint pain",
      "accident",
      "injury",
      "swelling"
    ],
    condition: "Possible Bone or Orthopedic Injury",
    department: "Orthopedics",
    emergency: true
  },

  // 🔥 BURNS & BLEEDING
  {
    symptoms: [
      "burn",
      "severe burn",
      "heavy bleeding",
      "deep cut",
      "blood loss"
    ],
    condition: "Severe Trauma or Burn Injury",
    department: "Emergency Medicine",
    emergency: true
  },

  // 🧒 PEDIATRIC
  {
    symptoms: [
      "child fever",
      "baby vomiting",
      "infant crying",
      "poor feeding",
      "child weakness"
    ],
    condition: "Possible Pediatric Illness",
    department: "Pediatrics",
    emergency: false
  },

  // 🧘 MENTAL HEALTH
  {
    symptoms: [
      "anxiety",
      "panic attack",
      "depression",
      "stress",
      "insomnia",
      "sleep problem"
    ],
    condition: "Possible Mental Health Concern",
    department: "Psychiatry",
    emergency: false
  },

  // 🩸 DIABETES / METABOLIC
  {
    symptoms: [
      "frequent urination",
      "excessive thirst",
      "sudden weight loss",
      "blurred vision",
      "high sugar"
    ],
    condition: "Possible Diabetes or Metabolic Disorder",
    department: "Endocrinology",
    emergency: false
  }
];


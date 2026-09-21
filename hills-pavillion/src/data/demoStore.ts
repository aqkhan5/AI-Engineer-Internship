export interface DemoLead {
  id: string;
  name: string;
  targetProject: string;
  targetUnit?: string;
  budget: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'VISIT_SCHEDULED' | 'NEGOTIATION' | 'WON' | 'LOST';
  intentScore: number;
  lastContact: string;
  slaStatus: 'ATTENTION_REQUIRED' | 'ON_TRACK';
  recommendedAction: string;
  phone?: string;
  notes?: string;
}

export interface DemoUnit {
  id: string;
  level: string;
  typology: string;
  sqft: number;
  sqm: number;
  pricePKR: string;
  priceUSD: string;
  status: 'AVAILABLE' | 'RESERVED' | 'BOOKED' | 'SOLD';
  block: string;
  description: string;
}

export interface DemoActivity {
  id: string;
  timestamp: string;
  action: string;
  type: 'LEAD' | 'INVENTORY' | 'SYSTEM';
}

export interface DemoStoreState {
  metrics: {
    revenue: string;
    newLeads: number;
    activeBookings: number;
    pendingRecovery: number;
    availableUnits: number;
  };
  leads: DemoLead[];
  units: DemoUnit[];
  selectedUnitId: string;
  selectedLeadId: string;
  activities: DemoActivity[];
}

const initialLeads: DemoLead[] = [
  {
    id: 'lead-01',
    name: 'Ahmed Khan',
    targetProject: 'The Lacustrine Pavilions',
    targetUnit: 'Unit A-102',
    budget: 'PKR 35M',
    status: 'QUALIFIED',
    intentScore: 87,
    lastContact: '2 days ago',
    slaStatus: 'ATTENTION_REQUIRED',
    recommendedAction: 'Call today to confirm North Promontory site visit.',
    phone: '+92 300 8291029',
    notes: 'Inquired on 10 Marla Sanctum Villa with direct lake vista.'
  },
  {
    id: 'lead-02',
    name: 'Dr. Tariq Mansoor',
    targetProject: 'The Lacustrine Pavilions',
    targetUnit: 'Unit A-106',
    budget: 'PKR 28M',
    status: 'CONTACTED',
    intentScore: 78,
    lastContact: '1 day ago',
    slaStatus: 'ATTENTION_REQUIRED',
    recommendedAction: 'Confirm helicopter site transfer itinerary.',
    phone: '+92 321 5594833',
    notes: 'Requires dual basement parking and private courtyard pool.'
  },
  {
    id: 'lead-03',
    name: 'Vivienne Dubois',
    targetProject: 'The Belvedere Enclave',
    targetUnit: 'Villa Verona Monolith',
    budget: 'USD 450K',
    status: 'NEGOTIATION',
    intentScore: 92,
    lastContact: '3 days ago',
    slaStatus: 'ATTENTION_REQUIRED',
    recommendedAction: 'Send revised 5-stage milestone contract addendum.',
    phone: '+41 79 382 9102',
    notes: 'International portfolio buyer seeking tax-efficient escrow allocation.'
  },
  {
    id: 'lead-04',
    name: 'Farooq & H. M. Malik',
    targetProject: 'The Lacustrine Pavilions',
    targetUnit: 'Unit A-304',
    budget: 'PKR 48M',
    status: 'VISIT_SCHEDULED',
    intentScore: 81,
    lastContact: '4 hours ago',
    slaStatus: 'ON_TRACK',
    recommendedAction: 'Host private atelier dinner with lead architect.',
    phone: '+92 333 9182377',
    notes: 'Family office representative looking for multi-generational duplex.'
  }
];

const initialUnits: DemoUnit[] = [
  // Level 04
  { id: 'A-401', level: 'Level 04', typology: 'Crown Penthouse', sqft: 5800, sqm: 539, pricePKR: 'PKR 64.0M', priceUSD: '$230K', status: 'SOLD', block: 'Block A', description: 'Top Penthouse with private helipad terrace.' },
  { id: 'A-402', level: 'Level 04', typology: 'Crown Penthouse', sqft: 5800, sqm: 539, pricePKR: 'PKR 64.0M', priceUSD: '$230K', status: 'BOOKED', block: 'Block A', description: 'Cantilever horizon view and private plunge pool.' },
  { id: 'A-403', level: 'Level 04', typology: 'Sky Solarium Duplex', sqft: 5200, sqm: 483, pricePKR: 'PKR 58.0M', priceUSD: '$208K', status: 'BOOKED', block: 'Block A', description: 'Double-height thermal glass atrium.' },
  { id: 'A-404', level: 'Level 04', typology: 'Sky Solarium Duplex', sqft: 5200, sqm: 483, pricePKR: 'PKR 58.0M', priceUSD: '$208K', status: 'AVAILABLE', block: 'Block A', description: 'Panoramic 360-degree ridge elevation.' },

  // Level 03
  { id: 'A-301', level: 'Level 03', typology: 'Horizon Duplex', sqft: 4100, sqm: 381, pricePKR: 'PKR 36.0M', priceUSD: '$129K', status: 'SOLD', block: 'Block A', description: 'Cantilever terrace overlooking alpine slopes.' },
  { id: 'A-302', level: 'Level 03', typology: 'Horizon Duplex', sqft: 4100, sqm: 381, pricePKR: 'PKR 36.0M', priceUSD: '$129K', status: 'SOLD', block: 'Block A', description: 'Cedar wood-lined master sanctuary.' },
  { id: 'A-303', level: 'Level 03', typology: 'Horizon Duplex', sqft: 4100, sqm: 381, pricePKR: 'PKR 36.0M', priceUSD: '$129K', status: 'BOOKED', block: 'Block A', description: 'Direct elevator access and private courtyard.' },
  { id: 'A-304', level: 'Level 03', typology: 'Horizon Duplex', sqft: 4100, sqm: 381, pricePKR: 'PKR 36.0M', priceUSD: '$129K', status: 'AVAILABLE', block: 'Block A', description: 'Southwest-facing sunset panorama.' },
  { id: 'A-305', level: 'Level 03', typology: 'Horizon Duplex', sqft: 4100, sqm: 381, pricePKR: 'PKR 36.0M', priceUSD: '$129K', status: 'AVAILABLE', block: 'Block A', description: 'Open hearth stone fireplace installed.' },
  { id: 'A-306', level: 'Level 03', typology: 'Horizon Duplex', sqft: 4100, sqm: 381, pricePKR: 'PKR 36.0M', priceUSD: '$129K', status: 'BOOKED', block: 'Block A', description: 'Custom cedar joinery specification.' },

  // Level 02
  { id: 'A-201', level: 'Level 02', typology: 'Belvedere Residence', sqft: 3400, sqm: 316, pricePKR: 'PKR 24.5M', priceUSD: '$88K', status: 'SOLD', block: 'Block A', description: 'Broad stone terrace with mountain vistas.' },
  { id: 'A-202', level: 'Level 02', typology: 'Belvedere Residence', sqft: 3400, sqm: 316, pricePKR: 'PKR 24.5M', priceUSD: '$88K', status: 'BOOKED', block: 'Block A', description: 'Dual ensuite layouts with thermal glazing.' },
  { id: 'A-203', level: 'Level 02', typology: 'Belvedere Residence', sqft: 3400, sqm: 316, pricePKR: 'PKR 24.5M', priceUSD: '$88K', status: 'SOLD', block: 'Block A', description: 'Polished basalt stone flooring.' },
  { id: 'A-204', level: 'Level 02', typology: 'Belvedere Residence', sqft: 3400, sqm: 316, pricePKR: 'PKR 24.5M', priceUSD: '$88K', status: 'SOLD', block: 'Block A', description: 'Integrated wine cellar tasting niche.' },
  { id: 'A-205', level: 'Level 02', typology: 'Belvedere Residence', sqft: 3400, sqm: 316, pricePKR: 'PKR 24.5M', priceUSD: '$88K', status: 'AVAILABLE', block: 'Block A', description: 'Private study alcove with garden view.' },
  { id: 'A-206', level: 'Level 02', typology: 'Belvedere Residence', sqft: 3400, sqm: 316, pricePKR: 'PKR 24.5M', priceUSD: '$88K', status: 'BOOKED', block: 'Block A', description: 'Under contract pending escrow clearance.' },

  // Level 01
  { id: 'A-101', level: 'Level 01', typology: '10 Marla Sanctum Villa', sqft: 4800, sqm: 445, pricePKR: 'PKR 28.5M', priceUSD: '$102K', status: 'SOLD', block: 'Block A', description: 'Ground villa with private Zen garden.' },
  { id: 'A-102', level: 'Level 01', typology: '10 Marla Sanctum Villa', sqft: 4800, sqm: 445, pricePKR: 'PKR 28.5M', priceUSD: '$102K', status: 'AVAILABLE', block: 'Block A', description: 'Prime target unit with uninterrupted lake panorama and heated stone deck.' },
  { id: 'A-103', level: 'Level 01', typology: '10 Marla Sanctum Villa', sqft: 4800, sqm: 445, pricePKR: 'PKR 28.5M', priceUSD: '$102K', status: 'AVAILABLE', block: 'Block A', description: 'Private pine forest garden boundary.' },
  { id: 'A-104', level: 'Level 01', typology: '10 Marla Sanctum Villa', sqft: 4800, sqm: 445, pricePKR: 'PKR 28.5M', priceUSD: '$102K', status: 'RESERVED', block: 'Block A', description: 'Partner hold placed for European family office.' },
  { id: 'A-105', level: 'Level 01', typology: '10 Marla Sanctum Villa', sqft: 4800, sqm: 445, pricePKR: 'PKR 28.5M', priceUSD: '$102K', status: 'AVAILABLE', block: 'Block A', description: 'Double garage and private thermal sauna.' },
  { id: 'A-106', level: 'Level 01', typology: '10 Marla Sanctum Villa', sqft: 4800, sqm: 445, pricePKR: 'PKR 28.5M', priceUSD: '$102K', status: 'SOLD', block: 'Block A', description: 'Fully commissioned and finalized.' },
  { id: 'A-107', level: 'Level 01', typology: '10 Marla Sanctum Villa', sqft: 4800, sqm: 445, pricePKR: 'PKR 28.5M', priceUSD: '$102K', status: 'AVAILABLE', block: 'Block A', description: 'Corner orientation with expanded terrace.' },
  { id: 'A-108', level: 'Level 01', typology: '10 Marla Sanctum Villa', sqft: 4800, sqm: 445, pricePKR: 'PKR 28.5M', priceUSD: '$102K', status: 'BOOKED', block: 'Block A', description: 'Scheduled for Q4 2025 delivery.' },
];

let globalState: DemoStoreState = {
  metrics: {
    revenue: 'PKR 84.6M',
    newLeads: 42,
    activeBookings: 17,
    pendingRecovery: 8,
    availableUnits: 126,
  },
  leads: initialLeads,
  units: initialUnits,
  selectedUnitId: 'A-102',
  selectedLeadId: 'lead-01',
  activities: [
    { id: 'act-01', timestamp: '12 mins ago', action: 'Lead Ahmed Khan marked for 48H Priority Follow-up on Unit A-102.', type: 'LEAD' },
    { id: 'act-02', timestamp: '1 hour ago', action: 'Unit A-104 placed on Partner 48H Reservation Hold.', type: 'INVENTORY' },
    { id: 'act-03', timestamp: '3 hours ago', action: 'Site inspection report uploaded for Stage 04 Framing.', type: 'SYSTEM' },
  ],
};

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export const demoStore = {
  getState(): DemoStoreState {
    return globalState;
  },

  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  selectUnit(unitId: string) {
    globalState = { ...globalState, selectedUnitId: unitId };
    notify();
  },

  selectLead(leadId: string) {
    globalState = { ...globalState, selectedLeadId: leadId };
    notify();
  },

  updateLeadStatus(leadId: string, status: DemoLead['status']) {
    const updatedLeads = globalState.leads.map((l) => {
      if (l.id === leadId) {
        return {
          ...l,
          status,
          slaStatus: status === 'WON' ? ('ON_TRACK' as const) : l.slaStatus,
          lastContact: 'Just now',
        };
      }
      return l;
    });

    const targetLead = globalState.leads.find((l) => l.id === leadId);
    const newActivity: DemoActivity = {
      id: `act-${Date.now()}`,
      timestamp: 'Just now',
      action: `Lead ${targetLead ? targetLead.name : leadId} status transitioned to ${status}.`,
      type: 'LEAD',
    };

    globalState = {
      ...globalState,
      leads: updatedLeads,
      activities: [newActivity, ...globalState.activities],
    };
    notify();
  },

  addLeadNote(leadId: string, note: string) {
    const updatedLeads = globalState.leads.map((l) => {
      if (l.id === leadId) {
        const existingNotes = l.notes ? `${l.notes}\n• ${note}` : `• ${note}`;
        return { ...l, notes: existingNotes, lastContact: 'Just now' };
      }
      return l;
    });

    const targetLead = globalState.leads.find((l) => l.id === leadId);
    const newActivity: DemoActivity = {
      id: `act-${Date.now()}`,
      timestamp: 'Just now',
      action: `Confidential memo recorded for ${targetLead ? targetLead.name : leadId}.`,
      type: 'LEAD',
    };

    globalState = {
      ...globalState,
      leads: updatedLeads,
      activities: [newActivity, ...globalState.activities],
    };
    notify();
  },

  refreshData() {
    const newActivity: DemoActivity = {
      id: `act-${Date.now()}`,
      timestamp: 'Just now',
      action: 'Portfolio metrics and pipeline states synchronized with live nodes.',
      type: 'SYSTEM',
    };
    globalState = {
      ...globalState,
      activities: [newActivity, ...globalState.activities],
    };
    notify();
  },

  reserveUnit(unitId: string) {
    const updatedUnits = globalState.units.map((u) => {
      if (u.id === unitId) {
        return { ...u, status: 'RESERVED' as const };
      }
      return u;
    });

    const newActivity: DemoActivity = {
      id: `act-${Date.now()}`,
      timestamp: 'Just now',
      action: `Unit ${unitId} placed on Partner 48H Reservation Hold.`,
      type: 'INVENTORY',
    };

    globalState = {
      ...globalState,
      units: updatedUnits,
      activities: [newActivity, ...globalState.activities],
    };
    notify();
  },

  addLead(lead: Omit<DemoLead, 'id' | 'status' | 'intentScore' | 'lastContact' | 'slaStatus' | 'recommendedAction'>) {
    const newLead: DemoLead = {
      id: `lead-${Date.now()}`,
      ...lead,
      status: 'NEW',
      intentScore: 85,
      lastContact: 'Just now',
      slaStatus: 'ATTENTION_REQUIRED',
      recommendedAction: 'Initial contact via advisory concierge required within 4 hours.',
    };

    const newActivity: DemoActivity = {
      id: `act-${Date.now()}`,
      timestamp: 'Just now',
      action: `New private inquiry received from ${lead.name} (${lead.budget}).`,
      type: 'LEAD',
    };

    globalState = {
      ...globalState,
      leads: [newLead, ...globalState.leads],
      metrics: {
        ...globalState.metrics,
        newLeads: globalState.metrics.newLeads + 1,
      },
      activities: [newActivity, ...globalState.activities],
    };
    notify();
  },
};

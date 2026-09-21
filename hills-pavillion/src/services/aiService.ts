import { demoStore, type DemoLead, type DemoUnit } from '../data/demoStore';

export interface AICommandResultItem {
  title: string;
  subtitle: string;
  badge?: string;
  actionText?: string;
  route?: string;
}

export interface AICommandResult {
  query: string;
  summary: string;
  items: AICommandResultItem[];
  confidence: string;
  timestamp: string;
  category: string;
  urgencyLevel: 'CRITICAL' | 'WARNING' | 'OPTIMAL' | 'INFORMATIONAL';
  retrievedData: {
    label: string;
    count: number;
    details: string;
  };
  reasoning: string;
  cardsType: 'LEADS' | 'PROPERTIES' | 'DRAWDOWNS' | 'GENERAL';
  leads?: DemoLead[];
  units?: DemoUnit[];
  drawdowns?: Array<{
    title: string;
    stage: string;
    amount: string;
    badge: string;
    verifiedBy: string;
  }>;
}

export interface IAIService {
  executeCommand(query: string): Promise<AICommandResult>;
}

export const MockAIService: IAIService = {
  async executeCommand(query: string): Promise<AICommandResult> {
    // Artificial 200ms latency for realistic interface feel
    await new Promise((resolve) => setTimeout(resolve, 200));

    const q = query.toLowerCase().trim();
    const currentState = demoStore.getState();

    // 1. Leads requiring attention / follow-ups overdue
    if (q.includes('lead') || q.includes('attention') || q.includes('overdue') || q.includes('agent')) {
      const urgentLeads = currentState.leads.filter(
        (l) => l.slaStatus === 'ATTENTION_REQUIRED' || l.intentScore >= 80
      );
      const overdueCount = currentState.leads.filter((l) => l.slaStatus === 'ATTENTION_REQUIRED').length;

      return {
        query,
        summary: `${urgentLeads.length} high-priority client dossiers require partner attention. ${overdueCount} leads have breached the 4-hour SLA standard; conversion velocity is projected to decay by 24% if unaddressed before 17:00 CET.`,
        confidence: '98.4%',
        timestamp: 'Just now',
        category: 'CRM TELEMETRY & ESCALATION',
        urgencyLevel: 'CRITICAL',
        retrievedData: {
          label: 'Live CRM Records Parsed',
          count: currentState.leads.length,
          details: `Retrieved ${currentState.leads.length} active dossiers across Geneva, Zurich, and London desks.`,
        },
        reasoning:
          'Institutional telemetry demonstrates high correlation between sub-4-hour concierge follow-up and final contract execution on 10-Marla waterfront plots. 2 clients are actively viewing cantonal BIM blueprints.',
        cardsType: 'LEADS',
        leads: urgentLeads.slice(0, 3),
        items: urgentLeads.map((l) => ({
          title: l.name,
          subtitle: `Budget: ${l.budget} • Target: ${l.targetUnit || l.targetProject} • Last contact: ${l.lastContact}`,
          badge: l.slaStatus === 'ATTENTION_REQUIRED' ? 'SLA EXCEEDED' : 'HIGH INTENT',
          actionText: 'Open in CRM',
          route: '/platform/leads',
        })),
      };
    }

    // 2. Reserved units count query
    if (q.includes('reserved') || q.includes('how many units') || q.includes('hold')) {
      const reservedUnits = currentState.units.filter((u) => u.status === 'RESERVED');
      const bookedUnits = currentState.units.filter((u) => u.status === 'BOOKED');

      return {
        query,
        summary: `Currently, ${reservedUnits.length} units are on active 48-Hour Partner Hold, and ${bookedUnits.length} units are in Escrow Underwriting across Block A (Alpine Promontory).`,
        confidence: '99.2%',
        timestamp: 'Just now',
        category: 'SPATIAL INVENTORY ALLOCATION',
        urgencyLevel: 'WARNING',
        retrievedData: {
          label: 'Block A Ledger Units Queried',
          count: currentState.units.length,
          details: `Total 24 structural units scanned; ${reservedUnits.length} holds currently active in Swiss escrow cache.`,
        },
        reasoning:
          'Partner holds expire dynamically if formal escrow deposits are not registered within 48 hours. 2 holds are approaching the 12-hour expiration threshold and will release back into general allocation unless renewed.',
        cardsType: 'PROPERTIES',
        units: reservedUnits,
        items: reservedUnits.map((u) => ({
          title: `Unit ${u.id} — ${u.typology}`,
          subtitle: `${u.level} • ${u.sqm} m² (${u.sqft} sq ft) • Benchmark: ${u.pricePKR}`,
          badge: '48H HOLD ACTIVE',
          actionText: 'Inspect in Inventory',
          route: '/platform/inventory',
        })),
      };
    }

    // 3. Properties under PKR 30M or available inventory query
    if (q.includes('property') || q.includes('properties') || q.includes('available') || q.includes('30m') || q.includes('under')) {
      // Find units under 30M or available
      const affordableAvailable = currentState.units.filter((u) => {
        const isAvailable = u.status === 'AVAILABLE';
        return isAvailable;
      });

      return {
        query,
        summary: `Found ${affordableAvailable.length} unencumbered allocations currently available in Block A (North Promontory) under current valuation schedules.`,
        confidence: '97.6%',
        timestamp: 'Just now',
        category: 'SPATIAL REGISTRY & PRICING',
        urgencyLevel: 'OPTIMAL',
        retrievedData: {
          label: 'Available Units Isolated',
          count: affordableAvailable.length,
          details: `${affordableAvailable.length} unreserved units verified from latest cantonal architectural ledger.`,
        },
        reasoning:
          '10 Marla Ground Sanctum Villas on Level 01 represent our highest yield-per-sqm segment with immediate terrace access and direct southern lake orientation.',
        cardsType: 'PROPERTIES',
        units: affordableAvailable.slice(0, 3),
        items: affordableAvailable.map((u) => ({
          title: `Unit ${u.id} (${u.typology})`,
          subtitle: `${u.level} • ${u.sqm} m² • Valuation: ${u.pricePKR} (~CHF 118,500)`,
          badge: u.status,
          actionText: 'Place 48H Hold',
          route: '/platform/inventory',
        })),
      };
    }

    // 4. Sales & Escrow Drawdowns query
    if (q.includes('drawdown') || q.includes('escrow') || q.includes('sales') || q.includes('routine')) {
      return {
        query,
        summary: "Today's routine disbursements total PKR 8.5M across 3 verified construction milestones. Escrow authorization of tranche E-04 is held pending Cantonal clearance.",
        confidence: '99.1%',
        timestamp: 'Just now',
        category: 'FIDUCIARY ESCROW & DISBURSEMENTS',
        urgencyLevel: 'INFORMATIONAL',
        retrievedData: {
          label: 'Active Escrow Vouchers Audited',
          count: 3,
          details: 'Triple-verified against SIA 102 quantity surveyor signed milestone reports.',
        },
        reasoning:
          'All disbursements require Multi-Signature Tier 1 partner validation before automated wire generation to European contractor syndicates.',
        cardsType: 'DRAWDOWNS',
        drawdowns: [
          {
            title: 'Stage 03 Core Foundation Signoff',
            stage: 'The Lacustrine Pavilions',
            amount: 'PKR 4.2M',
            badge: 'VERIFIED',
            verifiedBy: 'SGS Cantonal Engineering Inspector',
          },
          {
            title: 'Structural Board-Formed Steel Supply #4',
            stage: 'Alpine Promontory Ridge',
            amount: 'PKR 2.8M',
            badge: 'AUDITED',
            verifiedBy: 'Zurich Metallurgy Certification',
          },
          {
            title: 'Geothermal Thermal Loop Commissioning',
            stage: 'Waterfront Sanctuary Vault',
            amount: 'PKR 1.5M',
            badge: 'INSPECTION OK',
            verifiedBy: 'Swiss Energy Efficiency Bureau',
          },
        ],
        items: [
          {
            title: 'Stage 03 Foundation Signoff — The Lacustrine Pavilions',
            subtitle: 'Quantity Surveyor verified. Amount: PKR 4.2M ready for release.',
            badge: 'VERIFIED',
            actionText: 'Authorize Release',
            route: '/platform',
          },
          {
            title: 'Structural Steel Supply Batch #4',
            subtitle: 'Mill inspection certificate attached. Amount: PKR 2.8M.',
            badge: 'AUDITED',
            actionText: 'Approve Payment',
            route: '/platform',
          },
        ],
      };
    }

    // 5. Default / Fallback query
    return {
      query,
      summary: `Analysis completed for "${query}". Operations running within standard Swiss fiduciary parameters with +14.8% positive MTD delta.`,
      confidence: '95.2%',
      timestamp: 'Just now',
      category: 'EXECUTIVE INTELLIGENCE BRIEFING',
      urgencyLevel: 'INFORMATIONAL',
      retrievedData: {
        label: 'Cross-Portfolio Records Parsed',
        count: currentState.leads.length + currentState.units.length,
        details: 'Unified cross-functional audit stream across CRM, Spatial Inventory, and Escrow ledgers.',
      },
      reasoning:
        'All portfolios are performing within targeted absorption horizons. Recommend maintaining partner concierge staffing on Geneva and Zurich desks.',
      cardsType: 'GENERAL',
      items: [
        {
          title: 'The Lacustrine Pavilions — Stage 04 On Schedule',
          subtitle: 'Workforce count: 184 craftspeople on site. Zero lost-time incidents.',
          badge: 'OPTIMAL',
          actionText: 'View Construction',
          route: '/construction',
        },
        {
          title: 'Conversion Velocity Index: +18.4%',
          subtitle: 'High-intent private client inquiries pacing 3.2x above historical benchmark.',
          badge: 'SURGE',
          actionText: 'Explore CRM',
          route: '/platform/leads',
        },
      ],
    };
  },
};

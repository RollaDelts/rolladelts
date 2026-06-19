export type Officer = { role: string; name: string };
export type RushEvent = { date: string; name: string; location: string };

export const defaultOfficers: Officer[] = [
  { role: "President", name: "TBD" },
  { role: "Vice President", name: "TBD" },
  { role: "Treasurer", name: "TBD" },
  { role: "Recruitment Chair", name: "TBD" },
  { role: "Risk Manager", name: "TBD" },
  { role: "Philanthropy Chair", name: "TBD" },
];

export const defaultRushEvents: RushEvent[] = [
  { date: "TBD", name: "Meet the Brothers BBQ", location: "Chapter House, 2631 Vienna Rd" },
  { date: "TBD", name: "Game Night & Pizza", location: "Chapter House" },
  { date: "TBD", name: "Campus Info Table", location: "Missouri S&T Student Union" },
  { date: "TBD", name: "Bid Night", location: "Chapter House (Invite Only)" },
];

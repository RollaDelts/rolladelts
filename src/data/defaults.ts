export type Officer = { role: string; name: string };
export type RushEvent = { date: string; name: string; location: string };
export type AlumniSpotlight = {
  name: string;
  pledgeClass: string;
  years: string;
  summary: string;
};

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

// Migrated from the legacy rolladelts.org "Alumni Spotlight" tag archive.
// Pledge class letters/badge numbers are best-effort transcriptions from the
// original posts — verify with chapter records before treating as canonical.
export const defaultAlumniSpotlights: AlumniSpotlight[] = [
  {
    name: 'Dan "Madman" Maddex',
    pledgeClass: "ΔΥ 264",
    years: "1998–2001",
    summary:
      "Studied electrical engineering while serving as DAA, a St. Pats Board rep through 2017, and Second Master Guard, all while active in Blue Key Honor Fraternity and Theta Tau Omega. Today he's a functional manager at Northrop Grumman specializing in electromagnetic environmental effects, and lives in Miami with his wife Jessica and their three kids.",
  },
  {
    name: "Jeffrey W. Sheets",
    pledgeClass: "Π 122",
    years: "Treasurer '78 · President '79 · B.S. 1980",
    summary:
      "Spent 36 years at ConocoPhillips, rising from Staff Finance Director to Chief Financial Officer, and earned an MBA along the way. In 2016 he was appointed to the Missouri S&T Board of Trustees; he and his wife Patricia funded the Jeff and Pat Sheets Lecture Hall in Bertelsmeyer Hall, one of the largest on campus.",
  },
  {
    name: 'Matthew "Matt" Vogel',
    pledgeClass: "ΒΝ 378",
    years: "2009–2014",
    summary:
      "Double-majored in architectural and civil engineering, served as pledge class president and later chapter president, and now works at Accenture in St. Louis. He's stayed close to the chapter as an advisor since graduating, officially installed as Epsilon Nu's chapter advisor at the 2017 Western Plains Division Conference.",
  },
  {
    name: 'Ovid "Tobey" Yadon',
    pledgeClass: "Ι 86",
    years: "1971–1976",
    summary:
      "Switched from mechanical engineering to engineering management and credits the chapter with keeping him going through a tough stretch of school. He spent his career in industrial sales — Fisher Controls, Dixon Paper, and Rofement Engineering — before retiring at 51 and turning his energy toward the Lions Club, his church, and long-distance cycling.",
  },
  {
    name: "Britt Braswell",
    pledgeClass: "ΑΔ 180",
    years: "1985–1990",
    summary:
      "Studied electrical engineering and spent nearly three decades at Ameren, where his dual background in electrical engineering and computer systems became central to his role — including a stretch managing 12-hour shifts, seven days a week, after a main transformer failure. He lives in St. Louis with his wife and two kids.",
  },
  {
    name: "Nathan Steele",
    pledgeClass: "ΑΠ 241",
    years: "1995–2000",
    summary:
      "Arrived undecided and settled on mining engineering, then spent 15 years working across five companies and seven mine sites. He's now General Manager at Lyons Salt Company in Kansas, where he turned the operation around and oversaw construction of a 400-foot underground bulkhead requiring more than 12,000 cubic yards of concrete.",
  },
  {
    name: "John Goethe",
    pledgeClass: "Alpha Theta 201",
    years: "Class of the mid-1990s",
    summary:
      "Led the chapter as president when it had just 15 members, then went on to Roush Industries, Boeing, and Spirit AeroSystems, where he's now a senior manager leading R&D testing on new aircraft materials. He's stayed involved with Delta Tau Delta nationally, helping Michigan's Theta Xi chapter colonize and Kansas's Gamma Tau chapter recolonize.",
  },
];

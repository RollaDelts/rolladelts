export type Officer = { role: string; name: string };
export type RushEvent = { date: string; name: string; location: string };
export type AlumniSpotlight = {
  name: string;
  pledgeClass: string;
  years: string;
  /** One photo per line: "url" or "url|caption". */
  photos: string;
  /** Paragraphs separated by a blank line. */
  bio: string;
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

// Migrated verbatim (full text + photos) from the legacy rolladelts.org
// "Alumni Spotlight" tag archive. Pledge class letters/badge numbers are
// best-effort transcriptions from the original posts — verify with chapter
// records before treating as canonical.
export const defaultAlumniSpotlights: AlumniSpotlight[] = [
  {
    name: 'Dan "Madman" Maddex',
    pledgeClass: "AY 264",
    years: "1998–2001",
    photos:
      "/images/alumni/maddex-1.png|Dan showing his St. Pats spirit\n/images/alumni/maddex-2.png|Dan and his daughter Poppy",
    bio: `Dan "Madman" Maddex (ΔΥ 264) came to University of Missouri Rolla in 1998. He joined Delts when the expansion was being built and lived in TJ during that time. He quickly took position in the house becoming DAA during his second and third semester. The following year, he stepped back from house leadership, and joined the St. Pats Board, and up until 2017 was the most recent board rep from the house. While on the board he was in charge of the float and parade during his junior rep year, and following this he served as secretary during his senior rep year. In 2001 he was on the court as Second Master Guard.

After making it through his years on the board, Madman took on the role of guide to finish out his time at the school. Madman has kept up with his brothers despite moving so far away, and he still keeps in contact with his pledge class. He had a lot to say about the Chapter. One of the big highlights was that he put the hole in the wall between the white room and the black room in the old wing. He also asked us to add that Matthew Wolken smells like fish, a fact that the ENus was unable to confirm or deny.

On top of his involvement with the board and the house, he was a member of the Blue Key Honor Fraternity, and joined Theta Tau Omega. As an undergraduate, he majored in Electrical Engineering. While studying at Rolla, he didn't take on any internships or co-ops, but that didn't stop his career. He now works with Northrop Grumman, a large aerospace and defense technology company as a functional manager for electromagnetic environmental effects.

With this job, he's worked all over the U.S. going from Southern California, Denver Colorado, South Carolina, and Florida. He and his wife Jessica have three kids: Otto, Howard and Poppy. He currently lives in Miami, but who knows where he'll be next. As always, we look forward to the next time we see Madman, whenever that may be.`,
  },
  {
    name: "Jeffrey W. Sheets",
    pledgeClass: "π 122",
    years: "Treasurer '78 · President '79 · B.S. 1980",
    photos:
      "/images/alumni/sheets-1.jpg|from conocophillips.com\n/images/alumni/sheets-2.jpg|Jeff and Pat Sheets Lecture Hall, Bertelsmeyer Hall",
    bio: `Jeffrey W. Sheets (π, 122) was recently appointed to the Missouri S&T Board of Trustees. Brother Sheets served as Treasurer in 1978 and President in 1979 of Epsilon Nu. In 1980, he earned his bachelor of science in Chemical Engineering after which he began his career with ConocoPhillips in the North American division of Exploration and Production. Jeff held a number of engineering and marketing positions and earned his masters degree in Business Administration from the University of Houston in 1989.

In 1990, he joined the Treasury of ConocoPhillips by becoming a Staff Finance Director and moved to the Norway Office in 1993. Jeff served as the Commercial Services Manager, while in Norway, from 1994 to 1997. He then returned to the United States in 1998 to become an Assistant Treasurer. In 2001, Jeff was named Vice President and Treasurer of ConocoPhillips and became Senior Vice President of Planning and Strategy in 2008. He became the Chief Financial Officer in 2010.

In 2011, Jeff was inducted into the Academy of Chemical Engineers at Missouri S&T and was awarded a professional degree in chemical engineering. He was appointed to the S&T Board of Trustees in 2016 after retiring from his 36 year career with ConocoPhillips. As a trustee, he helps to make major decisions regarding the Rolla Campus. Jeff and his wife, Patricia, are also both members of the Order of the Golden Shillelagh.

Brother Sheets has not forgotten Rolla. Both he and his wife have donated money to fund the construction of the Jeff and Pat Sheets Lecture Hall located in Bertelsmeyer Hall. This lecture hall is one of the largest and is the newest lecture hall on the Missouri S&T Campus with the ability to hold hundreds of students.`,
  },
  {
    name: 'Matthew "Matt" Vogel',
    pledgeClass: "BN 378",
    years: "2009–2014",
    photos: "/images/alumni/vogel-1.png",
    bio: `Matthew "Matt" Vogel (BN 378) came to Missouri S&T in the fall of 2009 as a double major in Architectural and Civil Engineering student. When he came to S&T, he had no intentions of joining a fraternity. Going into his sophomore year he was set to have a roommate that he did not care for. In his own words, "I was at Def Con 2." He decided that he needed to take action. He came over for a few visits and that was it.

While he admits that he joined for some of the worst reasons, it became one of the best decisions of his life. His favorite memories as an undergrad were all of the large alumni events like Pats and Homecoming, specifically his first Homecoming which was the 45th. He loved meeting all of the alumni and the giant turnout that year.

He moved in during the fall of 2010 where he was voted in as his pledge class President. That was just the beginning of his many positions in the house. During his time, he held several positions from Secretary, all the way up to chapter president. In fact, the house's most recent Court of Honor came at the end of his term as president.

After Vogel graduated in the fall of 2014 he moved back home to St. Louis to start his new job at Accenture as a Senior Analyst. At Accenture he has worked on a few projects in the fields of IT, local government, and enterprise resource planning.

Even graduation couldn't stop Vogel from staying involved in Delta Tau Delta. He was almost immediately put into a position as an assistant advisor for the Epsilon Nu chapter. Each year he got more and more hands on with the chapter until, at the 2017 Western Plains Division Conference, he was officially installed as the Epsilon Nu chapter advisor. Since becoming the advisor, he has made several trips to the chapter to lead risk management presentations and give recruitment seminars among other things.

Matt Vogel, a model Delt and valued member of Epsilon Nu. The chapter is lucky to have you as a brother and a leader. We thank you for your constant loyalty and love to your fellow Delts.`,
  },
  {
    name: 'Ovid "Tobey" Yadon',
    pledgeClass: "Ι 86",
    years: "1971–1976",
    photos: "/images/alumni/yadon-1.png",
    bio: `Ovid "Tobey" Yadon (Ι, 86) came to University of Missouri Rolla in 1971 as a Mechanical Engineering student. Now he has retired and does a lot of volunteering as a part of Lions Club, a massive international service organization. Additionally, he is active in his church, and he recently rode his bike from Fort Collins to Yellowstone and plans on an even longer ride soon!

He began his career when he came to UMR as a Mechanical Engineering student and joined Delta Tau Delta. He had already experienced the fraternity through "pledge parties" that he had been invited to in high school, and he really liked the house. The driving factors in his decision to join were the community and the resources the house provided to him. Some of his favorite memories of the house were Greek Week, St. Pats, and the friends he developed while he was here. He thinks he added a calmness to the house during turbulent times — the house had fallen down on membership and he worked hard to keep it going. He wasn't sure if he would have made it through college if not for the support of the house, because it was a really tough time for him.

He came in as a Mechanical Engineering student, but ended up graduating in Engineering Management. He had a tough time at school, and a large part of that was due to trying to do engineering. The house is what kept him going during this tough time for him. He figured out that engineering was not really his cup of tea, and so he switched over to Engineering Management, a program he found that suited him much better. He feels like the house made it possible for him to keep going through university as he figured out what he wanted to do. He graduated in 1976 with an Engineering Management degree.

Tobey found that UMR provided him with the opportunities and experience to succeed. One such opportunity was an internship which allowed him to work on the Wankel Engine in St. Louis. Additionally, he felt the things he learned here made it possible for him to succeed at work and retire at the early age of 51. He believes the most important thing he learned at UMR was problem solving. This skill has helped him immensely in his career.

Once he graduated, Tobey began looking for a job. His ideal job was working for Fisher Controls in Marshalltown, Iowa, and he got it. He worked there for two years as a sales engineer. A large part of his job was entertaining the clients for his company. He enjoyed this job and had a lot of fun while he was there. While this was his ideal job after graduating, he found that his best job was as a sales rep for Dixon Paper. He worked there for 15 years selling industrial packaging and paper. Outside of these two jobs, he spent some time at Rofement Engineering in Prairie, Minnesota as the assistant for the Director of Sales.

Tobey is very content with how things have worked out. He was able to retire early due to his excellent job opportunities, and through living on less than he made and putting a lot of money into his savings. His proudest achievement is his son, who has become a mechanical engineer — Tobey is very proud of him because he feels like his son is the engineer that he never was.

Tobey Yadon, a fantastic Delt who values his friends and family. He lives life to the fullest even after retiring, doing things that he loves and contributing to the world around him. With a successful career, a great family, and an enjoyable retirement, what more could be asked for?`,
  },
  {
    name: "Britt Braswell",
    pledgeClass: "AΔ 180",
    years: "1985–1990",
    photos: "/images/alumni/braswell-1.jpg",
    bio: `Britt Braswell (AΔ, 180) came to UMR in 1985 as an electrical engineering student. He has worked hard at Ameren for nearly 26 years, enjoying the environment and loving what he does. He is in a very unique role and excels within the company. It all started out at Delta Tau Delta.

He began his college career as an electrical engineering student and joined Delta Tau Delta with a group of his friends, James Wheeler and Charlie Pulay. From start to finish he knew he wanted to do electrical engineering. Much of his time in college was spent in an electrical engineering lab. The club he was a part of had all the capacitors and chips that anyone could ever want. Here he learned to create circuit boards and built his own LED equalizer. During his time at Rolla, he got a co-op with Ameren, who he would later go on to work for. His experience and opportunities set him up to succeed.

Britt's time in the house was something he really enjoyed — from joining the house initially with his friends, and having two more friends join the following year, to all the fun things he did while at the house. Britt loved the atmosphere at the house and felt very welcome before he even joined. One story Britt likes to tell is about a scavenger hunt he and his pledge class went on. Each of them had to do something for their big. Britt's big, Steve Rymer, told him he had to get an officer from one of the sororities to sign and kiss his birthmark, located on his upper left thigh. He failed at first trying at ZTA, but at their second stop at Chi-O one of the officers had mercy on him. Britt is a big part of the house, as a majority of the house is currently part of his family tree, as well as Brian Booth, the housing corp vice president.

Britt graduated in 1990 looking for a job in St. Louis, but right off the bat he only had an offer in Davenport, Iowa. However, since his co-op at Ameren, he had kept in touch with them. He asked them for a job hoping to stay in St. Louis. It came down to the wire — on the last day he was able to accept the offer in Iowa, he still had no offer from Ameren. He called them up twice that day and they gave him an offer, which he immediately took.

Britt and his family — his wife and two kids — currently live in St. Louis, and his proudest achievement has been taking care of his family and raising his two kids. He is grateful that he makes enough to allow his wife to not have a job and be able to homeschool their two kids.

At work, Britt loves where he is at. He thinks very highly of those he works with, and feels very at home in the workplace. He currently works with Dave "Penguin" Robben, who graduated in '86. His biggest challenge over the years was when he was working at the power plant and the main transformer blew — a huge incident for the public, and what they didn't see was the time Britt and his coworkers had to put in to get the power plant back up and running (twelve, seven-day weeks with twelve-hour shifts!). Currently Britt holds a unique position at work because, as he said, he's one of those 80s kids who spent all their time on a computer, and with that knowledge of computers combined with his skill in electrical engineering, he currently does most of the system integration within Ameren.

Right now he has no plans to leave Ameren except for retiring in the future. He loves his job and looks forward to going in each day to work through the projects, which are still enjoyable to him. However, he believes that without his time at Rolla and within the house, he could have never lived as well off as he is now.

Britt Braswell — a great Delt who values his family, his career, and his friends. He's living life to the fullest, having found a place for himself at work and a great home to return to after a long day.`,
  },
  {
    name: "Nathan Steele",
    pledgeClass: "ΑΠ 241",
    years: "1995–2000",
    photos: "/images/alumni/steele-1.jpg",
    bio: `Nathan Steele (ΑΠ, 241) came to UMR in 1995 as an undecided student. He is now the general manager of a successful salt mine in Kansas. In just 15 years, he pushed his career to high levels, championed his church, and loved his wife and kids. Exceeding even his own expectations, Nathan Steele makes it a point to live life with integrity, delivering results and long-term value through highly engaged people.

Nathan began his college career as an undecided student, and joined Delta Tau Delta that semester as well. After three short semesters, he chose to study mining engineering. Early in his college career, he interned with Doe Run, where he worked underground and cemented his passion for mining — making big decisions, engineering in a mine, and blowing stuff up.

Nathan graduated in May of 2000 with a good idea of what he wanted to do with his career: underground metals, west of the Mississippi River. He spent the next eight years east of the Mississippi at a variety of mines from eastern Tennessee to Michigan to Ohio, doing both surface and underground operations. Over 15 years, Nathan worked with five different companies, in seven different locations. Nathan married his high school sweetheart, Carrie, and they have four kids. He and his family attend Lyons First Baptist Church, where Nathan serves as moderator.

At the age of 25, one of Nathan's proudest accomplishments was when he was assigned a temporary managerial role at a quarry in Ohio. The disclaimer his superior gave him was that the crew he would be in charge of was known for being mean, grumpy, and hard to work with — a crew that had worked together for over 29 years, longer than Nathan had been alive. Instead of going in guns blazing, Nathan established trust and respect between himself and the crew, which transformed their working attitude and outlook. By the end of his short managerial role at this quarry, the crew was happier and more productive than ever.

He is currently the General Manager for Lyons Salt Company, where he has successfully managed the mine out of a major slump and into a record-setting upturn. During his time with Lyons Salt, he has built his managerial team from the ground up to be a well-oiled, open and honest, hard-working, safety-oriented machine. In 2012, he oversaw the construction of a massive underground bulkhead — the first of its kind in the world — in order to save the mine from the imminent threat of water leaking into an experimental portion of the mine. This bulkhead required over 12,000 cubic yards of concrete and measured nearly 400-ft x 28-ft x 42-ft at its extents.

Nathan Steele — a hard-working Delt who has achieved success in his career, family life, and church.`,
  },
  {
    name: "John Goethe",
    pledgeClass: "Alpha Theta 201",
    years: "Class of the mid-1990s",
    photos: "/images/alumni/goethe-1.jpg\n/images/alumni/goethe-2.jpg",
    bio: `John Goethe was a member of the Alpha Theta pledge class of Epsilon Nu, well before the 1999 expansion. His pledge class project was the concrete pad and fence for the old dumpster that used to sit in the middle of the chapter yard. During his presidency there were only 15 members of the house. He is badge number 201.

John found joy from helping others. When asked about his favorite memory from college, he told the story of how one of his high school friends, Chad Allen, joined the house and needed extra help with his schooling — John took it upon himself to help him get through college no matter what it took, and along with other members of the house at the time, helped push him through to graduation.

His generosity didn't stop there. Upon graduating from UMR with a Master's Degree in Aerospace Engineering, he began his PhD program in Michigan. A nearby Delt chapter, later to be known as the Theta Xi chapter, was just beginning the colonization process, and John helped advise them as they worked to become an official chapter of Delta Tau Delta — Theta Xi was initiated in 1996.

After college, John got a job with Roush Industries in May of 1995 to run tests on their commercial van, the Ford Transit. Within two months he was moved overseas to Austria to continue working on the vehicle. After Roush, he moved to Wichita in 1996 to work for Boeing, where he designed and tested parts for the 737 Next Generation airplane, running over 18 months of testing to simulate 60 years of flying and prove the parts were up to par.

After his time at Boeing, he helped the University of Kansas chapter, Gamma Tau, recolonize after troubling times led to the chapter being dechartered in 2004. John and six other Delts from different chapters stepped in and helped the new members get a fresh start; the chapter got its charter back soon after and has been successful ever since.

Today John works for Spirit AeroSystems as Senior Manager for Core Structures Engineering, largely a research and development group that tests new materials for airplanes with the goal of making them cheaper and lighter. His job is to lead a team that tests different metals and to watch over his group members, making sure everyone works in a productive, safe manner.`,
  },
];

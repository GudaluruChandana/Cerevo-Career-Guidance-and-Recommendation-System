# from backend.data_loader import load_courses, load_colleges
# from sqlalchemy.orm import Session
# from backend.interest_mapper import map_interests

# print("🔥 FIXED SMART RECOMMENDER LOADED")


# # ================= HELPERS ================= #

# def normalize_marks(marks):
#     try:
#         return float(marks)
#     except:
#         return 0


# def eligible(marks, stream):

#     if stream in ["mpc", "bipc", "pcmb"]:
#         return marks >= 55

#     if stream in ["cec", "mec", "hec"]:
#         return marks >= 45

#     return True


# COURSE_CATEGORY_MAP = {

#     "computer": ["computer", "cse", "software", "it", "data", "ai", "cyber", "programming", "coding"],

#     "electrical": ["electrical", "electronics", "eee", "power"],

#     "mechanical": ["mechanical", "automobile", "mechatronics", "production"],

#     "civil": ["civil", "construction", "architecture", "structural"],

#     "medical": ["medical", "lab", "pharmacy", "nursing", "health", "biotech"],

#     "design": ["fashion", "design", "animation", "graphics", "ui", "ux", "multimedia"],

#     "food": ["food", "hotel", "catering", "hospitality", "chef"],

#     "skill": ["iti", "technician", "trade", "painter", "fitter", "welder", "plumber"],

#     # ✅ NEW DOMAINS
#     "business": ["commerce", "business", "bba", "mba", "management", "finance", "accounts"],

#     "law": ["law", "llb", "legal", "advocate"],

#     "media": ["media", "journalism", "mass", "communication", "content"],

#     "education": ["education", "teaching", "bed", "teacher"],

#     "arts": ["arts", "history", "political", "psychology", "sociology", "economics"]
# }

# # ================= ENTRANCE EXAMS MAP ================= #

# ENTRANCE_EXAMS_MAP = {

#     "mpc": ["JEE Main", "JEE Advanced", "EAMCET", "BITSAT"],
#     "bipc": ["NEET", "AIIMS", "JIPMER"],
#     "cec": ["CUET", "IPU CET"],
#     "hec": ["CLAT", "AILET", "LSAT"],

#     "computer": ["JEE Main", "CUET", "BITSAT"],
#     "medical": ["NEET"],
#     "law": ["CLAT", "AILET"],
#     "business": ["CUET", "IPMAT"],
#     "design": ["NIFT", "NID", "UCEED"]
# }



# def detect_branch(course_name,user_domains):

#     name = course_name.lower()

#     for category, keys in COURSE_CATEGORY_MAP.items():
#         for k in keys:
#             if k in name:
#                 return category
    
#     # fallback: try interest domains
#     if user_domains:
#         return user_domains[0]

#     return "general"


# # ================= CONFIDENCE ================= #

# def get_confidence(score):

#     if score >= 80:
#         return {
#             "label": "Strong Career Match",
#             "message": "You are highly suitable for this path.",
#             "advice": "Focus on specialization."
#         }

#     if score >= 65:
#         return {
#             "label": "Good Fit",
#             "message": "You have good potential.",
#             "advice": "Improve skills."
#         }

#     return {
#         "label": "Average Match",
#         "message": "Needs improvement.",
#         "advice": "Build fundamentals."
#     }


# # ================= BACKUP ================= #

# def get_backup_paths(stream):

#     if stream == "MPC":
#         return ["B.Sc", "BCA", "Diploma"]

#     if stream == "BIPC":
#         return ["B.Sc Biology", "Nursing"]

#     if stream == "CEC":
#         return ["B.Com", "BBA"]

#     return ["General Degree"]


# # ================= DEDUP ================= #

# def deduplicate(recs):

#     seen = set()
#     final = []

#     for r in recs:

#         name = r["career_path"]

#         if name not in seen:
#             seen.add(name)
#             final.append(r)

#     return final


# # ================= MAIN ================= #

# def recommend(payload: dict, user_profile: dict = None, db=None):

#     courses = load_courses()
#     colleges = load_colleges()

#     marks = normalize_marks(payload.get("marks", 0))

#     interest_data = map_interests(payload.get("interests", []))

#     user_domains = interest_data.get("domains", [])
#     user_streams = interest_data.get("streams", [])

#     interests = [i.lower() for i in payload.get("interests", [])]

#     location = payload.get("location", "").lower()
#     ambition = payload.get("ambition", "balanced")
#     budget = payload.get("budget")

#     stage = payload.get("stage", "").lower()
#     top_n = payload.get("top_n", 3)

#     results = []

#     # ================= PRIORITY WEIGHTS =================
#     DEGREE_WEIGHT = 30
#     DIPLOMA_WEIGHT = 15
#     ITI_WEIGHT = 5

#     for course in courses:

#         entry = course.get("entry_level", "").lower()

#         if stage not in entry:
#             continue


#         course_name = course.get("course_name", "").lower()
#         stream_list = course.get("stream", "").lower().split(",")

#         branch = detect_branch(course_name,user_domains)

#         best_score = 0
#         best_stream = None


#         # ================= COURSE LEVEL =================
#         if "b.tech" in course_name or "engineering" in course_name:
#             base_weight = DEGREE_WEIGHT
#         elif "diploma" in course_name:
#             base_weight = DIPLOMA_WEIGHT
#         elif "iti" in course_name:
#             base_weight = ITI_WEIGHT
#         else:
#             base_weight = 10


#         for stream in stream_list:

#             stream = stream.strip()

#             if not eligible(marks, stream):
#                 continue


#             score = 0


#             # ================= MARKS (40) =================
#             score += (marks / 100) * 25


#             # ================= COURSE LEVEL BONUS =================
#             score += base_weight


#             # ================= DOMAIN MATCH (25) =================
#             if branch in user_domains:
#                 score += 30


#             # ================= STREAM MATCH (20) =================
#             if stream in user_streams:
#                 score += 20


#             # ================= INTEREST MATCH (15) =================
#             for i in interests:
#                 if i in course_name:
#                     score += 8


#             # ================= AMBITION =================
#             if ambition == "ambitious":
#                 score += 10
#             elif ambition == "safe":
#                 score -= 5


#             # score = int(min(max(score, 40), 100))
#             score = int(min(max(score, 45), 95))



#             if score > best_score:
#                 best_score = score
#                 best_stream = stream


#         if not best_stream:
#             continue


#         # ================= COLLEGES =================
#         matched_colleges = [
#             c for c in colleges
#             if best_stream in c.get("course_supported", "").lower()
#             and (not location or location in c.get("city", "").lower())
#             and (not budget or float(c.get("fees", 0)) <= float(budget))
#         ]


#         confidence = get_confidence(best_score)


#         roadmap = [
#             "Build Fundamentals",
#             "Projects / Practice",
#             "Internship",
#             "Specialization"
#         ]


#         career_outcomes = [
#             f"{branch.title()} Professional",
#             "Industry Expert",
#             "Consultant"
#         ]
#         # ================= ENTRANCE EXAMS =================

#         exams = []
#         # From stream
#         exams += ENTRANCE_EXAMS_MAP.get(best_stream.lower(), [])

#         # From domain
#         exams += ENTRANCE_EXAMS_MAP.get(branch, [])

#         # Remove duplicates
#         exams = list(set(exams))

#         # Boost score based on entrance exams relevance
#         # ================= SCORE ENHANCEMENT =================

#         # Boost score based on entrance exams relevance
#         best_score = min(95, best_score + len(exams) * 2)

#         # Small bonus if strong domain match
#         if branch in user_domains:
#             best_score = min(95, best_score + 3)

#         # Stability factor (prevents extreme jumps)
#         if best_score > 90:
#             best_score = 90 + (best_score - 90) // 2


#         # Fallback if no exams found
#         if not exams:
#             if best_stream.lower() in ["mpc", "pcmb"]:
#                 exams = ["CUET", "State CET"]
#             elif best_stream.lower() == "bipc":
#                 exams = ["NEET"]
#             elif best_stream.lower() in ["cec", "hec"]:
#                 exams = ["CUET"]
#             else:
#                 exams = ["University Entrance Test"]

#         results.append({

#             "career_path": f"{course['course_name']} ({best_stream.upper()})",

#             "recommended_stream": best_stream.upper(),

#             "recommendation_score": f"{best_score}%",

#             "confidence_label": confidence["label"],

#             "confidence_message": confidence["message"],

#             "confidence_advice": confidence["advice"],

#             "career_outcomes": career_outcomes,

#             "roadmap": roadmap,

#             "colleges": matched_colleges,

#             "backup_options": get_backup_paths(best_stream.upper()),

#             "entrance_exams": exams
#         })


#     # ================= FALLBACK =================

#     if not results:

#         return {
#             "count": 1,
#             "results": [{
#                 "career_path": "B.Tech Computer Science (MPC)",
#                 "recommended_stream": "MPC",
#                 "recommendation_score": "65%",
#                 "confidence_label": "Exploration Needed",
#                 "confidence_message": "Explore engineering domains.",
#                 "confidence_advice": "Strengthen technical skills.",
#                 "career_outcomes": ["Engineer", "Developer"],
#                 "roadmap": ["Basics", "Projects", "Internship"],
#                 "colleges": [],
#                 "backup_options": ["BCA", "Diploma"],
#                 "entrance_exams": ["JEE"]
#             }]
#         }
#     # ================= SCORE RANDOMIZATION =================
#     import random

#     for r in results:
#         base = int(r["recommendation_score"].replace("%", ""))
#         base = min(95, max(45, base + random.randint(-3, 3)))
#         r["recommendation_score"] = str(base) + "%"

#     # ================= SORT =================

#     results.sort(
#         key=lambda x: int(x["recommendation_score"].replace("%", "")),
#         reverse=True
#     )


#     results = deduplicate(results)


#     view_all = payload.get("view_all", False)

#     if view_all:
#         return {
#             "count": len(results),
#             "results": results
#         }


#     return {
#         "count": min(len(results), top_n),
#         "results": results[:top_n]
#     }




# from backend.data_loader import load_courses, load_colleges
# from sqlalchemy.orm import Session
# from backend.interest_mapper import map_interests
# import pandas as pd

# metadata_df = pd.read_csv("backend/career_metadata.csv")

# print("🔥 FIXED SMART RECOMMENDER LOADED")


# # ================= HELPERS ================= #

# def normalize_marks(marks):
#     try:
#         return float(marks)
#     except:
#         return 0


# def eligible(marks, stream):

#     if stream in ["mpc", "bipc", "pcmb"]:
#         return marks >= 55

#     if stream in ["cec", "mec", "hec"]:
#         return marks >= 45

#     return True


# # COURSE_CATEGORY_MAP = {

# #     "computer": ["computer", "cse", "software", "it", "data", "ai", "cyber", "programming", "coding"],

# #     "electrical": ["electrical", "electronics", "eee", "power"],

# #     "mechanical": ["mechanical", "automobile", "mechatronics", "production"],

# #     "civil": ["civil", "construction", "architecture", "structural"],

# #     "medical": ["medical", "lab", "pharmacy", "nursing", "health", "biotech"],

# #     "design": ["fashion", "design", "animation", "graphics", "ui", "ux", "multimedia"],

# #     "food": ["food", "hotel", "catering", "hospitality", "chef"],

# #     "skill": ["iti", "technician", "trade", "painter", "fitter", "welder", "plumber"],

# #     # ✅ NEW DOMAINS
# #     "business": ["commerce", "business", "bba", "mba", "management", "finance", "accounts"],

# #     "law": ["law", "llb", "legal", "advocate"],

# #     "media": ["media", "journalism", "mass", "communication", "content"],

# #     "education": ["education", "teaching", "bed", "teacher"],

# #     "arts": ["arts", "history", "political", "psychology", "sociology", "economics"]
# # }
# # ================= COURSE SPECIFIC SALARY ================= #

# # COURSE_SPECIFIC_SALARY = {
# #     "ai": {
# #         "entry": "₹6 – 10 LPA",
# #         "mid": "₹15 – 30 LPA",
# #         "senior": "₹40+ LPA"
# #     },
# #     "data": {
# #         "entry": "₹5 – 9 LPA",
# #         "mid": "₹12 – 25 LPA",
# #         "senior": "₹35+ LPA"
# #     },
# #     "bca": {
# #         "entry": "₹3 – 6 LPA",
# #         "mid": "₹8 – 15 LPA",
# #         "senior": "₹20+ LPA"
# #     },
# #     "cyber": {
# #         "entry": "₹5 – 8 LPA",
# #         "mid": "₹12 – 22 LPA",
# #         "senior": "₹30+ LPA"
# #     },
# #     "cloud": {
# #         "entry": "₹6 – 9 LPA",
# #         "mid": "₹15 – 28 LPA",
# #         "senior": "₹40+ LPA"
# #     }
# # }
# # # ================= COURSE SPECIFIC ENTRANCE EXAMS ================= #

# # COURSE_SPECIFIC_EXAMS = {
# #     "ai": ["JEE Main", "BITSAT", "CUET"],
# #     "data": ["CUET", "JEE Main"],
# #     "bca": ["CUET", "State University Entrance"],
# #     "cyber": ["JEE Main", "CUET"],
# #     "cloud": ["JEE Main", "BITSAT"]
# # }
# # # ================= COURSE SPECIFIC BACKUP ================= #

# # COURSE_SPECIFIC_BACKUP = {
# #     "ai": ["B.Sc AI", "BCA", "Diploma in AI"],
# #     "data": ["B.Sc Data Science", "BCA"],
# #     "bca": ["B.Sc IT", "Diploma in CS"],
# #     "cyber": ["B.Sc Cyber Security", "Diploma in Networking"],
# #     "cloud": ["B.Sc Cloud Computing", "BCA"]
# # }

# # ================= SALARY MAP ================= #

# SALARY_MAP = {
#     "computer": {
#         "entry": "₹4 – 8 LPA",
#         "mid": "₹10 – 20 LPA",
#         "senior": "₹25+ LPA"
#     },
#     "civil": {
#         "entry": "₹3 – 6 LPA",
#         "mid": "₹8 – 15 LPA",
#         "senior": "₹18+ LPA"
#     },
#     "mechanical": {
#         "entry": "₹3 – 6 LPA",
#         "mid": "₹7 – 14 LPA",
#         "senior": "₹18+ LPA"
#     },
#     "medical": {
#         "entry": "₹6 – 12 LPA",
#         "mid": "₹15 – 30 LPA",
#         "senior": "₹40+ LPA"
#     },
#     "law": {
#         "entry": "₹4 – 7 LPA",
#         "mid": "₹10 – 25 LPA",
#         "senior": "₹35+ LPA"
#     },
#     "business": {
#         "entry": "₹3 – 6 LPA",
#         "mid": "₹8 – 18 LPA",
#         "senior": "₹25+ LPA"
#     },
#     "design": {
#         "entry": "₹3 – 6 LPA",
#         "mid": "₹8 – 15 LPA",
#         "senior": "₹20+ LPA"
#     }
# }


# # ================= CAREER OUTCOME MAP ================= #

# CAREER_OUTCOME_MAP = {
#     "computer": [
#         "Software Developer",
#         "Data Scientist",
#         "AI Engineer",
#         "Cloud Architect"
#     ],
#     "civil": [
#         "Site Engineer",
#         "Structural Engineer",
#         "Project Manager"
#     ],
#     "law": [
#         "Advocate",
#         "Legal Advisor",
#         "Corporate Lawyer"
#     ],
#     "business": [
#         "Business Analyst",
#         "Marketing Manager",
#         "Entrepreneur"
#     ]
# }
# # ================= COURSE SPECIFIC OUTCOME MAP ================= #

# COURSE_SPECIFIC_OUTCOME = {
#     "ai": [
#         "AI Engineer",
#         "Machine Learning Engineer",
#         "Deep Learning Specialist"
#     ],
#     "data": [
#         "Data Scientist",
#         "Data Analyst",
#         "Business Intelligence Engineer"
#     ],
#     "bca": [
#         "Software Developer",
#         "Web Developer",
#         "Application Developer"
#     ],
#     "cyber": [
#         "Cyber Security Analyst",
#         "Ethical Hacker",
#         "Security Engineer"
#     ],
#     "cloud": [
#         "Cloud Engineer",
#         "DevOps Engineer",
#         "Cloud Architect"
#     ]
# }



# # ================= ROADMAP MAP ================= #

# ROADMAP_MAP = {
#     "computer": [
#         "Learn Programming (Python / Java)",
#         "Build Real Projects",
#         "Do Internship in Tech Company",
#         "Master Specialization (AI / Data / Cloud)"
#     ],
#     "civil": [
#         "Study Core Civil Subjects",
#         "Site Internship",
#         "Learn Structural Tools (AutoCAD / STAAD)",
#         "Prepare for Government Exams / M.Tech"
#     ],
#     "law": [
#         "Clear CLAT / AILET",
#         "Pursue LLB",
#         "Intern Under Senior Advocate",
#         "Specialize in Corporate / Criminal Law"
#     ],
#     "business": [
#         "Learn Business Fundamentals",
#         "Intern in Company",
#         "Build Management Skills",
#         "MBA / Specialization"
#     ]
# }
# COURSE_SPECIFIC_ROADMAP = {
#     "ai": [
#         "Master Python & Mathematics",
#         "Learn ML & Deep Learning",
#         "Build AI Projects",
#         "Work on Real AI Internship"
#     ],
#     "data": [
#         "Learn Python & SQL",
#         "Study Statistics",
#         "Build Data Projects",
#         "Practice on Kaggle"
#     ],
#     "bca": [
#         "Learn Programming Basics",
#         "Build Web Applications",
#         "Intern in Software Company",
#         "Choose Specialization"
#     ],
#     "cyber": [
#         "Learn Networking Basics",
#         "Study Cyber Security Tools",
#         "Practice Ethical Hacking",
#         "Prepare for CEH Certification"
#     ],
#     "cloud": [
#         "Learn Linux & Networking",
#         "Study AWS / Azure",
#         "Deploy Cloud Projects",
#         "Get Cloud Certification"
#     ]
# }

# # ================= ENTRANCE EXAMS MAP ================= #

# ENTRANCE_EXAMS_MAP = {

#     "mpc": ["JEE Main", "JEE Advanced", "EAMCET", "BITSAT"],
#     "bipc": ["NEET", "AIIMS", "JIPMER"],
#     "cec": ["CUET", "IPU CET"],
#     "hec": ["CLAT", "AILET", "LSAT"],

#     "computer": ["JEE Main", "CUET", "BITSAT"],
#     "medical": ["NEET"],
#     "law": ["CLAT", "AILET"],
#     "business": ["CUET", "IPMAT"],
#     "design": ["NIFT", "NID", "UCEED"]
# }



# # def detect_branch(course_name,user_domains):

# #     name = course_name.lower()

# #     for category, keys in COURSE_CATEGORY_MAP.items():
# #         for k in keys:
# #             if k in name:
# #                 return category
    
# #     # fallback: try interest domains
# #     if user_domains:
# #         return user_domains[0]

# #     return "general"


# # ================= CONFIDENCE ================= #

# def get_confidence(score):

#     if score >= 80:
#         return {
#             "label": "Strong Career Match",
#             "message": "You are highly suitable for this path.",
#             "advice": "Focus on specialization."
#         }

#     if score >= 65:
#         return {
#             "label": "Good Fit",
#             "message": "You have good potential.",
#             "advice": "Improve skills."
#         }

#     return {
#         "label": "Average Match",
#         "message": "Needs improvement.",
#         "advice": "Build fundamentals."
#     }


# # ================= BACKUP ================= #

# def get_backup_paths(stream):

#     if stream == "MPC":
#         return ["B.Sc", "BCA", "Diploma"]

#     if stream == "BIPC":
#         return ["B.Sc Biology", "Nursing"]

#     if stream == "CEC":
#         return ["B.Com", "BBA"]

#     return ["General Degree"]


# # ================= DEDUP ================= #

# def deduplicate(recs):

#     seen = set()
#     final = []

#     for r in recs:

#         name = r["career_path"]

#         if name not in seen:
#             seen.add(name)
#             final.append(r)

#     return final

# def get_metadata(course_name, metadata_df):
#     course_name = course_name.lower()

#     for _, row in metadata_df.iterrows():
#         keyword = str(row["keyword"]).lower()

#         if keyword in course_name:
#             return {
#                 "salary": {
#                     "entry": row["entry_salary"],
#                     "mid": row["mid_salary"],
#                     "senior": row["senior_salary"]
#                 },
#                 "roadmap": row["roadmap"].split("|"),
#                 "entrance_exams": row["entrance_exams"].split("|"),
#                 "backup_options": row["backup_options"].split("|")
#             }

#     return None

# # ================= MAIN ================= #

# def recommend(payload: dict, user_profile: dict = None, db=None):

#     courses = load_courses()
#     colleges = load_colleges()

#     marks = normalize_marks(payload.get("marks", 0))

#     interest_data = map_interests(payload.get("interests", []))

#     user_domains = interest_data.get("domains", [])
#     user_streams = interest_data.get("streams", [])

#     interests = [i.lower() for i in payload.get("interests", [])]

#     location = payload.get("location", "").lower()
#     ambition = payload.get("ambition", "balanced")
#     budget = payload.get("budget")

#     stage = payload.get("stage", "").lower()
#     top_n = payload.get("top_n", 3)
#     print("----- RECOMMENDER DEBUG -----")
#     print("Stage:", stage)
#     print("Marks:", marks)
#     print("Interests:", payload.get("interests"))
#     print("User Domains:", interest_data.get("domains"))
#     print("User Streams:", interest_data.get("streams"))
#     print("------------------------------")

#     results = []

#     # ================= PRIORITY WEIGHTS =================
#     DEGREE_WEIGHT = 30
#     DIPLOMA_WEIGHT = 15
#     ITI_WEIGHT = 5

#     for course in courses:

#         # entry = course.get("entry_level", "").lower()

#         # if stage not in entry:
#         #     continue
#         entry = course.get("entry_level", "").lower()

#         # ===== FLEXIBLE STAGE MATCH =====
#         # if stage:
#         #     if "10th" in stage and "10" not in entry:
#         #         continue
#         #     if "inter" in stage and "inter" not in entry:
#         #         continue
#         # if stage and stage not in entry:
#         #     continue

#         entry = course.get("entry_level", "").lower()

#         # Proper stage match
#         if stage:
#             if stage != entry:
#                 continue



#         course_name = course.get("course_name", "").lower()
#         stream_list = course.get("stream", "").lower().split(",")

#         # branch = detect_branch(course_name,user_domains)
#         branch = course.get("category", "general").lower()


#         best_score = 0
#         best_stream = None


#         # ================= COURSE LEVEL =================
#         if "b.tech" in course_name or "engineering" in course_name:
#             base_weight = DEGREE_WEIGHT
#         elif "diploma" in course_name:
#             base_weight = DIPLOMA_WEIGHT
#         elif "iti" in course_name:
#             base_weight = ITI_WEIGHT
#         else:
#             base_weight = 10


#         for stream in stream_list:

#             stream = stream.strip()

#             if not eligible(marks, stream):
#                 continue


#             score = 0


#             # ================= MARKS (40) =================
#             score += (marks / 100) * 25


#             # ================= COURSE LEVEL BONUS =================
#             score += base_weight


#             # ================= DOMAIN MATCH (25) =================
#             if branch in user_domains:
#                 score += 30


#             # ================= STREAM MATCH (20) =================
#             if stream in user_streams:
#                 score += 20


#             # ================= INTEREST MATCH (15) =================
#             for i in interests:
#                 if i in course_name:
#                     score += 8


#             # ================= AMBITION =================
#             if ambition == "ambitious":
#                 score += 10
#             elif ambition == "safe":
#                 score -= 5


#             # score = int(min(max(score, 40), 100))
#             score = int(min(max(score, 45), 95))



#             if score > best_score:
#                 best_score = score
#                 best_stream = stream


#         if not best_stream:
#             continue


#         # ================= COLLEGES =================
#         matched_colleges = [
#             c for c in colleges
#             if best_stream in c.get("course_supported", "").lower()
#             and (not location or location in c.get("city", "").lower())
#             and (not budget or float(c.get("fees", 0)) <= float(budget))
#         ]


#         confidence = get_confidence(best_score)


#         # roadmap = [
#         #     "Build Fundamentals",
#         #     "Projects / Practice",
#         #     "Internship",
#         #     "Specialization"
#         # ]


#         # career_outcomes = [
#         #     f"{branch.title()} Professional",
#         #     "Industry Expert",
#         #     "Consultant"
#         # ]
#         # career_outcomes = CAREER_OUTCOME_MAP.get(
#         #     branch,
#         #     [
#         #         f"{branch.title()} Professional",
#         #         "Industry Expert"
#         #     ]
#         # )
#         # ================= COURSE SPECIFIC OUTCOMES ================= #

#         career_outcomes = None

#         for key, values in COURSE_SPECIFIC_OUTCOME.items():
#             if key in course_name:
#                 career_outcomes = values
#                 break

#         if not career_outcomes:
#             career_outcomes = CAREER_OUTCOME_MAP.get(
#                 branch,
#                 [
#                     f"{branch.title()} Professional",
#                     "Industry Expert"
#                 ]
#             )


#         # roadmap = ROADMAP_MAP.get(
#         #     branch,
#         #     [
#         #         "Build Fundamentals",
#         #         "Projects",
#         #         "Internship",
#         #         "Specialization"
#         #     ]
#         # )
#         # ================= DYNAMIC ROADMAP ================= #

#         # ================= COURSE SPECIFIC ROADMAP ================= #

#         roadmap = None

#         for key, values in COURSE_SPECIFIC_ROADMAP.items():
#             if key in course_name:
#                 roadmap = values
#                 break

#         if not roadmap:
#             roadmap = ROADMAP_MAP.get(
#                 branch,
#                 [
#                     "Build Fundamentals",
#                     "Projects",
#                     "Internship",
#                     "Specialization"
#                 ]
#             )



#         # # ================= ENTRANCE EXAMS =================

#         # exams = []
#         # # From stream
#         # exams += ENTRANCE_EXAMS_MAP.get(best_stream.lower(), [])

#         # # From domain
#         # exams += ENTRANCE_EXAMS_MAP.get(branch, [])

#         # # Remove duplicates
#         # exams = list(set(exams))
#         # ================= COURSE SPECIFIC EXAMS ================= #

#         exams = None

#         for key, value in COURSE_SPECIFIC_EXAMS.items():
#             if key in course_name:
#                 exams = value
#                 break

#         if not exams:
#             exams = []
#             exams += ENTRANCE_EXAMS_MAP.get(best_stream.lower(), [])
#             exams += ENTRANCE_EXAMS_MAP.get(branch, [])
#             exams = list(set(exams))


#         # Boost score based on entrance exams relevance
#         # ================= SCORE ENHANCEMENT =================

#         # Boost score based on entrance exams relevance
#         best_score = min(95, best_score + len(exams) * 2)

#         # Small bonus if strong domain match
#         if branch in user_domains:
#             best_score = min(95, best_score + 3)

#         # Stability factor (prevents extreme jumps)
#         if best_score > 90:
#             best_score = 90 + (best_score - 90) // 2


#         # Fallback if no exams found
#         if not exams:
#             if best_stream.lower() in ["mpc", "pcmb"]:
#                 exams = ["CUET", "State CET"]
#             elif best_stream.lower() == "bipc":
#                 exams = ["NEET"]
#             elif best_stream.lower() in ["cec", "hec"]:
#                 exams = ["CUET"]
#             else:
#                 exams = ["University Entrance Test"]
#         # ================= COURSE SPECIFIC SALARY LOGIC ================= #

#         salary = None

#         for key, value in COURSE_SPECIFIC_SALARY.items():
#             if key in course_name:
#                 salary = value
#                 break

#         if not salary:
#             salary = SALARY_MAP.get(
#                 branch,
#                 {
#                     "entry": "₹3 – 5 LPA",
#                     "mid": "₹6 – 12 LPA",
#                     "senior": "₹15+ LPA"
#                 }
#             )
#         # ================= COURSE SPECIFIC BACKUP ================= #

#         backup = None

#         for key, value in COURSE_SPECIFIC_BACKUP.items():
#             if key in course_name:
#                 backup = value
#                 break

#         if not backup:
#             backup = get_backup_paths(best_stream.upper())

#         results.append({

#             "career_path": f"{course['course_name']} ({best_stream.upper()})",

#             "recommended_stream": best_stream.upper(),

#             "recommendation_score": f"{best_score}%",

#             "confidence_label": confidence["label"],

#             "confidence_message": confidence["message"],

#             "confidence_advice": confidence["advice"],

#             "career_outcomes": career_outcomes,

#             "roadmap": roadmap,

#             "colleges": matched_colleges,

#             "backup_options": backup,

#             "entrance_exams": exams,
#             "salary": salary


#         })


#     # ================= FALLBACK =================

#     if not results:

#         return {
#             "count": 1,
#             "results": [{
#                 "career_path": "B.Tech Computer Science (MPC)",
#                 "recommended_stream": "MPC",
#                 "recommendation_score": "65%",
#                 "confidence_label": "Exploration Needed",
#                 "confidence_message": "Explore engineering domains.",
#                 "confidence_advice": "Strengthen technical skills.",
#                 "career_outcomes": ["Engineer", "Developer"],
#                 "roadmap": ["Basics", "Projects", "Internship"],
#                 "colleges": [],
#                 "backup_options": ["BCA", "Diploma"],
#                 "entrance_exams": ["JEE"]
#             }]
#         }
#     # ================= SCORE RANDOMIZATION =================
#     import random

#     for r in results:
#         base = int(r["recommendation_score"].replace("%", ""))
#         base = min(95, max(45, base + random.randint(-3, 3)))
#         r["recommendation_score"] = str(base) + "%"

#     # ================= SORT =================

#     results.sort(
#         key=lambda x: int(x["recommendation_score"].replace("%", "")),
#         reverse=True
#     )


#     results = deduplicate(results)


#     view_all = payload.get("view_all", False)

#     if view_all:
#         return {
#             "count": len(results),
#             "results": results
#         }


#     return {
#         "count": min(len(results), top_n),
#         "results": results[:top_n]
#     }




# from backend.data_loader import load_courses, load_colleges
# from backend.interest_mapper import map_interests
# import pandas as pd
# import random

# # Load metadata once
# metadata_df = pd.read_csv("backend/data/career_metadata.csv")

# print("🔥 SMART METADATA RECOMMENDER LOADED")


# # ================= HELPERS ================= #

# def normalize_marks(marks):
#     try:
#         return float(marks)
#     except:
#         return 0


# def eligible(marks, stream):
#     if stream in ["mpc", "bipc", "pcmb"]:
#         return marks >= 55
#     if stream in ["cec", "mec", "hec"]:
#         return marks >= 45
#     return True


# # ================= SALARY MAP (Fallback) ================= #

# SALARY_MAP = {
#     "computer": {"entry": "₹4 – 8 LPA", "mid": "₹10 – 20 LPA", "senior": "₹25+ LPA"},
#     "civil": {"entry": "₹3 – 6 LPA", "mid": "₹8 – 15 LPA", "senior": "₹18+ LPA"},
#     "mechanical": {"entry": "₹3 – 6 LPA", "mid": "₹7 – 14 LPA", "senior": "₹18+ LPA"},
#     "medical": {"entry": "₹6 – 12 LPA", "mid": "₹15 – 30 LPA", "senior": "₹40+ LPA"},
#     "law": {"entry": "₹4 – 7 LPA", "mid": "₹10 – 25 LPA", "senior": "₹35+ LPA"},
#     "business": {"entry": "₹3 – 6 LPA", "mid": "₹8 – 18 LPA", "senior": "₹25+ LPA"},
#     "design": {"entry": "₹3 – 6 LPA", "mid": "₹8 – 15 LPA", "senior": "₹20+ LPA"}
# }


# # ================= ROADMAP MAP (Fallback) ================= #

# ROADMAP_MAP = {
#     "computer": [
#         "Learn Programming (Python / Java)",
#         "Build Real Projects",
#         "Do Internship in Tech Company",
#         "Master Specialization"
#     ],
#     "civil": [
#         "Study Core Subjects",
#         "Site Internship",
#         "Learn Tools (AutoCAD / STAAD)",
#         "Prepare for M.Tech / Govt Exams"
#     ],
#     "law": [
#         "Clear CLAT / AILET",
#         "Pursue LLB",
#         "Intern Under Senior Advocate",
#         "Choose Specialization"
#     ],
#     "business": [
#         "Learn Business Fundamentals",
#         "Intern in Company",
#         "Build Management Skills",
#         "MBA / Specialization"
#     ]
# }


# # ================= ENTRANCE MAP (Fallback) ================= #

# ENTRANCE_EXAMS_MAP = {
#     "mpc": ["JEE Main", "EAMCET", "BITSAT"],
#     "bipc": ["NEET"],
#     "cec": ["CUET"],
#     "hec": ["CLAT"],
#     "law": ["CLAT", "AILET"],
#     "business": ["CUET", "IPMAT"]
# }


# # ================= CONFIDENCE ================= #

# def get_confidence(score):
#     if score >= 80:
#         return {
#             "label": "Strong Career Match",
#             "message": "You are highly suitable for this path.",
#             "advice": "Focus on specialization."
#         }
#     if score >= 65:
#         return {
#             "label": "Good Fit",
#             "message": "You have good potential.",
#             "advice": "Improve skills."
#         }
#     return {
#         "label": "Average Match",
#         "message": "Needs improvement.",
#         "advice": "Build fundamentals."
#     }


# # ================= BACKUP ================= #

# def get_backup_paths(stream):
#     if stream == "MPC":
#         return ["B.Sc", "BCA", "Diploma"]
#     if stream == "BIPC":
#         return ["B.Sc Biology", "Nursing"]
#     if stream == "CEC":
#         return ["B.Com", "BBA"]
#     return ["General Degree"]


# # ================= DEDUP ================= #

# def deduplicate(recs):
#     seen = set()
#     final = []
#     for r in recs:
#         if r["career_path"] not in seen:
#             seen.add(r["career_path"])
#             final.append(r)
#     return final


# # ================= SMART METADATA MATCH ================= #

# def get_metadata(course_name):
#     course_name = course_name.lower()

#     # Sort by keyword length (longest first)
#     sorted_rows = sorted(
#         metadata_df.to_dict("records"),
#         key=lambda x: len(str(x["keyword"])),
#         reverse=True
#     )

#     for row in sorted_rows:
#         keyword = str(row["keyword"]).lower().strip()

#         # Safer word-boundary match
#         if keyword in course_name:
#             return {
#                 "salary": {
#                     "entry": row["entry_salary"],
#                     "mid": row["mid_salary"],
#                     "senior": row["senior_salary"]
#                 },
#                 "roadmap": row["roadmap"].split("|"),
#                 "entrance_exams": row["entrance_exams"].split("|"),
#                 "backup_options": row["backup_options"].split("|"),
#                 "career_outcomes": row["career_outcomes"].split("|")
#                 if "career_outcomes" in row and pd.notna(row["career_outcomes"])
#                 else None
#             }

#     return None






# # ================= MAIN ================= #

# def recommend(payload: dict, user_profile: dict = None, db=None):

#     courses = load_courses()
#     colleges = load_colleges()

#     marks = normalize_marks(payload.get("marks", 0))
#     interest_data = map_interests(payload.get("interests", []))

#     user_domains = interest_data.get("domains", [])
#     user_streams = interest_data.get("streams", [])

#     interests = [i.lower() for i in payload.get("interests", [])]

#     location = payload.get("location", "").lower()
#     ambition = payload.get("ambition", "balanced")
#     budget = payload.get("budget")

#     stage = payload.get("stage", "").lower()
#     top_n = payload.get("top_n", 3)

#     results = []

#     DEGREE_WEIGHT = 30
#     DIPLOMA_WEIGHT = 15
#     ITI_WEIGHT = 5

#     for course in courses:

#         entry = course.get("entry_level", "").lower()
#         if stage and stage != entry:
#             continue

#         course_name = course.get("course_name", "").lower()
#         stream_list = course.get("stream", "").lower().split(",")
#         branch = course.get("category", "general").lower()

#         best_score = 0
#         best_stream = None

#         if "b.tech" in course_name or "engineering" in course_name:
#             base_weight = DEGREE_WEIGHT
#         elif "diploma" in course_name:
#             base_weight = DIPLOMA_WEIGHT
#         elif "iti" in course_name:
#             base_weight = ITI_WEIGHT
#         else:
#             base_weight = 10

#         for stream in stream_list:
#             stream = stream.strip()

#             if not eligible(marks, stream):
#                 continue

#             score = 0
#             score += (marks / 100) * 25
#             score += base_weight

#             if branch in user_domains:
#                 score += 30

#             if stream in user_streams:
#                 score += 20

#             for i in interests:
#                 if i in course_name:
#                     score += 8

#             if ambition == "ambitious":
#                 score += 10
#             elif ambition == "safe":
#                 score -= 5

#             score = int(min(max(score, 45), 95))

#             if score > best_score:
#                 best_score = score
#                 best_stream = stream

#         if not best_stream:
#             continue

#         matched_colleges = [
#             c for c in colleges
#             if best_stream in c.get("course_supported", "").lower()
#             and (not location or location in c.get("city", "").lower())
#             and (not budget or float(c.get("fees", 0)) <= float(budget))
#         ]

#         confidence = get_confidence(best_score)

#         # ===== METADATA MATCH =====
#                 # ===== METADATA MATCH =====
#         metadata = get_metadata(course_name)

#         if metadata:
#             salary = metadata["salary"]
#             roadmap = metadata["roadmap"]
#             exams = metadata["entrance_exams"]
#             backup = metadata["backup_options"]
#         else:
#             salary = SALARY_MAP.get(branch, {
#                 "entry": "₹3 – 5 LPA",
#                 "mid": "₹6 – 12 LPA",
#                 "senior": "₹15+ LPA"
#             })

#             roadmap = ROADMAP_MAP.get(branch, [
#                 "Build Fundamentals",
#                 "Projects",
#                 "Internship",
#                 "Specialization"
#             ])

#             exams = []
#             exams += ENTRANCE_EXAMS_MAP.get(best_stream.lower(), [])
#             exams += ENTRANCE_EXAMS_MAP.get(branch, [])
#             exams = list(set(exams))

#             backup = get_backup_paths(best_stream.upper())

#         # ===== CAREER OUTCOMES (Keep simple fallback) =====
#         career_outcomes = [f"{branch.title()} Professional"]

#         # ===== Slight score randomization =====
#         best_score = min(95, max(45, best_score + random.randint(-3, 3)))

#         results.append({
#             "career_path": f"{course['course_name']} ({best_stream.upper()})",
#             "recommended_stream": best_stream.upper(),
#             "recommendation_score": f"{best_score}%",
#             "confidence_label": confidence["label"],
#             "confidence_message": confidence["message"],
#             "confidence_advice": confidence["advice"],
#             "career_outcomes": career_outcomes,
#             "roadmap": roadmap,
#             "colleges": matched_colleges,
#             "backup_options": backup,
#             "entrance_exams": exams,
#             "salary": salary
#         })


#     if not results:
#         return {
#             "count": 1,
#             "results": [{
#                 "career_path": "General Career",
#                 "recommended_stream": "General",
#                 "recommendation_score": "60%",
#                 "confidence_label": "Exploration Needed",
#                 "confidence_message": "Explore more domains.",
#                 "confidence_advice": "Improve fundamentals.",
#                 "career_outcomes": ["Professional"],
#                 "roadmap": ["Build Basics", "Practice", "Internship"],
#                 "colleges": [],
#                 "backup_options": ["General Degree"],
#                 "entrance_exams": [],
#                 "salary": {"entry": "₹3 LPA", "mid": "₹6 LPA", "senior": "₹10 LPA"}
#             }]
#         }

#     results.sort(
#         key=lambda x: int(x["recommendation_score"].replace("%", "")),
#         reverse=True
#     )

#     results = deduplicate(results)

#     view_all = payload.get("view_all", False)

#     if view_all:
#         return {"count": len(results), "results": results}

#     return {"count": min(len(results), top_n), "results": results[:top_n]}



# from backend.data_loader import load_courses, load_colleges
# from backend.interest_mapper import map_interests
# import pandas as pd
# import random
# import re 

# # ================= LOAD METADATA ================= #

# metadata_df = pd.read_csv("backend/data/career_metadata.csv")
# metadata_df.fillna("", inplace=True)

# print("🔥 SMART METADATA RECOMMENDER LOADED")


# # ================= HELPERS ================= #

# def normalize_marks(marks):
#     try:
#         return float(marks)
#     except:
#         return 0


# def eligible(marks, stream):
#     if stream in ["mpc", "bipc", "pcmb"]:
#         return marks >= 55
#     if stream in ["cec", "mec", "hec"]:
#         return marks >= 45
#     return True


# # ================= FALLBACK MAPS ================= #

# SALARY_MAP = {
#     "computer": {"entry": "₹4 – 8 LPA", "mid": "₹10 – 20 LPA", "senior": "₹25+ LPA"},
#     "civil": {"entry": "₹3 – 6 LPA", "mid": "₹8 – 15 LPA", "senior": "₹18+ LPA"},
#     "mechanical": {"entry": "₹3 – 6 LPA", "mid": "₹7 – 14 LPA", "senior": "₹18+ LPA"},
#     "medical": {"entry": "₹6 – 12 LPA", "mid": "₹15 – 30 LPA", "senior": "₹40+ LPA"},
#     "law": {"entry": "₹4 – 7 LPA", "mid": "₹10 – 25 LPA", "senior": "₹35+ LPA"},
#     "business": {"entry": "₹3 – 6 LPA", "mid": "₹8 – 18 LPA", "senior": "₹25+ LPA"},
#     "design": {"entry": "₹3 – 6 LPA", "mid": "₹8 – 15 LPA", "senior": "₹20+ LPA"},
# }

# ROADMAP_MAP = {
#     "computer": [
#         "Learn Programming",
#         "Build Projects",
#         "Internship",
#         "Specialization"
#     ],
#     "law": [
#         "Clear Entrance Exam",
#         "Pursue LLB",
#         "Intern Under Senior Advocate",
#         "Choose Specialization"
#     ],
#     "business": [
#         "Learn Business Basics",
#         "Internship",
#         "Build Skills",
#         "MBA / Specialization"
#     ]
# }

# ENTRANCE_EXAMS_MAP = {
#     "mpc": ["JEE Main", "EAMCET"],
#     "bipc": ["NEET"],
#     "cec": ["CUET"],
#     "hec": ["CLAT"],
#     "law": ["CLAT", "AILET"],
#     "business": ["CUET", "IPMAT"]
# }


# # ================= CONFIDENCE ================= #

# def get_confidence(score):
#     if score >= 80:
#         return {
#             "label": "Strong Career Match",
#             "message": "You are highly suitable for this path.",
#             "advice": "Focus on specialization."
#         }
#     if score >= 65:
#         return {
#             "label": "Good Fit",
#             "message": "You have good potential.",
#             "advice": "Improve skills."
#         }
#     return {
#         "label": "Average Match",
#         "message": "Needs improvement.",
#         "advice": "Build fundamentals."
#     }


# # ================= BACKUP ================= #

# def get_backup_paths(stream):
#     if stream == "MPC":
#         return ["B.Sc", "BCA", "Diploma"]
#     if stream == "BIPC":
#         return ["B.Sc Biology", "Nursing"]
#     if stream == "CEC":
#         return ["B.Com", "BBA"]
#     return ["General Degree"]


# # ================= DEDUP ================= #

# def deduplicate(recs):
#     seen = set()
#     final = []
#     for r in recs:
#         if r["career_path"] not in seen:
#             seen.add(r["career_path"])
#             final.append(r)
#     return final


# # ================= SMART METADATA MATCH ================= #

# def get_metadata(course_name):
#     course_name = course_name.lower().strip()

#     # sort longest keyword first (VERY IMPORTANT)
#     rows = metadata_df.to_dict("records")
#     rows = sorted(rows, key=lambda x: len(str(x.get("keyword", ""))), reverse=True)

#     for row in rows:
#         keyword = str(row.get("keyword", "")).lower().strip()

#         if not keyword:
#             continue

#         # strict word boundary match
#         if keyword in course_name:
#             return {
#                 "salary": {
#                     "entry": row.get("entry_salary", ""),
#                     "mid": row.get("mid_salary", ""),
#                     "senior": row.get("senior_salary", "")
#                 },
#                 "roadmap": row.get("roadmap", "").split("|") if row.get("roadmap") else [],
#                 "entrance_exams": row.get("entrance_exams", "").split("|") if row.get("entrance_exams") else [],
#                 "backup_options": row.get("backup_options", "").split("|") if row.get("backup_options") else [],
#                 "career_outcomes": row.get("career_outcomes", "").split("|") if row.get("career_outcomes") else []
#             }

#     return None


# # ================= MAIN ================= #

# def recommend(payload: dict, user_profile: dict = None, db=None):

#     courses = load_courses()
#     colleges = load_colleges()

#     marks = normalize_marks(payload.get("marks", 0))
#     interest_data = map_interests(payload.get("interests", []))

#     user_domains = interest_data.get("domains", [])
#     user_streams = interest_data.get("streams", [])

#     interests = [i.lower() for i in payload.get("interests", [])]

#     location = payload.get("location", "").lower()
#     ambition = payload.get("ambition", "balanced")
#     budget = payload.get("budget")

#     stage = payload.get("stage", "").lower()
#     top_n = payload.get("top_n", 3)

#     results = []

#     DEGREE_WEIGHT = 30
#     DIPLOMA_WEIGHT = 15
#     ITI_WEIGHT = 5

#     for course in courses:

#         entry = course.get("entry_level", "").lower()
#         if stage and stage != entry:
#             continue

#         course_name = course.get("course_name", "").lower()
#         stream_list = course.get("stream", "").lower().split(",")
#         branch = course.get("category", "general").lower()

#         best_score = 0
#         best_stream = None

#         if "b.tech" in course_name or "engineering" in course_name:
#             base_weight = DEGREE_WEIGHT
#         elif "diploma" in course_name:
#             base_weight = DIPLOMA_WEIGHT
#         elif "iti" in course_name:
#             base_weight = ITI_WEIGHT
#         else:
#             base_weight = 10

#         for stream in stream_list:
#             stream = stream.strip()

#             if not eligible(marks, stream):
#                 continue

#             score = 0
#             score += (marks / 100) * 25
#             score += base_weight

#             if branch in user_domains:
#                 score += 30

#             if stream in user_streams:
#                 score += 20

#             for i in interests:
#                 if i in course_name:
#                     score += 8

#             if ambition == "ambitious":
#                 score += 10
#             elif ambition == "safe":
#                 score -= 5

#             score = int(min(max(score, 45), 95))

#             if score > best_score:
#                 best_score = score
#                 best_stream = stream

#         if not best_stream:
#             continue

#         matched_colleges = [
#             c for c in colleges
#             if best_stream in c.get("course_supported", "").lower()
#             and (not location or location in c.get("city", "").lower())
#             and (not budget or float(c.get("fees", 0)) <= float(budget))
#         ]

#         confidence = get_confidence(best_score)

#         # ===== SMART METADATA =====
#         metadata = get_metadata(course_name)

#         if metadata:
#             salary = metadata["salary"]

#             if not salary or not salary.get("entry"):
#                 salary = SALARY_MAP.get(branch, {
#                     "entry": "₹3 – 5 LPA",
#                     "mid": "₹6 – 12 LPA",
#                     "senior": "₹15+ LPA"
#                 })
#             roadmap = metadata["roadmap"] or ROADMAP_MAP.get(branch, [])
#             exams = metadata["entrance_exams"]

#             # fallback if metadata empty
#             if not exams:
#                 exams = []
#                 exams += ENTRANCE_EXAMS_MAP.get(best_stream.lower(), [])
#                 exams += ENTRANCE_EXAMS_MAP.get(branch, [])
#                 exams = list(set(exams))
                        
#             backup = metadata["backup_options"] or get_backup_paths(best_stream.upper())
#             career_outcomes = metadata["career_outcomes"] or [f"{branch.title()} Professional"]
#         else:
#             salary = SALARY_MAP.get(branch, {
#                 "entry": "₹3 – 5 LPA",
#                 "mid": "₹6 – 12 LPA",
#                 "senior": "₹15+ LPA"
#             })
#             roadmap = ROADMAP_MAP.get(branch, ["Build Basics", "Practice", "Internship"])
#             exams = ENTRANCE_EXAMS_MAP.get(branch, [])
#             backup = get_backup_paths(best_stream.upper())
#             career_outcomes = [f"{branch.title()} Professional"]

#         # slight randomization
#         best_score = min(95, max(45, best_score + random.randint(-3, 3)))

#         results.append({
#             "career_path": f"{course['course_name']} ({best_stream.upper()})",
#             "recommended_stream": best_stream.upper(),
#             "recommendation_score": f"{best_score}%",
#             "confidence_label": confidence["label"],
#             "confidence_message": confidence["message"],
#             "confidence_advice": confidence["advice"],
#             "career_outcomes": career_outcomes,
#             "roadmap": roadmap,
#             "colleges": matched_colleges,
#             "backup_options": backup,
#             "entrance_exams": exams,
#             "salary": salary
#         })

#     if not results:
#         return {
#             "count": 1,
#             "results": []
#         }

#     results.sort(
#         key=lambda x: int(x["recommendation_score"].replace("%", "")),
#         reverse=True
#     )

#     results = deduplicate(results)

#     view_all = payload.get("view_all", False)

#     if view_all:
#         return {"count": len(results), "results": results}

#     return {"count": min(len(results), top_n), "results": results[:top_n]}



# from backend.data_loader import load_courses, load_colleges
# from backend.interest_mapper import map_interests
# import pandas as pd
# import random
# import re

# # ================= LOAD METADATA ================= #

# metadata_df = pd.read_csv("backend/data/career_metadata.csv")
# metadata_df.fillna("", inplace=True)

# print("🔥 SMART METADATA RECOMMENDER LOADED")

# # ================= HELPERS ================= #

# def normalize_marks(marks):
#     try:
#         return float(marks)
#     except:
#         return 0


# def eligible(marks, stream):
#     if stream in ["mpc", "bipc", "pcmb"]:
#         return marks >= 55
#     if stream in ["cec", "mec", "hec"]:
#         return marks >= 45
#     return True


# # ================= FALLBACK MAPS ================= #

# SALARY_MAP = {
#     "computer": {"entry": "₹4 – 8 LPA", "mid": "₹10 – 20 LPA", "senior": "₹25+ LPA"},
#     "civil": {"entry": "₹3 – 6 LPA", "mid": "₹8 – 15 LPA", "senior": "₹18+ LPA"},
#     "mechanical": {"entry": "₹3 – 6 LPA", "mid": "₹7 – 14 LPA", "senior": "₹18+ LPA"},
#     "medical": {"entry": "₹6 – 12 LPA", "mid": "₹15 – 30 LPA", "senior": "₹40+ LPA"},
#     "law": {"entry": "₹4 – 7 LPA", "mid": "₹10 – 25 LPA", "senior": "₹35+ LPA"},
#     "business": {"entry": "₹3 – 6 LPA", "mid": "₹8 – 18 LPA", "senior": "₹25+ LPA"},
#     "design": {"entry": "₹3 – 6 LPA", "mid": "₹8 – 15 LPA", "senior": "₹20+ LPA"},
# }

# ROADMAP_MAP = {
#     "computer": ["Learn Programming", "Build Projects", "Internship", "Specialization"],
#     "law": ["Clear Entrance Exam", "Pursue LLB", "Intern Under Senior Advocate", "Choose Specialization"],
#     "business": ["Learn Business Basics", "Internship", "Build Skills", "MBA / Specialization"]
# }

# ENTRANCE_EXAMS_MAP = {
#     "mpc": ["JEE Main", "EAMCET"],
#     "bipc": ["NEET"],
#     "cec": ["CUET"],
#     "hec": ["CLAT"],
#     "law": ["CLAT", "AILET"],
#     "business": ["CUET", "IPMAT"]
# }

# # ================= CONFIDENCE ================= #

# def get_confidence(score):
#     if score >= 80:
#         return {"label": "Strong Career Match",
#                 "message": "You are highly suitable for this path.",
#                 "advice": "Focus on specialization."}
#     if score >= 65:
#         return {"label": "Good Fit",
#                 "message": "You have good potential.",
#                 "advice": "Improve skills."}
#     return {"label": "Average Match",
#             "message": "Needs improvement.",
#             "advice": "Build fundamentals."}


# # ================= BACKUP ================= #

# def get_backup_paths(stream):
#     if stream == "MPC":
#         return ["B.Sc", "BCA", "Diploma"]
#     if stream == "BIPC":
#         return ["B.Sc Biology", "Nursing"]
#     if stream == "CEC":
#         return ["B.Com", "BBA"]
#     return ["General Degree"]


# # ================= DEDUP ================= #

# def deduplicate(recs):
#     seen = set()
#     final = []
#     for r in recs:
#         if r["career_path"] not in seen:
#             seen.add(r["career_path"])
#             final.append(r)
#     return final


# # ================= SMART METADATA MATCH ================= #

# def get_metadata(course_name):
#     course_name = course_name.lower().strip()

#     rows = metadata_df.to_dict("records")
#     rows = sorted(rows, key=lambda x: len(str(x.get("keyword", ""))), reverse=True)

#     for row in rows:
#         keyword = str(row.get("keyword", "")).lower().strip()
#         if not keyword:
#             continue

#         if keyword in course_name:
#             return {
#                 "salary": {
#                     "entry": row.get("entry_salary", ""),
#                     "mid": row.get("mid_salary", ""),
#                     "senior": row.get("senior_salary", "")
#                 },
#                 "roadmap": row.get("roadmap", "").split("|") if row.get("roadmap") else [],
#                 "entrance_exams": row.get("entrance_exams", "").split("|") if row.get("entrance_exams") else [],
#                 "backup_options": row.get("backup_options", "").split("|") if row.get("backup_options") else [],
#                 "career_outcomes": row.get("career_outcomes", "").split("|") if row.get("career_outcomes") else []
#             }
#     return None


# # ================= MAIN ================= #

# def recommend(payload: dict, user_profile: dict = None, db=None):

#     courses = load_courses()
#     colleges = load_colleges()

#     marks = normalize_marks(payload.get("marks", 0))
#     interest_data = map_interests(payload.get("interests", []))

#     user_domains = interest_data.get("domains", [])
#     user_streams = interest_data.get("streams", [])

#     interests = [i.lower() for i in payload.get("interests", [])]

#     location = payload.get("location", "").lower()
#     ambition = payload.get("ambition", "balanced")
#     budget = payload.get("budget")

#     stage = payload.get("stage", "").lower()
#     top_n = payload.get("top_n", 3)

#     results = []

#     DEGREE_WEIGHT = 30
#     DIPLOMA_WEIGHT = 15
#     ITI_WEIGHT = 5

#     for course in courses:

#         entry = course.get("entry_level", "").lower()
#         if stage and stage != entry:
#             continue

#         course_name = course.get("course_name", "").lower()
#         stream_list = course.get("stream", "").lower().split(",")
#         branch = course.get("category", "general").lower()

#         best_score = 0
#         best_stream = None

#         if "b.tech" in course_name or "engineering" in course_name:
#             base_weight = DEGREE_WEIGHT
#         elif "diploma" in course_name:
#             base_weight = DIPLOMA_WEIGHT
#         elif "iti" in course_name:
#             base_weight = ITI_WEIGHT
#         else:
#             base_weight = 10

#         for stream in stream_list:
#             stream = stream.strip()
#             if not eligible(marks, stream):
#                 continue

#             score = 0
#             score += (marks / 100) * 25
#             score += base_weight

#             if branch in user_domains:
#                 score += 30
#             if stream in user_streams:
#                 score += 20

#             for i in interests:
#                 if i in course_name:
#                     score += 8

#             if ambition == "ambitious":
#                 score += 10
#             elif ambition == "safe":
#                 score -= 5

#             score = int(min(max(score, 45), 95))

#             if score > best_score:
#                 best_score = score
#                 best_stream = stream

#         if not best_stream:
#             continue

#         matched_colleges = [
#             c for c in colleges
#             if best_stream in c.get("course_supported", "").lower()
#             and (not location or location in c.get("city", "").lower())
#             and (not budget or float(c.get("fees", 0)) <= float(budget))
#         ]

#         confidence = get_confidence(best_score)

#         metadata = get_metadata(course_name)

#         if metadata:
#             salary = metadata["salary"]
#             if not salary or not salary.get("entry"):
#                 salary = SALARY_MAP.get(branch, {"entry":"₹3 – 5 LPA","mid":"₹6 – 12 LPA","senior":"₹15+ LPA"})

#             roadmap = metadata["roadmap"] or ROADMAP_MAP.get(branch, [])
#             exams = metadata["entrance_exams"]

#             if not exams:
#                 exams = []
#                 exams += ENTRANCE_EXAMS_MAP.get(best_stream.lower(), [])
#                 exams += ENTRANCE_EXAMS_MAP.get(branch, [])
#                 exams = list(set(exams))

#             backup = metadata["backup_options"] or get_backup_paths(best_stream.upper())
#             career_outcomes = metadata["career_outcomes"] or [f"{branch.title()} Professional"]

#         else:
#             salary = SALARY_MAP.get(branch, {"entry":"₹3 – 5 LPA","mid":"₹6 – 12 LPA","senior":"₹15+ LPA"})
#             roadmap = ROADMAP_MAP.get(branch, ["Build Basics","Practice","Internship"])

#             exams = []
#             exams += ENTRANCE_EXAMS_MAP.get(best_stream.lower(), [])
#             exams += ENTRANCE_EXAMS_MAP.get(branch, [])
#             exams = list(set(exams))

#             backup = get_backup_paths(best_stream.upper())
#             career_outcomes = [f"{branch.title()} Professional"]

#         best_score = min(95, max(45, best_score + random.randint(-3, 3)))

#         results.append({
#             "career_path": f"{course['course_name']} ({best_stream.upper()})",
#             "recommended_stream": best_stream.upper(),
#             "recommendation_score": f"{best_score}%",
#             "confidence_label": confidence["label"],
#             "confidence_message": confidence["message"],
#             "confidence_advice": confidence["advice"],
#             "career_outcomes": career_outcomes,
#             "roadmap": roadmap,
#             "colleges": matched_colleges,
#             "backup_options": backup,
#             "entrance_exams": exams,
#             "salary": salary
#         })

#     if not results:
#         return {"count": 1, "results": []}

#     results.sort(key=lambda x: int(x["recommendation_score"].replace("%","")), reverse=True)
#     results = deduplicate(results)

#     if payload.get("view_all", False):
#         return {"count": len(results), "results": results}

#     return {"count": min(len(results), top_n), "results": results[:top_n]}



from backend.data_loader import load_courses, load_colleges
from backend.interest_mapper import map_interests
import pandas as pd
import random
import re

# ================= LOAD METADATA ================= #

metadata_df = pd.read_csv("backend/data/career_metadata.csv")
metadata_df.fillna("", inplace=True)

print("🔥 SMART METADATA RECOMMENDER LOADED")

# ================= HELPERS ================= #

def normalize_marks(marks):
    try:
        return float(marks)
    except:
        return 0


def eligible(marks, stream):
    if stream in ["mpc", "bipc", "pcmb"]:
        return marks >= 55
    if stream in ["cec", "mec", "hec"]:
        return marks >= 45
    return True


# ================= FALLBACK MAPS ================= #

SALARY_MAP = {
    "computer": {"entry": "₹4 – 8 LPA", "mid": "₹10 – 20 LPA", "senior": "₹25+ LPA"},
    "civil": {"entry": "₹3 – 6 LPA", "mid": "₹8 – 15 LPA", "senior": "₹18+ LPA"},
    "mechanical": {"entry": "₹3 – 6 LPA", "mid": "₹7 – 14 LPA", "senior": "₹18+ LPA"},
    "medical": {"entry": "₹6 – 12 LPA", "mid": "₹15 – 30 LPA", "senior": "₹40+ LPA"},
    "law": {"entry": "₹4 – 7 LPA", "mid": "₹10 – 25 LPA", "senior": "₹35+ LPA"},
    "business": {"entry": "₹3 – 6 LPA", "mid": "₹8 – 18 LPA", "senior": "₹25+ LPA"},
    "design": {"entry": "₹3 – 6 LPA", "mid": "₹8 – 15 LPA", "senior": "₹20+ LPA"},
}

ROADMAP_MAP = {
    "computer": ["Learn Programming", "Build Projects", "Internship", "Specialization"],
    "law": ["Clear Entrance Exam", "Pursue LLB", "Intern Under Senior Advocate", "Choose Specialization"],
    "business": ["Learn Business Basics", "Internship", "Build Skills", "MBA / Specialization"]
}

ENTRANCE_EXAMS_MAP = {
    "mpc": ["JEE Main", "EAMCET"],
    "bipc": ["NEET"],
    "cec": ["CUET"],
    "hec": ["CLAT"],
    "law": ["CLAT", "AILET"],
    "business": ["CUET", "IPMAT"]
}

# ================= CONFIDENCE ================= #

def get_confidence(score):
    if score >= 80:
        return {
            "label": "Strong Career Match",
            "message": "You are highly suitable for this path.",
            "advice": "Focus on specialization."
        }
    if score >= 65:
        return {
            "label": "Good Fit",
            "message": "You have good potential.",
            "advice": "Improve skills."
        }
    return {
        "label": "Average Match",
        "message": "Needs improvement.",
        "advice": "Build fundamentals."
    }


# ================= BACKUP ================= #

def get_backup_paths(stream):
    if stream == "MPC":
        return ["B.Sc", "BCA", "Diploma"]
    if stream == "BIPC":
        return ["B.Sc Biology", "Nursing"]
    if stream == "CEC":
        return ["B.Com", "BBA"]
    return ["General Degree"]


# ================= DEDUP ================= #

def deduplicate(recs):
    seen = set()
    final = []
    for r in recs:
        if r["career_path"] not in seen:
            seen.add(r["career_path"])
            final.append(r)
    return final


# ================= SMART METADATA MATCH ================= #

def get_metadata(course_name):
    course_name = course_name.lower().strip()

    rows = metadata_df.to_dict("records")
    rows = sorted(rows, key=lambda x: len(str(x.get("keyword", ""))), reverse=True)

    for row in rows:
        keyword = str(row.get("keyword", "")).lower().strip()
        if not keyword:
            continue

        if keyword in course_name:
            return {
                "salary": {
                    "entry": row.get("entry_salary", ""),
                    "mid": row.get("mid_salary", ""),
                    "senior": row.get("senior_salary", "")
                },
                "roadmap": row.get("roadmap", "").split("|") if row.get("roadmap") else [],
                "entrance_exams": row.get("entrance_exams", "").split("|") if row.get("entrance_exams") else [],
                "backup_options": row.get("backup_options", "").split("|") if row.get("backup_options") else [],
                "career_outcomes": row.get("career_outcomes", "").split("|") if row.get("career_outcomes") else []
            }

    return None

def safe_float(val):
    try:
        return float(str(val).replace("₹", "").replace(",", ""))
    except:
        return 999999

# ================= MAIN ================= #

def recommend(payload: dict, user_profile: dict = None, db=None):
    ml_domain = ""
    if user_profile:
        ml_domain = user_profile.get("predicted_domain", "").lower()

    courses = load_courses()
    colleges = load_colleges()

    marks = normalize_marks(payload.get("marks", 0))
    interest_data = map_interests(payload.get("interests", []))

    user_domains = interest_data.get("domains", [])
    user_streams = interest_data.get("streams", [])

    interests = [i.lower() for i in payload.get("interests", [])]

    location = payload.get("location", "").lower()
    ambition = payload.get("ambition", "balanced")
    budget = payload.get("budget")

    stage = payload.get("stage", "").lower()
    top_n = payload.get("top_n", 3)

    results = []

    DEGREE_WEIGHT = 30
    DIPLOMA_WEIGHT = 15
    ITI_WEIGHT = 5

    for course in courses:

        entry = course.get("entry_level", "").lower()
        if stage and stage != entry:
            continue

        course_name = course.get("course_name", "").lower()
        stream_list = course.get("stream", "").lower().split(",")
        branch = course.get("category", "general").lower()

        best_score = 0
        best_stream = None

        if "b.tech" in course_name or "engineering" in course_name:
            base_weight = DEGREE_WEIGHT
        elif "diploma" in course_name:
            base_weight = DIPLOMA_WEIGHT
        elif "iti" in course_name:
            base_weight = ITI_WEIGHT
        else:
            base_weight = 10

        for stream in stream_list:
            stream = stream.strip()

            if not eligible(marks, stream):
                continue

            score = 0
            score += (marks / 100) * 25
            score += base_weight

            if branch in user_domains:
                score += 30
            if ml_domain and ml_domain in branch:
                score += 15

            if stream in user_streams:
                score += 20

            for i in interests:
                if i in course_name:
                    score += 8

            if ambition == "ambitious":
                score += 10
            elif ambition == "safe":
                score -= 5

            score = int(min(max(score, 45), 95))

            if score > best_score:
                best_score = score
                best_stream = stream

        if not best_stream:
            continue

        matched_colleges = [
            c for c in colleges
            if best_stream in c.get("course_supported", "").lower()
            and (not location or location in c.get("city", "").lower())
            and (not budget or safe_float(c.get("fees", 0)) <= float(budget))
        ]

        # confidence = get_confidence(best_score)

        metadata = get_metadata(course_name)

        if metadata:
            salary = metadata["salary"]

            if not salary or not salary.get("entry"):
                salary = SALARY_MAP.get(branch, {
                    "entry": "₹3 – 5 LPA",
                    "mid": "₹6 – 12 LPA",
                    "senior": "₹15+ LPA"
                })

            roadmap = metadata["roadmap"] or ROADMAP_MAP.get(branch, [])
            exams = metadata["entrance_exams"]

            if not exams:
                exams = []
                exams += ENTRANCE_EXAMS_MAP.get(best_stream.lower(), [])
                exams += ENTRANCE_EXAMS_MAP.get(branch, [])
                exams = list(dict.fromkeys(exams))

            backup = metadata["backup_options"] or get_backup_paths(best_stream.upper())
            career_outcomes = metadata["career_outcomes"] or [f"{branch.title()} Professional"]

        else:
            salary = SALARY_MAP.get(branch, {
                "entry": "₹3 – 5 LPA",
                "mid": "₹6 – 12 LPA",
                "senior": "₹15+ LPA"
            })

            roadmap = ROADMAP_MAP.get(branch, ["Build Basics", "Practice", "Internship"])

            exams = []
            exams += ENTRANCE_EXAMS_MAP.get(best_stream.lower(), [])
            exams += ENTRANCE_EXAMS_MAP.get(branch, [])
            exams = list(dict.fromkeys(exams))

            backup = get_backup_paths(best_stream.upper())
            career_outcomes = [f"{branch.title()} Professional"]

        # best_score = min(95, max(45, best_score + random.randint(-3, 3)))
        best_score = min(95, max(45, best_score))
        confidence = get_confidence(best_score)

        results.append({
            "career_path": f"{course['course_name']} ({best_stream.upper()})",
            "recommended_stream": best_stream.upper(),
            "recommendation_score": f"{best_score}%",
            "confidence_label": confidence["label"],
            "confidence_message": confidence["message"],
            "confidence_advice": confidence["advice"],
            "career_outcomes": career_outcomes,
            "roadmap": roadmap,
            "colleges": matched_colleges,
            "backup_options": backup,
            "entrance_exams": exams,
            "salary": salary
        })

    if not results:
        return {"count": 1, "results": []}

    results.sort(
        key=lambda x: int(x["recommendation_score"].replace("%", "")),
        reverse=True
    )

    results = deduplicate(results)

    if payload.get("view_all", False):
        return {"count": len(results), "results": results}

    return {"count": min(len(results), top_n), "results": results[:top_n]}
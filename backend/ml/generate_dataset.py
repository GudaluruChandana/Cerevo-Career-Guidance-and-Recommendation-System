# import pandas as pd
# import random

# data = []

# for _ in range(200):  # 200 per domain = 1000 total

#     # Data Science (High logical + technical + problem solving)
#     data.append([
#         random.randint(75, 95),   # aptitude
#         random.randint(85, 100),  # logical
#         random.randint(50, 70),   # creativity
#         random.randint(80, 95),   # technical
#         random.randint(60, 80),   # communication
#         random.randint(85, 100),  # problem solving
#         "Data Science"
#     ])

#     # Cybersecurity (Very high technical + problem solving)
#     data.append([
#         random.randint(70, 90),
#         random.randint(75, 90),
#         random.randint(40, 60),
#         random.randint(90, 100),
#         random.randint(50, 70),
#         random.randint(85, 100),
#         "Cybersecurity"
#     ])

#     # UI/UX (Very high creativity + communication)
#     data.append([
#         random.randint(60, 80),
#         random.randint(55, 70),
#         random.randint(90, 100),
#         random.randint(50, 65),
#         random.randint(85, 100),
#         random.randint(60, 75),
#         "UI/UX"
#     ])

#     # Full Stack (Balanced logical + technical)
#     data.append([
#         random.randint(70, 90),
#         random.randint(70, 85),
#         random.randint(55, 70),
#         random.randint(75, 90),
#         random.randint(60, 80),
#         random.randint(75, 90),
#         "Full Stack Development"
#     ])

#     # Management (High communication + moderate others)
#     data.append([
#         random.randint(60, 80),
#         random.randint(60, 75),
#         random.randint(60, 75),
#         random.randint(50, 65),
#         random.randint(90, 100),
#         random.randint(60, 75),
#         "Management"
#     ])

# columns = [
#     "aptitude_score",
#     "logical_score",
#     "creativity_score",
#     "technical_score",
#     "communication_score",
#     "problem_solving_score",
#     "domain"
# ]

# df = pd.DataFrame(data, columns=columns)
# df.to_csv("backend/data/training_data.csv", index=False)

# print("Upgraded dataset generated successfully with 1000 rows.")

import pandas as pd
import random

data = []

for _ in range(200):  # 1000 total rows

    # Data Science
    data.append([
        random.randint(72, 95),
        random.randint(82, 97),   # strong logical
        random.randint(50, 72),
        random.randint(80, 95),   # strong technical
        random.randint(60, 85),
        random.randint(82, 97),   # strong problem solving
        "Data Science"
    ])

    # Cybersecurity
    data.append([
        random.randint(68, 90),
        random.randint(78, 93),
        random.randint(45, 65),
        random.randint(85, 100),  # very strong technical
        random.randint(55, 75),
        random.randint(85, 100),
        "Cybersecurity"
    ])

    # UI/UX
    data.append([
        random.randint(60, 85),
        random.randint(55, 75),
        random.randint(88, 100),  # very strong creativity
        random.randint(50, 72),
        random.randint(85, 100),  # strong communication
        random.randint(60, 78),
        "UI/UX"
    ])

    # Full Stack
    data.append([
        random.randint(70, 92),
        random.randint(72, 88),
        random.randint(55, 75),
        random.randint(78, 93),
        random.randint(60, 82),
        random.randint(75, 92),
        "Full Stack Development"
    ])

    # Management
    data.append([
        random.randint(60, 85),
        random.randint(60, 78),
        random.randint(60, 80),
        random.randint(50, 72),
        random.randint(88, 100),  # strong communication
        random.randint(60, 78),
        "Management"
    ])

columns = [
    "aptitude_score",
    "logical_score",
    "creativity_score",
    "technical_score",
    "communication_score",
    "problem_solving_score",
    "domain"
]

df = pd.DataFrame(data, columns=columns)
df.to_csv("backend/data/training_data.csv", index=False)

print("Optimally balanced dataset generated.")

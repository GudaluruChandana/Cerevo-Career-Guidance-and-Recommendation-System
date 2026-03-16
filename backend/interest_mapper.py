INTEREST_DOMAIN_MAP = {

    # Technology
    "ai": "computer",
    "artificial intelligence": "computer",
    "machine learning": "computer",
    "data science": "computer",
    "coding": "computer",
    "programming": "computer",
    "software": "computer",
    "web development": "computer",
    "app development": "computer",
    "cloud": "computer",
    "blockchain": "computer",
    "cyber": "computer",
    "cyber security": "computer",
    "game": "computer",
    "gaming": "computer",
        # School Subjects & Common Terms
    "computer": "computer",
    "computers": "computer",
    "technology": "computer",
    "tech": "computer",

    "mathematics": "computer",
    "math": "computer",
    "maths": "computer",
    "physics": "computer",

    "problem solving": "computer",
    "analysis": "computer",
    "logical": "computer",

    # Engineering
    "robotics": "robotics",
    "automation": "robotics",
    "mechanical": "mechanical",
    "mechanical design": "mechanical",
    "electrical": "electrical",
    "electronics": "electrical",
    "civil": "civil",
    "architecture": "civil",

    # Science & Research
    "physics": "research",
    "chemistry": "research",
    "space": "aerospace",
    "astronomy": "aerospace",
    "research": "research",
    "scientist": "research",

    # Medical
    "biology": "medical",
    "medicine": "medical",
    "doctor": "medical",
    "pharmacy": "medical",
    "biotechnology": "medical",
    "health": "medical",

    # Commerce
    "business": "commerce",
    "management": "commerce",
    "finance": "commerce",
    "economics": "commerce",
    "stock": "commerce",
    "stock market": "commerce",
    "banking": "commerce",
    "accounting": "commerce",
    "chartered accountant": "commerce",

    # Law & Government
    "law": "law",
    "lawyer": "law",
    "journalism": "law",
    "media": "law",
    "politics": "civil_services",
    "government": "civil_services",
    "civil services": "civil_services",
    "ias": "civil_services",
    "ips": "civil_services",
    "upsc": "civil_services",

    # Design & Creative
    "design": "design",
    "ui": "design",
    "ux": "design",
    "fashion": "design",
    "animation": "design",
    "graphics": "design",
    "film": "design",
    "cinema": "design"

}


DOMAIN_STREAM_MAP = {
    "computer": "mpc",
    "robotics": "mpc",
    "mechanical": "mpc",
    "electrical": "mpc",
    "civil": "mpc",
    "research": "mpc",
    "aerospace": "mpc",

    "medical": "bipc",

    "commerce": "cec",

    "law": "hec",
    "civil_services": "hec",
    "design": "hec"
}


def map_interests(interests):
    detected_domains = set()
    detected_streams = set()

    for interest in interests:
        interest = interest.lower().strip()

        for keyword, domain in INTEREST_DOMAIN_MAP.items():
            if keyword in interest:
                detected_domains.add(domain)
                detected_streams.add(DOMAIN_STREAM_MAP.get(domain))

    return {
        "domains": list(detected_domains),
        "streams": list(detected_streams)
    }

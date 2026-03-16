
import pandas as pd
from pathlib import Path



DATA_DIR = Path(__file__).parent / "data"



def load_courses():
    df = pd.read_csv(DATA_DIR / "courses.csv", encoding="utf-8-sig")

    # convert NaN to empty string
    df = df.fillna("")

    # convert tags string to list
    if "tags" in df.columns:
        df["tags"] = df["tags"].apply(
            lambda x: [t.strip().lower() for t in x.split(";")] if isinstance(x, str) else []
        )

    return df.to_dict(orient="records")


def load_colleges():
    df = pd.read_csv(DATA_DIR / "colleges.csv", encoding="utf-8-sig")

    # convert NaN to empty string
    df = df.fillna("")

    return df.to_dict(orient="records")

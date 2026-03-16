import pandas as pd
import joblib
import numpy as np
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# ------------------------------
# 1. Load Dataset
# ------------------------------
data = pd.read_csv("backend/data/training_data.csv")

# ------------------------------
# 2. Features & Label
# ------------------------------
X = data.drop("domain", axis=1)
y = data["domain"]

# ------------------------------
# 3. Train Test Split
# ------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# ------------------------------
# 4. Hyperparameter Tuning
# ------------------------------
param_grid = {
    "n_estimators": [600, 800, 1200],
    "max_depth": [12, 16, 20],
    "min_samples_split": [2, 4],
    "min_samples_leaf": [1, 2]
}

grid = GridSearchCV(
    RandomForestClassifier(
        class_weight="balanced",
        random_state=42
    ),
    param_grid,
    cv=5,
    scoring="accuracy",
    n_jobs=-1
)

print("Training model... please wait")
grid.fit(X_train, y_train)

model = grid.best_estimator_

print("\nBest Parameters Found:")
print(grid.best_params_)

# ------------------------------
# 5. Cross Validation Accuracy
# ------------------------------
cv_scores = cross_val_score(model, X, y, cv=5)

print("\nCross Validation Accuracy:",
      round(cv_scores.mean() * 100, 2), "%")

# ------------------------------
# 6. Test Accuracy
# ------------------------------
y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print("Model Accuracy:",
      round(accuracy * 100, 2), "%")

# ------------------------------
# 6A. MODEL COMPARISON (ADVANCED EVALUATION)
# ------------------------------
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC

models = {
    "Random Forest": model,
    "Logistic Regression": LogisticRegression(max_iter=5000),
    "SVM": SVC()
}

print("\n📊 MODEL COMPARISON (Accuracy):")

for name, m in models.items():
    m.fit(X_train, y_train)
    preds = m.predict(X_test)
    acc = accuracy_score(y_test, preds)
    print(f"{name}: {round(acc*100,2)}%")

# ------------------------------
# 6B. MODEL COMPARISON GRAPH
# ------------------------------
model_names = []
model_scores = []

for name, m in models.items():
    m.fit(X_train, y_train)
    preds = m.predict(X_test)
    acc = accuracy_score(y_test, preds)

    model_names.append(name)
    model_scores.append(acc * 100)

# plt.figure()
# plt.bar(model_names, model_scores)
# plt.title("Model Accuracy Comparison")
# plt.xlabel("Models")
# plt.ylabel("Accuracy (%)")

# for i, v in enumerate(model_scores):
#     plt.text(i, v + 0.5, f"{round(v,2)}%", ha='center')

# plt.show(block=False)

# ------------------------------
# 7. TOP-3 Accuracy (IMPORTANT)
# ------------------------------
probs = model.predict_proba(X_test)

top3_correct = 0
for i in range(len(y_test)):
    top3_indices = np.argsort(probs[i])[-3:]
    if y_test.iloc[i] in model.classes_[top3_indices]:
        top3_correct += 1

top3_accuracy = top3_correct / len(y_test)

print("\n🔥 TOP-3 ACCURACY (RECOMMENDER METRIC):",
      round(top3_accuracy * 100, 2), "%")

print("➡️ Correct domain appears within TOP 3 recommendations")

# ------------------------------
# 8. Classification Report
# ------------------------------
print("\nClassification Report:\n")
print(classification_report(y_test, y_pred))

# ------------------------------
# 9. Confusion Matrix
# ------------------------------
print("\nConfusion Matrix:\n")
print(confusion_matrix(y_test, y_pred))

# ------------------------------
# 10. Feature Importance
# ------------------------------
feature_importances = pd.Series(
    model.feature_importances_,
    index=X.columns
).sort_values(ascending=False)

print("\nFeature Importance:\n")
print(feature_importances)

# plt.figure()
# feature_importances.plot(kind="bar")
# plt.title("Feature Importance")
# plt.show()
# ------------------------------
# ⭐ PROFESSIONAL DASHBOARD (SINGLE WINDOW)
# ------------------------------
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# ---- LEFT: Model Comparison ----
axes[0].bar(model_names, model_scores)
axes[0].set_title("Model Accuracy Comparison")
axes[0].set_xlabel("Models")
axes[0].set_ylabel("Accuracy (%)")

for i, v in enumerate(model_scores):
    axes[0].text(i, v + 0.5, f"{round(v,2)}%", ha='center')

# ---- RIGHT: Feature Importance ----
feature_importances.plot(kind="bar", ax=axes[1])
axes[1].set_title("Feature Importance")
axes[1].set_xlabel("Features")
axes[1].set_ylabel("Importance Score")

plt.tight_layout()
plt.show()
# ------------------------------
# 11. Save Model
# ------------------------------
joblib.dump(model, "backend/ml/domain_model.pkl")

# ------------------------------
# 12. FINAL SUMMARY
# ------------------------------
print("\n==============================")
print("📊 FINAL MODEL EVALUATION")
print("==============================")
print("Accuracy:", round(accuracy * 100, 2), "%")
print("Top-3 Accuracy:", round(top3_accuracy * 100, 2), "%")
print("Cross Validation:", round(cv_scores.mean() * 100, 2), "%")
print("==============================")

print("\nModel saved successfully.")
from reportlab.lib.pagesizes import A4
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Image,
    ListFlowable, ListItem, Table, TableStyle
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.units import inch
import os


def generate_roadmap_pdf(data, filename):

    # Create document
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )

    styles = getSampleStyleSheet()
    elements = []

    # ---------------- STUDENT NAME ----------------
    student_name = data.get("student_name", "Student")

    # ---------------- CUSTOM STYLES ----------------
    title_style = ParagraphStyle(
        name="CerevoTitle",
        parent=styles["Title"],
        fontSize=28,
        leading=34,
        textColor=colors.HexColor("#4F46E5"),
        spaceAfter=14
    )

    subtitle_style = ParagraphStyle(
        name="CerevoSubtitle",
        parent=styles["Heading2"],
        fontSize=16,
        leading=22,
        textColor=colors.black,
        spaceAfter=12
    )

    section_style = ParagraphStyle(
        name="SectionHeader",
        parent=styles["Heading2"],
        fontSize=14,
        leading=20,
        textColor=colors.HexColor("#1E293B"),
        spaceBefore=12,
        spaceAfter=8
    )

    normal_style = ParagraphStyle(
        name="NormalText",
        parent=styles["Normal"],
        fontSize=11,
        leading=16
    )

    # ---------------- HEADER (TITLE + LOGO) ----------------

    logo_path = "backend/assets/cerevo_logo.png"

    if os.path.exists(logo_path):
        logo = Image(logo_path, width=1.8*inch, height=1.6*inch)
    else:
        logo = Paragraph("CEREVO", styles["Title"])

    header_table = Table(
        [
            [
                Paragraph("CEREVO AI Career Roadmap", title_style),
                logo
            ]
        ],
        colWidths=[350, 150]
    )

    header_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ALIGN', (1, 0), (1, 0), 'RIGHT'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
    ]))

    elements.append(header_table)
    elements.append(Spacer(1, 10))

    # ---------------- STUDENT INFO ----------------
    # elements.append(Paragraph(
    #     f"<b>Prepared for:</b> {student_name}",
    #     normal_style
    # ))

    elements.append(Paragraph(
        f"<b>Career Path:</b> {data['career_path']}",
        subtitle_style
    ))

    elements.append(Spacer(1, 20))

    # ---------------- SUMMARY TABLE ----------------
    summary_data = [
        ["Stream", data["recommended_stream"]],
        ["Career Fit Score", data["recommendation_score"]],
        ["Confidence Level", data["confidence_label"]],
    ]

    table = Table(summary_data, colWidths=[200, 200])
    table.setStyle(TableStyle([
        ('GRID', (0,0), (-1,-1), 1, colors.grey),
        ('BACKGROUND', (0,0), (-1,0), colors.whitesmoke),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
    ]))

    elements.append(table)
    elements.append(Spacer(1, 20))

    # ---------------- AI ASSESSMENT ----------------
    elements.append(Paragraph("AI Career Assessment", section_style))
    elements.append(Paragraph(data["confidence_message"], normal_style))
    elements.append(Paragraph(data["confidence_advice"], styles["Italic"]))
    elements.append(Spacer(1, 12))

    # ---------------- CAREER OUTCOMES ----------------
    elements.append(Paragraph("Career Opportunities", section_style))
    elements.append(ListFlowable(
        [ListItem(Paragraph(x, normal_style)) for x in data["career_outcomes"]],
        bulletType='bullet'
    ))
    elements.append(Spacer(1, 12))

    # ---------------- ROADMAP ----------------
    elements.append(Paragraph("Step-by-Step Career Roadmap", section_style))
    elements.append(ListFlowable(
        [ListItem(Paragraph(step, normal_style)) for step in data["roadmap"]],
        bulletType='1'
    ))
    elements.append(Spacer(1, 12))

    # ---------------- ENTRANCE EXAMS ----------------
    elements.append(Paragraph("Entrance Exams", section_style))
    elements.append(Paragraph(", ".join(data["entrance_exams"]), normal_style))
    elements.append(Spacer(1, 12))

    # ---------------- BACKUP OPTIONS ----------------
    elements.append(Paragraph("Backup Career Options", section_style))
    elements.append(Paragraph(", ".join(data["backup_options"]), normal_style))
    elements.append(Spacer(1, 12))

    # ---------------- COLLEGES ----------------
    elements.append(Paragraph("Top Recommended Colleges", section_style))

    college_names = [c["college_name"] for c in data.get("colleges", [])[:6]]

    if college_names:
        elements.append(Paragraph(", ".join(college_names), normal_style))
    else:
        elements.append(Paragraph("Top national institutions across India.", normal_style))

    elements.append(Spacer(1, 30))

    # ---------------- FOOTER ----------------
    footer = "Generated by CEREVO AI Career Engine — Your Future, Engineered."
    elements.append(Paragraph(footer, styles["Italic"]))

    # Build PDF
    doc.build(elements)

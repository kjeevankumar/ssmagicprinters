import json
import os

with open("image_analysis.json", "r") as f:
    data = json.load(f)

# Markdown report generator
report = "# Image Quality Assessment Report\n\n"
report += "## 1. Executive Summary\n"
report += f"Total Images Analyzed: {len(data)}\n\n"
report += "The current product image assets exhibit severe inconsistencies in dimensions, aspect ratios, and visual framing. This degrades the 'premium' aesthetic desired for the website.\n\n"

report += "## 2. Image Asset Details\n\n"
report += "| Filename | Resolution | Size (KB) | Aspect Ratio | Inferred Visual Quality | Detected Issues & Suggested Fixes |\n"
report += "|----------|------------|-----------|--------------|-------------------------|-----------------------------------|\n"

for img in data:
    width = img["width"]
    height = img["height"]
    ar = img["aspect_ratio"]
    size = img["size_kb"]
    
    # Infer quality
    quality = "Poor"
    if width >= 800 and height >= 800:
        quality = "Premium"
    elif width >= 480 and height >= 480:
        quality = "Medium"
        
    # Detect issues
    issues = []
    if width < 500:
        issues.append("Low-resolution (Blurry on modern screens)")
    if ar < 0.8:
        issues.append("Too tall/Wrong orientation (Different padding)")
    elif ar > 1.2:
        issues.append("Too wide/Cropped wrong (Different padding)")
    if size < 10:
        issues.append("Aggressively compressed (Artifacts/Low contrast)")
        
    if not issues:
        issues.append("Passable, but could improve")
        
    # Fixes
    fixes = "Rec: 1080x1080, AR 1:1, Uniform white bg"
    
    report += f"| `{img['filename'][:15]}...` | {img['resolution']} | {size} | {ar} | **{quality}** | **Issues:** {', '.join(issues)} <br> **Fix:** {fixes} |\n"

report += "\n## 3. Global Recommendations\n\n"
report += "### Final Recommended Uniform Aspect Ratio\n"
report += "- **1:1 (Square)**. This is the e-commerce standard (e.g., Shopify, Amazon). It ensures consistent grid alignment without awkward whitespace or aggressive cropping.\n"
report += "### Ideal Resolution for Product Images\n"
report += "- **1080 × 1080 pixels**. This is perfect for crisp quality on both desktop retina displays and mobile screens while allowing for hover-to-zoom capabilities.\n"
report += "### Format Optimization\n"
report += "- **Convert to WebP**. Currently, PNGs are being used which are heavy for photographs. WebP maintains transparency (if needed) but offers 25-35% smaller file sizes than PNG/JPEG at the same quality.\n"
report += "### Compression Strategy\n"
report += "- **Compress while retaining quality**. Use tools like TinyPNG or image CDNs to serve WebP at ~80-85% quality. This will keep file sizes under 150KB for a 1080x1080 image without visible loss of detail.\n"
report += "### Visual Consistency\n"
report += "- **Uniform White Background (or #F8F9FA)**: Remove diverse scene backgrounds to maintain a clean layout.\n"
report += "- **Consistent Padding**: Ensure the subject occupies exactly 80% of the canvas in every image to prevent size variation illusions in the grid.\n"

with open("C:/Users/Lenovo/.gemini/antigravity/brain/05eaa43f-3205-4449-8195-6fd19ca1e8f9/image_quality_report.md", "w", encoding='utf-8') as f:
    f.write(report)

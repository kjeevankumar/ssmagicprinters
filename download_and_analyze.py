import os
import requests
from PIL import Image
from io import BytesIO
import json

urls = [
    "https://ss-magic-printers.lovable.app/lovable-uploads/c775c055-f100-4e29-8f32-fc94cc0ed3bc.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/f2b1300d-47cc-426d-92d6-47a4e941e51e.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/207012aa-084b-4835-a06a-43be797ef704.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/59b021e5-3dda-46de-baff-e39c7ea7b0d7.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/7aa2cde1-3291-4ed8-9dc0-275dc85322dc.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/c34a987e-8202-4358-9791-8102d52fbacb.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/2e5168bd-1e20-4a34-816b-75ca9408444f.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/fc4e971d-81d9-440d-a7ca-97d0986657f4.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/77f12ddd-d081-4e83-adde-95dd18aac20c.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/81b9ed00-788f-486a-be19-19c1660866ba.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/ceb65b91-6656-440e-907b-796b1a0084c7.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/42cd9630-6a55-4855-a78b-63ade074c2c0.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/0d6b472c-79a9-4f81-9e01-0e82ac44ceaf.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/7fd1809d-d9ec-435c-9aa7-b7449ed22210.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/7829ab5a-7fe0-4e8c-8f5e-201423d4dd86.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/0bc966f0-58ff-4258-96ed-2f7a8cdad0d1.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/4a2b96c5-3fbe-4838-857f-a6337f11d05c.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/a4b86819-1295-46df-9186-1bec5bc3eb93.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/50885546-2065-4a32-be34-d9535f889c22.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/59df380f-0a13-4ca6-b05f-7edade5b40c8.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/d533c94b-567c-4d14-979f-4e94823f5c17.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/997b2817-5dda-496e-9140-e1e3629116b9.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/6ca030a3-b1d0-4150-b6fd-90e87d9efbc7.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/58adb7b3-955f-4fdc-8cc7-84a716088ee6.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/73bae00c-7311-4380-96af-818ff9764291.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/c7a1d37f-b651-4ae3-bc67-79dcd3624d5d.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/da6de490-1034-4a3c-a3d8-1a5c715614f2.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/620fa636-54be-4441-a23c-ceab2a01ba17.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/b521f8f1-3392-4c3d-b0f0-6b69c387fefa.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/ddbe4e44-7b82-45f6-adea-13a063cb5ef6.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/52c775b8-cf84-4c60-8967-9ea424146870.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/0d1fa078-d3c6-47f9-b30f-17a18bbd0714.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/107b478d-c33d-4d30-ada0-a3f70d455eed.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/14b8608c-7b5e-4bcd-b715-dd17c30a5e42.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/899d8c5e-29e7-4b07-868e-557d28f6e74a.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/66438bfd-1fd8-4da1-a956-1134e0dc5e0e.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/2e020de4-97d5-4715-9900-e5ca3cc83274.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/828dbb32-0557-4ba6-bd26-ca52b924f6f9.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/2a0a8f84-581b-499b-8fa8-c0b383ad60d6.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/67540ef8-3b60-45c4-ae70-6dd68214aa03.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/0744f9d5-bca2-4810-8f2b-de9e50fce3ba.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/618fe536-61dc-4dfe-b94b-d1a04ef039ec.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/121fa13b-c614-4361-b0f0-0c1ea16b3d76.png",
    "https://ss-magic-printers.lovable.app/lovable-uploads/806b5e53-a19e-4e09-81ba-6df0d2aa6d6b.png"
]

images_dir = "downloaded_images"
os.makedirs(images_dir, exist_ok=True)

results = []

print(f"Downloading {len(urls)} images...")
for i, url in enumerate(urls):
    try:
        filename = url.split('/')[-1]
        filepath = os.path.join(images_dir, filename)
        
        # Only download if we don't have it
        if not os.path.exists(filepath):
            resp = requests.get(url, timeout=10)
            if resp.status_code == 200:
                with open(filepath, 'wb') as f:
                    f.write(resp.content)
            else:
                print(f"Failed to download {url}: {resp.status_code}")
                continue
        
        # Analyze
        file_size_kb = os.path.getsize(filepath) / 1024
        with Image.open(filepath) as img:
            width, height = img.size
            if height > 0:
                aspect_ratio = width / height
            else:
                aspect_ratio = 0
            
            results.append({
                "filename": filename,
                "url": url,
                "width": width,
                "height": height,
                "resolution": f"{width}x{height}",
                "size_kb": round(file_size_kb, 2),
                "aspect_ratio": round(aspect_ratio, 2)
            })
    except Exception as e:
        print(f"Error processing {url}: {e}")

with open("image_analysis.json", "w") as f:
    json.dump(results, f, indent=2)

print(f"Finished. Results saved to image_analysis.json")

# generate a simple html to view them
html_content = "<html><body><h1>Image Collage</h1><div style='display:flex; flex-wrap:wrap; gap:10px;'>"
for res in results:
    html_content += f"<div><img src='{res['filename']}' style='max-width:200px; max-height:200px; border:1px solid #ccc;'/><br><small>{res['filename']}<br>{res['resolution']} | {res['size_kb']}KB</small></div>"
html_content += "</div></body></html>"

with open(os.path.join(images_dir, "collage.html"), "w") as f:
    f.write(html_content)

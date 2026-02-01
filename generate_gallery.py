import os
import json

def generate_gallery_images():
    base_path = "images"
    categories = {
        "agriculture branding": "agriculture",
        "water mission": "water", 
        "women": "women",
        "woman day": "women",
        "cultural fest": "cultural",
        "science fair": "education",
        "poster painting competition": "education", 
        "world environment Day": "environment",
        "dry ration and hygiene kit": "relief",
        "mission": "health",
        "ngo photos all": "all"
    }
    
    gallery_items = []
    
    for folder, category in categories.items():
        folder_path = os.path.join(base_path, folder)
        if os.path.exists(folder_path):
            for filename in os.listdir(folder_path):
                if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
                    gallery_items.append({
                        'path': f"images/{folder}/{filename}",
                        'category': category,
                        'title': folder.replace('_', ' ').title(),
                        'filename': filename
                    })
    
    # Generate HTML
    html_items = []
    for item in gallery_items:
        html_items.append(f'''
                <div class="gallery-item" data-category="{item['category']}">
                    <img src="{item['path']}" alt="{item['title']}" loading="lazy">
                    <div class="gallery-overlay">
                        <div class="gallery-title">{item['title']}</div>
                        <div class="gallery-category">{item['category'].title()}</div>
                    </div>
                </div>''')
    
    return '\n'.join(html_items)

if __name__ == "__main__":
    print(generate_gallery_images())
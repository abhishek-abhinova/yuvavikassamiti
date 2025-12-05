import os
import pdfplumber
from docx import Document
from docx.shared import Inches
import base64
from PIL import Image
import io
import json

def extract_pdf_content(pdf_path):
    """Extract text from PDF using pdfplumber"""
    content = {
        'text': '',
        'images': []
    }
    
    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages):
            # Extract text
            text = page.extract_text()
            if text:
                content['text'] += f"\n--- Page {page_num + 1} ---\n{text}\n"
    
    return content

def extract_docx_content(docx_path):
    """Extract text and images from DOCX"""
    doc = Document(docx_path)
    content = {
        'text': '',
        'images': []
    }
    
    # Extract text
    for paragraph in doc.paragraphs:
        content['text'] += paragraph.text + '\n'
    
    # Extract images
    for rel in doc.part.rels.values():
        if "image" in rel.target_ref:
            img_data = rel.target_part.blob
            img_name = f"docx_{rel.target_ref.split('/')[-1]}"
            
            # Save image
            with open(f"images/{img_name}", "wb") as f:
                f.write(img_data)
            
            content['images'].append({
                'filename': img_name,
                'size': len(img_data)
            })
    
    return content

def main():
    # Create images directory if it doesn't exist
    os.makedirs('images', exist_ok=True)
    
    extracted_content = {}
    
    # Extract from PDF
    if os.path.exists('YUVA Profile 2025.pdf'):
        print("Extracting content from PDF...")
        extracted_content['pdf'] = extract_pdf_content('YUVA Profile 2025.pdf')
        print(f"PDF: Extracted {len(extracted_content['pdf']['images'])} images")
    
    # Extract from DOCX
    if os.path.exists('YUVA Profile 2025.docx'):
        print("Extracting content from DOCX...")
        extracted_content['docx'] = extract_docx_content('YUVA Profile 2025.docx')
        print(f"DOCX: Extracted {len(extracted_content['docx']['images'])} images")
    
    # Save extracted content to JSON
    with open('extracted_content.json', 'w', encoding='utf-8') as f:
        json.dump(extracted_content, f, indent=2, ensure_ascii=False)
    
    print("Content extraction completed!")
    print("Check 'extracted_content.json' for text content")
    print("Check 'images/' folder for extracted images")

if __name__ == "__main__":
    main()
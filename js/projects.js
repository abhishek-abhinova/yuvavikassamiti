// Project Modal functionality with detailed project data

const projectsData = {
    'jal-jeevan': {
        title: 'Jal Jeevan Mission (ISA)',
        image: 'https://via.placeholder.com/600x300/1a4b84/ffffff?text=Jal+Jeevan+Mission',
        description: 'The Jal Jeevan Mission is a flagship program aimed at providing safe and adequate drinking water through individual household tap connections by 2024. Our organization works as an Implementation Support Agency (ISA) to ensure effective execution of this vital mission in rural areas.',
        objectives: [
            'Provide functional household tap connections to every rural household',
            'Ensure water quality monitoring and testing at regular intervals',
            'Build community capacity for sustainable water management',
            'Promote water conservation and rainwater harvesting practices',
            'Establish Village Water and Sanitation Committees (VWSCs)',
            'Create awareness about water-borne diseases and hygiene practices'
        ],
        impact: 'Over 10,000 households provided with clean water access across 50 villages',
        timeline: '2019 - Ongoing',
        beneficiaries: '50,000+ individuals',
        location: 'Rural districts of Uttar Pradesh'
    },
    'bal-gurukul': {
        title: 'Bal Gurukul',
        image: 'https://via.placeholder.com/600x300/27ae60/ffffff?text=Bal+Gurukul',
        description: 'Bal Gurukul is our comprehensive education program designed to provide quality primary education to underprivileged children. The program focuses on holistic development including academic excellence, life skills, moral values, and physical fitness.',
        objectives: [
            'Provide quality primary education following NCERT curriculum',
            'Develop life skills and moral values in children',
            'Ensure nutritional support through mid-day meal programs',
            'Create child-friendly and inclusive learning environments',
            'Train teachers in modern pedagogical methods',
            'Engage parents and community in children\'s education'
        ],
        impact: '500+ children receiving quality education annually with 95% retention rate',
        timeline: '2015 - Ongoing',
        beneficiaries: '2,000+ children educated',
        location: '15 centers across Uttar Pradesh'
    },
    's3-swabhiman': {
        title: 'S3 Swabhiman Project',
        image: 'https://via.placeholder.com/600x300/f39c12/ffffff?text=S3+Swabhiman',
        description: 'The S3 Swabhiman Project is a women empowerment initiative that focuses on skill development, entrepreneurship, and financial independence. The program provides comprehensive training in various trades and supports women in establishing their own enterprises.',
        objectives: [
            'Provide skill development training in multiple trades',
            'Support women entrepreneurs with business development',
            'Facilitate access to credit and financial services',
            'Create market linkages for women-produced goods',
            'Build leadership capacity among women',
            'Promote gender equality and women\'s rights'
        ],
        impact: '1,200+ women trained and 300+ micro-enterprises established',
        timeline: '2018 - Ongoing',
        beneficiaries: '1,500+ women and their families',
        location: 'Rural and semi-urban areas of UP'
    },
    'nanhi-pahal': {
        title: 'Nanhi Pahal',
        image: 'https://via.placeholder.com/600x300/e74c3c/ffffff?text=Nanhi+Pahal',
        description: 'Nanhi Pahal is our early childhood development program that focuses on the critical first 1000 days of a child\'s life. The program addresses nutrition, health, and early learning needs of children aged 0-6 years.',
        objectives: [
            'Improve nutritional status of children under 6 years',
            'Provide early childhood education and stimulation',
            'Strengthen immunization and health check-ups',
            'Train mothers on child care and feeding practices',
            'Establish Anganwadi centers and strengthen existing ones',
            'Create awareness about importance of early childhood development'
        ],
        impact: '800+ children benefited with improved nutritional status',
        timeline: '2020 - Ongoing',
        beneficiaries: '1,000+ children and mothers',
        location: 'Remote villages of Uttar Pradesh'
    },
    'sui-dhaga': {
        title: 'Sui Dhaga Ji',
        image: 'https://via.placeholder.com/600x300/9b59b6/ffffff?text=Sui+Dhaga+Ji',
        description: 'Sui Dhaga Ji is a traditional handicrafts and textile program that preserves local art forms while providing livelihood opportunities to rural women. The program focuses on training women in traditional embroidery, weaving, and textile crafts.',
        objectives: [
            'Preserve traditional handicrafts and textile arts',
            'Provide skill training in embroidery and weaving',
            'Create sustainable livelihood opportunities for women',
            'Develop market linkages for handicraft products',
            'Form self-help groups and cooperatives',
            'Promote cultural heritage and traditional knowledge'
        ],
        impact: '600+ women trained in traditional crafts with regular income generation',
        timeline: '2017 - Ongoing',
        beneficiaries: '800+ women artisans',
        location: 'Traditional craft clusters in UP'
    },
    'saksham-financial': {
        title: 'Saksham Financial Literacy',
        image: 'https://via.placeholder.com/600x300/34495e/ffffff?text=Saksham+Financial',
        description: 'Saksham Financial Literacy program aims to educate rural communities about financial services, digital banking, and money management. The program promotes financial inclusion and helps people make informed financial decisions.',
        objectives: [
            'Provide financial literacy education to rural communities',
            'Promote digital banking and cashless transactions',
            'Educate about various government financial schemes',
            'Train on budgeting and money management skills',
            'Facilitate bank account opening and KYC processes',
            'Create awareness about insurance and pension schemes'
        ],
        impact: '5,000+ individuals trained in financial literacy and digital banking',
        timeline: '2019 - Ongoing',
        beneficiaries: '7,000+ community members',
        location: 'Rural areas across multiple districts'
    },
    'science-program': {
        title: 'Popularisation of Science',
        image: 'https://via.placeholder.com/600x300/16a085/ffffff?text=Science+Program',
        description: 'Our Science Popularisation program aims to create scientific awareness and promote scientific thinking among rural communities, especially students and youth. The program includes science exhibitions, workshops, and practical demonstrations.',
        objectives: [
            'Create scientific awareness in rural communities',
            'Organize science exhibitions and fairs',
            'Conduct hands-on science workshops for students',
            'Promote scientific thinking and rational approach',
            'Train teachers in innovative science teaching methods',
            'Establish science clubs in schools and communities'
        ],
        impact: '200+ science programs conducted reaching 15,000+ participants',
        timeline: '2016 - Ongoing',
        beneficiaries: '20,000+ students and community members',
        location: 'Schools and communities across UP'
    },
    'nhdp-handicrafts': {
        title: 'NHDP Handicrafts',
        image: 'https://via.placeholder.com/600x300/d35400/ffffff?text=NHDP+Handicrafts',
        description: 'Under the National Handicrafts Development Program (NHDP), we work to preserve and promote traditional handicrafts while providing sustainable livelihood to artisans. The program focuses on skill upgradation and market development.',
        objectives: [
            'Preserve traditional handicraft techniques and designs',
            'Upgrade skills of traditional artisans',
            'Develop new product designs for modern markets',
            'Create direct market linkages for artisan products',
            'Provide design and technical support to artisans',
            'Establish handicraft production centers'
        ],
        impact: '400+ artisans trained with improved income and market access',
        timeline: '2018 - Ongoing',
        beneficiaries: '500+ artisan families',
        location: 'Traditional handicraft regions of UP'
    },
    'tb-awareness': {
        title: 'TB Awareness (Akshaya Project)',
        image: 'https://via.placeholder.com/600x300/c0392b/ffffff?text=TB+Awareness',
        description: 'The Akshaya Project focuses on tuberculosis prevention, awareness, and treatment support. Our comprehensive approach includes community education, case finding, treatment adherence support, and stigma reduction.',
        objectives: [
            'Create awareness about TB prevention and symptoms',
            'Support active case finding in communities',
            'Provide treatment adherence support to TB patients',
            'Reduce stigma associated with tuberculosis',
            'Train community health workers on TB management',
            'Strengthen referral systems with healthcare facilities'
        ],
        impact: '95% treatment success rate among supported TB patients',
        timeline: '2020 - Ongoing',
        beneficiaries: '1,000+ TB patients and their families',
        location: 'High TB burden districts of UP'
    }
};

function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    
    const project = projectsData[projectId];
    if (project && modal && modalContent) {
        modalContent.innerHTML = `
            <div class="modal-header">
                <h3>${project.title}</h3>
                <button class="modal-close" onclick="closeProjectModal()">&times;</button>
            </div>
            <div class="modal-body">
                <img src="${project.image}" alt="${project.title}" class="modal-image">
                <p class="modal-description">${project.description}</p>
                
                <div class="project-details">
                    <div class="detail-grid">
                        <div class="detail-item">
                            <h5><i class="fas fa-calendar-alt"></i> Timeline</h5>
                            <p>${project.timeline}</p>
                        </div>
                        <div class="detail-item">
                            <h5><i class="fas fa-users"></i> Beneficiaries</h5>
                            <p>${project.beneficiaries}</p>
                        </div>
                        <div class="detail-item">
                            <h5><i class="fas fa-map-marker-alt"></i> Location</h5>
                            <p>${project.location}</p>
                        </div>
                    </div>
                </div>
                
                <div class="modal-objectives">
                    <h4>Key Objectives</h4>
                    <ul>
                        ${project.objectives.map(obj => `<li>${obj}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-impact">
                    <h4>Impact Achieved</h4>
                    <p>${project.impact}</p>
                </div>
            </div>
        `;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Add event listener for ESC key
        document.addEventListener('keydown', handleEscKey);
    }
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
        
        // Remove ESC key event listener
        document.removeEventListener('keydown', handleEscKey);
    }
}

function handleEscKey(event) {
    if (event.key === 'Escape') {
        closeProjectModal();
    }
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeProjectModal();
            }
        });
    }
});

// Add styles for project details
const projectStyles = document.createElement('style');
projectStyles.textContent = `
    .project-details {
        margin: 30px 0;
        padding: 25px;
        background: var(--soft-gray);
        border-radius: 15px;
    }
    
    .detail-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
    }
    
    .detail-item h5 {
        color: var(--royal-blue);
        font-size: 1rem;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .detail-item h5 i {
        color: var(--emerald-green);
    }
    
    .detail-item p {
        color: var(--dark-gray);
        font-weight: 500;
        margin: 0;
    }
    
    @media (max-width: 768px) {
        .detail-grid {
            grid-template-columns: 1fr;
            gap: 15px;
        }
        
        .project-details {
            padding: 20px;
            margin: 20px 0;
        }
    }
`;
document.head.appendChild(projectStyles);
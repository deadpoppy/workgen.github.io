// 将功能卡片组件化
export const FeatureCard = ({ icon, title, description, tags }) => {
  return `
    <div class="feature-card" data-aos="zoom-in">
      <div class="feature-icon pulse">
        <i class="${icon}"></i>
      </div>
      <h3>${title}</h3>
      <p>${description}</p>
      <div class="tech-tags">
        ${tags.map(tag => `<span>${tag}</span>`).join('')}
      </div>
    </div>
  `;
}; 
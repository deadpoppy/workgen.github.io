import React from 'react';
import HeroSection from '../components/HeroSection';
import FeatureGrid from '../components/FeatureGrid';
import ImageGallery from '../components/ImageGallery';
import Layout from '../components/Layout';
import { validatePreviewImages } from '../utils/validateImages';
import { useEffect } from 'react';
import content from '../data/content.json';
import featuredImages from '../data/featured.json';

const previewImages = [
  { src: '/preview/AI周报总结.jpg', alt: 'AI周报总结' },
  { src: '/preview/dashboard.png', alt: '数据看板' },
  { src: '/preview/日报列表.jpg', alt: '日报列表' },
  { src: '/preview/智能代办.jpg', alt: '智能待办' },
  { src: '/preview/智能统计.jpg', alt: '智能统计' },
  { src: '/preview/自动化日报生成.jpg', alt: '自动化日报生成' }
];

export default function Home() {
  useEffect(() => {
    validatePreviewImages();
  }, []);

  return (
    <Layout>
      <section className="hero-section text-center py-20">
        <h1 className="text-5xl font-bold mb-4 gradient-text">
          {content.hero.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {content.hero.subtitle}
        </p>
        <button className="bg-accent text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition">
          {content.hero.cta}
        </button>
      </section>

      <section className="featured-projects py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">精选案例</h2>
        <ImageGallery 
          images={featuredImages}
          layout="masonry"
        />
      </section>

      <section className="services py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {content.features.map((feature) => (
            <div 
              key={feature.title}
              className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
} 
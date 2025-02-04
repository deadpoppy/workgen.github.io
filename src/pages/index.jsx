import React from 'react';
import HeroSection from '../components/HeroSection';
import FeatureGrid from '../components/FeatureGrid';
import ImageGallery from '../components/ImageGallery';
import Layout from '../components/Layout';
import { validatePreviewImages } from '../utils/validateImages';
import { useEffect } from 'react';

const previewImages = [
  { src: '/preview/AI周报总结.jpg', alt: 'AI周报总结' },
  { src: '/preview/dashboard.png', alt: '数据看板' },
  { src: '/preview/日报列表.jpg', alt: '日报列表' },
  { src: '/preview/智能代办.jpg', alt: '智能待办' },
  { src: '/preview/智能统计.jpg', alt: '智能统计' },
  { src: '/preview/自动化日报生成.jpg', alt: '自动化日报生成' }
];

export default function HomePage() {
  useEffect(() => {
    validatePreviewImages();
  }, []);

  return (
    <Layout>
      <div className="homepage">
        <HeroSection />
        <FeatureGrid />
        <ImageGallery images={previewImages} />
      </div>
      <div className="fixed bottom-4 right-4 p-2 bg-black/50 text-xs text-white rounded">
        Debug信息：
        <div>粒子系统：已加载</div>
        <div>光标效果：已启用</div>
        <div>图片数量：{previewImages.length}</div>
      </div>
    </Layout>
  );
} 
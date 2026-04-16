import { useMemo, useState } from 'react'
import heroImg from './assets/hero.png'
import './App.css'

const products = [
  { id: 1, name: 'Instagram Growth Kit', category: 'Marketing', price: 49, description: 'Templates, hooks, and ready-to-sell content for creators.', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=250&fit=crop' },
  { id: 2, name: 'Facebook Ads Mastery Pack', category: 'Marketing', price: 59, description: 'Complete ad templates and targeting strategies for Facebook.', image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=250&fit=crop' },
  { id: 3, name: 'LinkedIn Lead Gen Kit', category: 'Marketing', price: 65, description: 'Scripts and templates to generate B2B leads on LinkedIn.', image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop' },
  { id: 4, name: 'Email Marketing Swipe File', category: 'Marketing', price: 39, description: '100+ proven email templates for every stage of the funnel.', image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=400&h=250&fit=crop' },
  { id: 5, name: 'Pinterest Traffic Blueprint', category: 'Marketing', price: 44, description: 'Pin templates and strategy to drive massive organic traffic.', image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=250&fit=crop' },
  { id: 6, name: 'YouTube SEO Toolkit', category: 'Marketing', price: 52, description: 'Rank your videos faster with proven SEO scripts and tools.', image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=250&fit=crop' },
  { id: 7, name: 'TikTok Viral Content Pack', category: 'Marketing', price: 47, description: '50+ viral TikTok scripts and hooks for rapid growth.', image: 'https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=400&h=250&fit=crop' },
  { id: 8, name: 'Brand Identity Starter Kit', category: 'Marketing', price: 55, description: 'Logo, color palette, and brand guidelines templates.', image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=250&fit=crop' },
  { id: 9, name: 'Content Calendar Pro', category: 'Marketing', price: 29, description: '12-month content calendar with post ideas for all platforms.', image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=250&fit=crop' },
  { id: 10, name: 'Influencer Outreach Kit', category: 'Marketing', price: 42, description: 'DM scripts and email templates to land brand collaborations.', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop' },
  { id: 11, name: 'SEO Keyword Research Pack', category: 'Marketing', price: 48, description: 'Pre-researched keyword lists for 10 top niches.', image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=400&h=250&fit=crop' },
  { id: 12, name: 'Reels & Shorts Script Pack', category: 'Marketing', price: 36, description: '30 viral short-form video scripts ready to record.', image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=250&fit=crop' },
  { id: 13, name: 'Affiliate Marketing Starter', category: 'Marketing', price: 58, description: 'Step-by-step affiliate strategy with niche research templates.', image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=250&fit=crop' },
  { id: 14, name: 'Sales Funnel Template Pack', category: 'Marketing', price: 69, description: 'High-converting funnel pages for digital products.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop' },
  { id: 15, name: 'Podcast Launch Kit', category: 'Marketing', price: 43, description: 'Everything you need to launch and grow a podcast fast.', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=250&fit=crop' },
  { id: 16, name: 'Twitter/X Growth Pack', category: 'Marketing', price: 38, description: 'Thread templates and engagement strategies for X growth.', image: 'https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?w=400&h=250&fit=crop' },
  { id: 17, name: 'Google Ads Swipe File', category: 'Marketing', price: 62, description: '200+ high-CTR Google ad copies across multiple industries.', image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&h=250&fit=crop' },
  { id: 18, name: 'Newsletter Growth Kit', category: 'Marketing', price: 45, description: 'Templates and strategies to grow your email list to 10k+.', image: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=400&h=250&fit=crop' },
  { id: 19, name: 'Digital Product Mockup Pack', category: 'Marketing', price: 33, description: '50+ professional mockups for e-books, courses, and software.', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop' },
  { id: 20, name: 'Social Proof Templates', category: 'Marketing', price: 31, description: 'Testimonial and review graphics for all social platforms.', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop' },

  { id: 21, name: 'Canva Course Bundle', category: 'Course', price: 79, description: 'Beginner-to-pro lessons with editable bonus design packs.', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=250&fit=crop' },
  { id: 22, name: 'Dropshipping Mastery 2025', category: 'Course', price: 99, description: 'Step-by-step guide to building a profitable dropshipping store.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop' },
  { id: 23, name: 'Faceless YouTube Blueprint', category: 'Course', price: 89, description: 'Earn passive income with faceless YouTube channels from scratch.', image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=250&fit=crop' },
  { id: 24, name: 'Freelancing Zero to Hero', category: 'Course', price: 79, description: 'Land high-paying clients and scale your freelance business fast.', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop' },
  { id: 25, name: 'Social Media Agency Course', category: 'Course', price: 119, description: 'Start & grow a social media marketing agency from home.', image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=400&h=250&fit=crop' },
  { id: 26, name: 'ChatGPT for Business Course', category: 'Course', price: 85, description: 'Use AI to automate tasks, write content, and grow faster.', image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=250&fit=crop' },
  { id: 27, name: 'Print on Demand Masterclass', category: 'Course', price: 95, description: 'Launch a POD store and sell custom products worldwide.', image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=250&fit=crop' },
  { id: 28, name: 'Amazon FBA Bootcamp', category: 'Course', price: 129, description: 'Find, source, and sell products on Amazon profitably.', image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&h=250&fit=crop' },
  { id: 29, name: 'Copywriting Crash Course', category: 'Course', price: 75, description: 'Write words that sell — for ads, emails, and landing pages.', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop' },
  { id: 30, name: 'Web Design for Beginners', category: 'Course', price: 69, description: 'Build beautiful websites without coding using modern tools.', image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=250&fit=crop' },
  { id: 31, name: 'Video Editing Masterclass', category: 'Course', price: 88, description: 'Edit professional videos for YouTube, Reels, and clients.', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=250&fit=crop' },
  { id: 32, name: 'Notion Productivity Course', category: 'Course', price: 59, description: 'Build your second brain and manage life with Notion.', image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=250&fit=crop' },
  { id: 33, name: 'Stock Trading Basics', category: 'Course', price: 109, description: 'Learn to read charts, manage risk, and trade confidently.', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop' },
  { id: 34, name: 'UGC Creator Course', category: 'Course', price: 82, description: 'Get paid to create content for brands as a UGC creator.', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=250&fit=crop' },
  { id: 35, name: 'Digital Marketing Bootcamp', category: 'Course', price: 115, description: 'Full-stack digital marketing from SEO to paid ads.', image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=250&fit=crop' },
  { id: 36, name: 'Etsy Shop Success Course', category: 'Course', price: 72, description: 'Open and scale a profitable Etsy shop selling digital goods.', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=250&fit=crop' },
  { id: 37, name: 'Personal Finance Mastery', category: 'Course', price: 65, description: 'Budget, invest, and build wealth with proven strategies.', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop' },
  { id: 38, name: 'Public Speaking Pro', category: 'Course', price: 78, description: 'Speak with confidence on stage, camera, or in meetings.', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=250&fit=crop' },
  { id: 39, name: 'Mindset & Productivity Course', category: 'Course', price: 55, description: 'Build habits, beat procrastination, and achieve your goals.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=250&fit=crop' },
  { id: 40, name: 'Instagram Reels Course', category: 'Course', price: 67, description: 'Create viral Reels that grow your following fast.', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=250&fit=crop' },

  { id: 41, name: 'E-Book Empire Pack', category: 'E-Books', price: 35, description: 'Launch, rebrand, and resell premium e-books in minutes.', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=250&fit=crop' },
  { id: 42, name: 'Passive Income Bible', category: 'E-Books', price: 29, description: '20 proven passive income streams explained step by step.', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=250&fit=crop' },
  { id: 43, name: 'The Reseller Playbook', category: 'E-Books', price: 27, description: 'How to buy digital products and resell for maximum profit.', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop' },
  { id: 44, name: 'Social Media Money Guide', category: 'E-Books', price: 24, description: 'Monetize every social platform with this complete guide.', image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=250&fit=crop' },
  { id: 45, name: 'Freelancer Success Blueprint', category: 'E-Books', price: 32, description: 'From zero to Rs.1L/month as a freelancer — full roadmap.', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop' },
  { id: 46, name: 'ChatGPT Prompt Bible', category: 'E-Books', price: 19, description: '500+ ChatGPT prompts for business, content, and coding.', image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=250&fit=crop' },
  { id: 47, name: 'Mindset of Millionaires', category: 'E-Books', price: 22, description: 'Habits and thinking patterns of the world top earners.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=250&fit=crop' },
  { id: 48, name: 'Digital Nomad Handbook', category: 'E-Books', price: 28, description: 'Work from anywhere — tools, tips, and remote job sources.', image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&h=250&fit=crop' },
  { id: 49, name: 'Crypto for Beginners', category: 'E-Books', price: 25, description: 'Understand Bitcoin, altcoins, and DeFi in simple language.', image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=250&fit=crop' },
  { id: 50, name: 'Health & Wellness Planner', category: 'E-Books', price: 18, description: 'Daily planner and guide for fitness, diet, and mental health.', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop' },
  { id: 51, name: 'The Content Creator Bible', category: 'E-Books', price: 30, description: 'Everything a creator needs to build an audience and income.', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=250&fit=crop' },
  { id: 52, name: 'Email List Building Guide', category: 'E-Books', price: 23, description: 'Grow a 10,000 subscriber list from scratch — free methods.', image: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=400&h=250&fit=crop' },
  { id: 53, name: 'Productivity Hacks E-Book', category: 'E-Books', price: 20, description: 'Get more done in less time with science-backed strategies.', image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=250&fit=crop' },
  { id: 54, name: 'Side Hustle Encyclopedia', category: 'E-Books', price: 26, description: '50 side hustles you can start today with zero investment.', image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=250&fit=crop' },
  { id: 55, name: 'Branding for Beginners', category: 'E-Books', price: 21, description: 'Build a memorable brand identity without a designer.', image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=250&fit=crop' },
  { id: 56, name: 'YouTube Monetization Guide', category: 'E-Books', price: 28, description: 'Hit 1000 subs and 4000 hours fast — proven strategies.', image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=250&fit=crop' },
  { id: 57, name: 'Investing 101 E-Book', category: 'E-Books', price: 24, description: 'Start investing in stocks, mutual funds, and gold safely.', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop' },
  { id: 58, name: 'The Niche Finder Guide', category: 'E-Books', price: 19, description: 'Find profitable niches for blogs, YouTube, and products.', image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=400&h=250&fit=crop' },
  { id: 59, name: 'Shopify Store Launch Guide', category: 'E-Books', price: 31, description: 'Launch a Shopify store in 24 hours with this step-by-step guide.', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=250&fit=crop' },
  { id: 60, name: 'Morning Routine Mastery', category: 'E-Books', price: 17, description: 'Design a powerful morning routine that sets you up for success.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=250&fit=crop' },

  { id: 61, name: 'Freelancer Client Kit', category: 'Business', price: 59, description: 'Contracts, proposals, and onboarding docs for fast delivery.', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop' },
  { id: 62, name: 'Digital Product Launch Kit', category: 'Business', price: 69, description: 'Everything you need to launch your first digital product.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop' },
  { id: 63, name: 'Notion Business OS', category: 'Business', price: 39, description: 'All-in-one Notion workspace for managing your business.', image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=250&fit=crop' },
  { id: 64, name: 'Business Plan Template Pack', category: 'Business', price: 49, description: 'Professional business plan templates for any industry.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop' },
  { id: 65, name: 'Invoice & Contract Bundle', category: 'Business', price: 35, description: 'Legal-ready invoice and contract templates for freelancers.', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop' },
  { id: 66, name: 'Startup Pitch Deck Kit', category: 'Business', price: 75, description: 'Investor-ready pitch deck templates used by funded startups.', image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop' },
  { id: 67, name: 'HR Policy Templates', category: 'Business', price: 44, description: 'Ready-to-use HR policies for small businesses and startups.', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=250&fit=crop' },
  { id: 68, name: 'E-Commerce Store SOP Pack', category: 'Business', price: 52, description: 'Standard operating procedures for running an online store.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop' },
  { id: 69, name: 'Client Onboarding System', category: 'Business', price: 47, description: 'Automate your client onboarding with templates and workflows.', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop' },
  { id: 70, name: 'Social Media Agency SOP', category: 'Business', price: 58, description: 'Run your agency like a pro with documented processes.', image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=400&h=250&fit=crop' },
  { id: 71, name: 'Financial Tracker Spreadsheet', category: 'Business', price: 29, description: 'Track income, expenses, and profits with this smart sheet.', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop' },
  { id: 72, name: 'Product Pricing Calculator', category: 'Business', price: 25, description: 'Calculate the perfect price for your digital or physical products.', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop' },
  { id: 73, name: 'Reseller License Agreement', category: 'Business', price: 33, description: 'Legal reseller agreement template for digital product sellers.', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop' },
  { id: 74, name: 'Brand Partnership Proposal', category: 'Business', price: 38, description: 'Win brand deals with this professional proposal template.', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop' },
  { id: 75, name: 'Weekly Business Review Kit', category: 'Business', price: 27, description: 'Review your business performance weekly with structured templates.', image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=250&fit=crop' },
  { id: 76, name: 'Customer Support Scripts', category: 'Business', price: 31, description: 'Handle any customer query professionally with ready scripts.', image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=250&fit=crop' },
  { id: 77, name: 'Digital Agency Proposal Kit', category: 'Business', price: 55, description: 'Win more clients with stunning agency proposal templates.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop' },
  { id: 78, name: 'Productivity Planner Bundle', category: 'Business', price: 22, description: 'Daily, weekly, and monthly planner templates for entrepreneurs.', image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=250&fit=crop' },
  { id: 79, name: 'Webinar Launch Checklist', category: 'Business', price: 28, description: 'Launch a profitable webinar with this complete checklist system.', image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=250&fit=crop' },
  { id: 80, name: 'Online Course Creator Kit', category: 'Business', price: 64, description: 'Plan, create, and launch your online course with ease.', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop' },
]

const categories = ['All', 'Marketing', 'Course', 'E-Books', 'Business']

const newReleases = [
  { id: 101, name: 'AI Content Creator Kit', category: 'Marketing', price: 55, badge: 'NEW', description: 'AI-powered templates to create viral content in minutes.', image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=250&fit=crop' },
  { id: 102, name: 'YouTube Shorts Masterpack', category: 'Marketing', price: 45, badge: 'NEW', description: 'Scripts, hooks & thumbnails for explosive YouTube growth.', image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=250&fit=crop' },
  { id: 103, name: 'WhatsApp Marketing Kit', category: 'Marketing', price: 42, badge: 'NEW', description: 'Broadcast templates and automation tips for WhatsApp business.', image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=250&fit=crop' },
  { id: 104, name: 'Notion Business OS', category: 'Business', price: 39, badge: 'NEW', description: 'All-in-one Notion workspace for managing your business.', image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=250&fit=crop' },
  { id: 105, name: 'Digital Product Launch Kit', category: 'Business', price: 69, badge: 'NEW', description: 'Everything you need to launch your first digital product.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop' },
  { id: 106, name: 'ChatGPT Prompt Bible', category: 'E-Books', price: 19, badge: 'NEW', description: '500+ ChatGPT prompts for business, content, and coding.', image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=250&fit=crop' },
  { id: 107, name: 'UGC Creator Course', category: 'Course', price: 82, badge: 'NEW', description: 'Get paid to create content for brands as a UGC creator.', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=250&fit=crop' },
  { id: 108, name: 'Webinar Launch Checklist', category: 'Business', price: 28, badge: 'NEW', description: 'Launch a profitable webinar with this complete checklist system.', image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=250&fit=crop' },
]

const trendingCourses = [
  { id: 201, name: 'Dropshipping Mastery 2025', category: 'Course', price: 99, badge: '🔥 Trending', description: 'Step-by-step guide to building a profitable dropshipping store.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop' },
  { id: 202, name: 'Faceless YouTube Blueprint', category: 'Course', price: 89, badge: '🔥 Trending', description: 'Earn passive income with faceless YouTube channels from scratch.', image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=250&fit=crop' },
  { id: 203, name: 'Freelancing Zero to Hero', category: 'Course', price: 79, badge: '⭐ Bestseller', description: 'Land high-paying clients and scale your freelance business fast.', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop' },
  { id: 204, name: 'Social Media Agency Course', category: 'Course', price: 119, badge: '⭐ Bestseller', description: 'Start & grow a social media marketing agency from home.', image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=400&h=250&fit=crop' },
  { id: 205, name: 'Amazon FBA Bootcamp', category: 'Course', price: 129, badge: '🔥 Trending', description: 'Find, source, and sell products on Amazon profitably.', image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&h=250&fit=crop' },
  { id: 206, name: 'ChatGPT for Business Course', category: 'Course', price: 85, badge: '🔥 Trending', description: 'Use AI to automate tasks, write content, and grow faster.', image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=250&fit=crop' },
  { id: 207, name: 'Digital Marketing Bootcamp', category: 'Course', price: 115, badge: '⭐ Bestseller', description: 'Full-stack digital marketing from SEO to paid ads.', image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=250&fit=crop' },
  { id: 208, name: 'Stock Trading Basics', category: 'Course', price: 109, badge: '⭐ Bestseller', description: 'Learn to read charts, manage risk, and trade confidently.', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop' },
]

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [cartItems, setCartItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState('home')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
  const [wishlist, setWishlist] = useState([])
  const [compareList, setCompareList] = useState([])
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [priceRange, setPriceRange] = useState([0, 200])

  const toggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    )
  }

  const toggleCompare = (product) => {
    setCompareList((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev.filter((p) => p.id !== product.id)
      if (prev.length >= 3) return prev
      return [...prev, product]
    })
  }

  const allProducts = useMemo(() => [...products, ...newReleases, ...trendingCourses], [])

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    return allProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory
      const matchesSearch =
        !term ||
        `${product.name} ${product.category} ${product.description}`
          .toLowerCase()
          .includes(term)
      return matchesCategory && matchesSearch && product.price >= priceRange[0] && product.price <= priceRange[1]
    })
  }, [searchTerm, selectedCategory, allProducts, priceRange])

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )
  const shippingFee = cartCount > 0 ? 10 : 0
  const orderTotal = cartTotal + shippingFee

  const handleAddToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...currentItems, { ...product, quantity: 1 }]
    })
    setCurrentPage('cart')
  }

  const updateQuantity = (productId, change) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return
    if (!paymentMethod) return
    setCartItems([])
    setPaymentMethod('')
    setCurrentPage('home')
  }

  const ProductCard = ({ product, badgeEl }) => (
    <article className="product-card">
      <div className="product-img">
        <img src={product.image} alt={product.name} />
        {badgeEl}
        <div className="product-img__actions">
          <button type="button" className="pimg-btn" title="Quick View" onClick={() => setQuickViewProduct(product)}>👁</button>
          <button
            type="button"
            className={`pimg-btn${wishlist.find((p) => p.id === product.id) ? ' pimg-btn--active' : ''}`}
            title="Wishlist"
            onClick={() => toggleWishlist(product)}
          >{wishlist.find((p) => p.id === product.id) ? '❤️' : '🤍'}</button>
          <button
            type="button"
            className={`pimg-btn${compareList.find((p) => p.id === product.id) ? ' pimg-btn--active' : ''}`}
            title="Compare"
            onClick={() => toggleCompare(product)}
          >⇄</button>
        </div>
      </div>
      <div className="product-card__body">
        <span className="product-category">{product.category}</span>
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <div className="product-footer">
          <strong>Rs. {product.price.toFixed(2)}</strong>
          <button type="button" onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </article>
  )

  return (
    <main className="page-shell">
      <div className="top-strip">
        <div className="container top-strip__inner">
          <div className="top-strip__links">
            <button type="button" onClick={() => setCurrentPage('home')}>
              JOIN US
            </button>
            <button type="button" onClick={() => setCurrentPage('contact')}>
              CONTACT US
            </button>
          </div>
          <h4>Get 10%- Off On Your First Purchase</h4>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-main">
          <div className="brand-mark">DH</div>

          <div className="search-panel">
            <input
              type="text"
              placeholder="Search for products"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && searchTerm.trim()) setCurrentPage('shop') }}
            />
            <div className="cat-dropdown">
              <button
                className="category-button"
                type="button"
                onClick={() => setCategoryDropdownOpen((v) => !v)}
              >
                {selectedCategory === 'All' ? 'SELECT CATEGORY' : selectedCategory}
                <span>▾</span>
              </button>
              {categoryDropdownOpen && (
                <div className="cat-dropdown__menu">
                  {[
                    { label: 'All Categories', value: 'All' },
                    { label: 'Course', value: 'Course' },
                    { label: 'Digital Products', value: 'Marketing' },
                    { label: 'E-Book Bundle', value: 'E-Books' },
                    { label: 'New List', value: 'Business' },
                  ].map(({ label, value }) => (
                    <button
                      key={value}
                      type="button"
                      className={selectedCategory === value ? 'active' : ''}
                      onClick={() => { setSelectedCategory(value); setCategoryDropdownOpen(false); setCurrentPage('shop') }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              className="search-button"
              type="button"
              aria-label="Search"
              onClick={() => { if (searchTerm.trim()) setCurrentPage('shop') }}
            >
              🔍
            </button>
          </div>

          <div className="header-actions">
            <button type="button" onClick={() => setCurrentPage('checkout')}>
              LOGIN / REGISTER
            </button>
            <button type="button" aria-label="Wishlist" onClick={() => setCurrentPage('wishlist')}>
              ♡ {wishlist.length > 0 && <span className="header-badge">{wishlist.length}</span>}
            </button>
            <button
              type="button"
              aria-label="Cart"
              onClick={() => setCurrentPage('cart')}
            >
              🛒
            </button>
            <span>{cartCount} items</span>
            <span>Rs. {cartTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="container nav-row">
          <nav className="main-nav" aria-label="Primary">
            <button
              type="button"
              className={currentPage === 'home' ? 'active' : ''}
              onClick={() => setCurrentPage('home')}
            >
              HOME
            </button>
            <button
              type="button"
              className={currentPage === 'shop' ? 'active' : ''}
              onClick={() => setCurrentPage('shop')}
            >
              SHOP
            </button>
            <button
              type="button"
              className={currentPage === 'about' ? 'active' : ''}
              onClick={() => setCurrentPage('about')}
            >
              ABOUT US
            </button>
            <button
              type="button"
              className={currentPage === 'contact' ? 'active' : ''}
              onClick={() => setCurrentPage('contact')}
            >
              CONTACT US
            </button>
            <button
              type="button"
              className={currentPage === 'checkout' ? 'active' : ''}
              onClick={() => setCurrentPage('checkout')}
            >
              CHECKOUT
            </button>
            <button
              type="button"
              className={currentPage === 'cart' ? 'active' : ''}
              onClick={() => setCurrentPage('cart')}
            >
              CART
            </button>
            <div className="nav-dropdown">
              <button
                type="button"
                className={['shipping','refund','terms','cancellation','privacy'].includes(currentPage) ? 'active' : ''}
                onClick={() => setDropdownOpen((v) => !v)}
              >
                OTHERS PAGE ▾
              </button>
              {dropdownOpen && (
                <div className="nav-dropdown__menu">
                  {[
                    { key: 'shipping', label: 'Shipping & Delivery Policy' },
                    { key: 'refund', label: 'Refund Policy' },
                    { key: 'terms', label: 'Terms And Conditions' },
                    { key: 'cancellation', label: 'Cancellation And Refund' },
                    { key: 'privacy', label: 'Privacy Policy' },
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => { setCurrentPage(key); setDropdownOpen(false) }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
          <button
            type="button"
            className="whatsapp-link"
            onClick={() => setCurrentPage('home')}
          >
            Join Our WhatsApp Group
          </button>
        </div>
      </header>

      {currentPage === 'home' ? (
        <>
          <section className="hero-section container">
            <div className="hero-copy">
              <h1>Welcome to DigiHook Store! 🚀</h1>
              <h2>Boost Your Business with Premium Digital Products from DigiHook!</h2>
              <p>🚀</p>
              <p>
                Purchase high-quality <strong>business growth software</strong>{' '}
                and other digital tools from DigiHook, then resell them and{' '}
                <strong>keep 100% of the profits!</strong> 🔥
              </p>
              <button
                type="button"
                className="shop-button"
                onClick={() => setCurrentPage('home')}
              >
                Shop
              </button>
            </div>

            <div className="hero-art">
              <img src={heroImg} alt="Digital workspace illustration" />
            </div>
          </section>

          <section className="products-section container" id="shop">
            <div className="section-heading">
              <div>
                <p className="section-label">Featured Products</p>
                <h3>Popular digital products on the home page</h3>
              </div>
              <button type="button" className="ghost-button" onClick={() => setCurrentPage('shop')}>View All</button>
            </div>

            <div className="category-tabs">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={selectedCategory === category ? 'active' : ''}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="product-grid">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="view-more-wrap">
              <button type="button" className="view-more-btn" onClick={() => setCurrentPage('shop')}>
                View All Products →
              </button>
            </div>
          </section>

          {/* New Releases */}
          <section className="home-section container">
            <div className="section-heading">
              <div>
                <p className="section-label">Just Dropped</p>
                <h3>New Releases 🆕</h3>
              </div>
              <button type="button" className="ghost-button" onClick={() => setCurrentPage('shop')}>View All</button>
            </div>
            <div className="product-grid">
              {newReleases.map((product) => (
                <ProductCard key={product.id} product={product} badgeEl={<span className="product-badge badge--new img-badge">{product.badge}</span>} />
              ))}
            </div>
          </section>

          {/* Trending Courses */}
          <section className="home-section home-section--dark">
            <div className="container">
              <div className="section-heading">
                <div>
                  <p className="section-label">Most Popular</p>
                  <h3>Trending Courses 🔥</h3>
                </div>
                <button type="button" className="ghost-button" onClick={() => setCurrentPage('shop')}>View All</button>
              </div>
              <div className="product-grid">
                {trendingCourses.map((product) => (
                  <ProductCard key={product.id} product={product} badgeEl={<span className="product-badge badge--trend img-badge">{product.badge}</span>} />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}

      {currentPage === 'shop' ? (
        <section className="shop-page container">
          <div className="page-header">
            <div>
              <p className="section-label">Shop</p>
              <h3>All DigiHook digital products</h3>
            </div>
          </div>

          <div className="shop-layout">
            <aside className="shop-sidebar">
              <h4>Filter by Category</h4>
              <div className="category-tabs vertical">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={selectedCategory === category ? 'active' : ''}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="price-filter">
                <h4>Filter by Price</h4>
                <div className="price-filter__labels">
                  <span>Min: <strong>Rs. {priceRange[0]}</strong></span>
                  <span>Max: <strong>Rs. {priceRange[1]}</strong></span>
                </div>
                <div className="price-filter__sliders">
                  <input
                    type="range"
                    min="0" max="200"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const val = Number(e.target.value)
                      if (val < priceRange[1]) setPriceRange([val, priceRange[1]])
                    }}
                  />
                  <input
                    type="range"
                    min="0" max="200"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const val = Number(e.target.value)
                      if (val > priceRange[0]) setPriceRange([priceRange[0], val])
                    }}
                  />
                </div>
                <button
                  type="button"
                  className="price-reset-btn"
                  onClick={() => setPriceRange([0, 200])}
                >
                  Reset Price
                </button>
              </div>

              <div className="sidebar-products">
                <h4>Popular Products</h4>
                {allProducts.slice(0, 5).map((p) => (
                  <div key={p.id} className="sidebar-product-item">
                    <img src={p.image} alt={p.name} />
                    <div>
                      <p>{p.name}</p>
                      <strong>Rs. {p.price.toFixed(2)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            <div className="shop-content">
              <div className="shop-toolbar">
                <p className="section-meta">
                  Showing {filteredProducts.length} product
                  {filteredProducts.length === 1 ? '' : 's'}
                </p>
              </div>

              <div className="product-grid shop-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {currentPage === 'cart' ? (
        <section className="cart-page container">
          <div className="page-header">
            <div>
              <p className="section-label">Your Cart</p>
              <h3>Products added to cart</h3>
            </div>
            <button
              type="button"
              className="ghost-button"
              onClick={() => setCurrentPage('home')}
            >
              Continue Shopping
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="empty-state">Your cart is empty. Add some products first.</div>
          ) : (
            <div className="cart-layout">
              <div className="cart-list">
                <div className="cart-list-header">
                  <span>{cartCount} item{cartCount > 1 ? 's' : ''} in cart</span>
                  <button type="button" className="clear-cart-btn" onClick={() => setCartItems([])}>🗑 Clear All</button>
                </div>
                {cartItems.map((item) => (
                  <article key={item.id} className="cart-item">
                    {item.image && <img src={item.image} alt={item.name} className="cart-item__img" />}
                    <div className="cart-item__info">
                      <span className="product-category">{item.category}</span>
                      <h4>{item.name}</h4>
                      <p>Rs. {item.price.toFixed(2)} each</p>
                    </div>
                    <div className="cart-item__actions">
                      <div className="qty-box">
                        <button type="button" onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                      <strong>Rs. {(item.price * item.quantity).toFixed(2)}</strong>
                      <button type="button" className="remove-btn" title="Remove" onClick={() => removeFromCart(item.id)}>✕</button>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="summary-card">
                <h4>Cart Summary</h4>
                <div className="summary-row">
                  <span>Items</span>
                  <span>{cartCount}</span>
                </div>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>Rs. {cartTotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Rs. {shippingFee.toFixed(2)}</span>
                </div>
                <div className="summary-row summary-row--total">
                  <span>Total</span>
                  <span>Rs. {orderTotal.toFixed(2)}</span>
                </div>
                <button
                  type="button"
                  className="primary-action"
                  onClick={() => setCurrentPage('checkout')}
                >
                  Proceed to Checkout
                </button>
              </aside>
            </div>
          )}
        </section>
      ) : null}

      {currentPage === 'checkout' ? (
        <section className="checkout-page container">
          <div className="page-header">
            <div>
              <p className="section-label">Checkout</p>
              <h3>Complete your order</h3>
            </div>
            <button
              type="button"
              className="ghost-button"
              onClick={() => setCurrentPage('cart')}
            >
              Back to Cart
            </button>
          </div>

          <div className="checkout-layout">
            <form className="checkout-form">
              <input type="text" placeholder="Full Name" />
              <input type="email" placeholder="Email Address" />
              <input type="text" placeholder="Phone Number" />
              <input type="text" placeholder="City" />
              <textarea rows="5" placeholder="Enter your address"></textarea>

              <div className="payment-methods">
                <p className="payment-title">Payment Method</p>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    checked={paymentMethod === 'UPI'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>UPI</span>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="Card"
                    checked={paymentMethod === 'Card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Card</span>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>

              <button
                type="button"
                className="primary-action"
                onClick={handlePlaceOrder}
                disabled={cartItems.length === 0 || !paymentMethod}
              >
                Pay & Place Order
              </button>
            </form>

            <aside className="summary-card">
              <h4>Order Summary</h4>
              {cartItems.length === 0 ? (
                <p className="summary-empty">No items in cart yet.</p>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div key={item.id} className="summary-row summary-row--product">
                      {item.image && <img src={item.image} alt={item.name} className="summary-item__img" />}
                      <span>{item.name} x {item.quantity}</span>
                      <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>Rs. {shippingFee.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Payment</span>
                    <span>{paymentMethod || '-'}</span>
                  </div>
                  <div className="summary-row summary-row--total">
                    <span>Total Payable</span>
                    <span>Rs. {orderTotal.toFixed(2)}</span>
                  </div>
                </>
              )}
            </aside>
          </div>
        </section>
      ) : null}

      {currentPage === 'about' ? (
        <section className="about-page">

          {/* Hero Banner */}
          <div className="about-hero">
            <div className="container about-hero__inner">
              <div className="about-hero__copy">
                <p className="section-label">About DigiHook</p>
                <h2>We Help You Build a Digital Business from Scratch 🚀</h2>
                <p>DigiHook is a premium digital products marketplace where creators, freelancers, and entrepreneurs buy ready-made tools and resell them for 100% profit.</p>
                <button type="button" className="shop-button" onClick={() => setCurrentPage('shop')}>Explore Products</button>
              </div>
              <div className="about-hero__img">
                <img src={heroImg} alt="DigiHook About" />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="container">
            <div className="about-stats">
              {[
                { num: '5,000+', label: 'Happy Customers' },
                { num: '100+', label: 'Digital Products' },
                { num: '100%', label: 'Profit to You' },
                { num: '24hrs', label: 'Fast Delivery' },
              ].map(({ num, label }) => (
                <div key={label} className="about-stat-card">
                  <strong>{num}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Story + Image */}
          <div className="container about-story">
            <div className="about-story__img">
              <img src={heroImg} alt="Our Story" />
            </div>
            <div className="about-story__copy">
              <p className="section-label">Our Story</p>
              <h3>Started with a Simple Idea</h3>
              <p>DigiHook was founded with one mission — make it easy for anyone to start an online business without creating products from scratch. We curate high-quality digital tools so you can focus on selling and growing.</p>
              <p>From Instagram growth kits to full business toolkits, every product on DigiHook is handpicked, tested, and ready to resell. No experience needed — just buy, brand, and sell.</p>
              <div className="about-checks">
                {['No inventory needed', 'Instant digital delivery', 'Resell & keep 100% profit', 'Worldwide access'].map((item) => (
                  <div key={item} className="about-check">✅ {item}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="about-features-bg">
            <div className="container">
              <div className="about-features-head">
                <p className="section-label">Why Choose Us</p>
                <h3>Everything You Need to Succeed</h3>
              </div>
              <div className="about-features-grid">
                {[
                  { icon: '🎯', title: 'Curated Products', desc: 'Every product is handpicked for quality and resale value. No junk, only premium tools.' },
                  { icon: '⚡', title: 'Instant Delivery', desc: 'Get your product delivered to your email within minutes of payment.' },
                  { icon: '💰', title: '100% Profit', desc: 'Buy once, resell unlimited times. All profits go directly to you.' },
                  { icon: '🔒', title: 'Secure Payments', desc: 'All transactions are encrypted and processed through trusted payment gateways.' },
                  { icon: '🌍', title: 'Global Access', desc: 'Shop and sell from anywhere in the world. No geographical restrictions.' },
                  { icon: '🤝', title: 'Seller Support', desc: 'Our team is available Mon–Sat to help you with any product or resale queries.' },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="about-feature-card">
                    <span className="about-feature-icon">{icon}</span>
                    <h4>{title}</h4>
                    <p>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="container about-cta">
            <div className="about-cta__box">
              <h3>Ready to Start Your Digital Business?</h3>
              <p>Join thousands of sellers who are already making money with DigiHook products.</p>
              <div className="about-cta__btns">
                <button type="button" className="primary-action" onClick={() => setCurrentPage('shop')}>Browse Products</button>
                <button type="button" className="ghost-button" onClick={() => setCurrentPage('contact')}>Contact Us</button>
              </div>
            </div>
          </div>

        </section>
      ) : null}

      {currentPage === 'policies' ? (
        <section className="policies-page container">
          <div className="page-header">
            <div>
              <p className="section-label">Others</p>
              <h3>Important Information</h3>
            </div>
            <button type="button" className="ghost-button" onClick={() => setCurrentPage('home')}>
              Back to Home
            </button>
          </div>
          <div className="policies-layout">
            {[
              { key: 'shipping', label: 'Shipping & Delivery Policy' },
              { key: 'refund', label: 'Refund Policy' },
              { key: 'terms', label: 'Terms And Conditions' },
              { key: 'cancellation', label: 'Cancellation And Refund' },
              { key: 'privacy', label: 'Privacy Policy' },
            ].map(({ key, label }) => (
              <button
                key={key}
                type="button"
                className="policy-link-card"
                onClick={() => setCurrentPage(key)}
              >
                <span>{label}</span>
                <span className="policy-arrow">→</span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {currentPage === 'shipping' ? (
        <section className="policy-detail container">
          <div className="page-header">
            <div><p className="section-label">Policy</p><h3>Shipping &amp; Delivery Policy</h3></div>
            <button type="button" className="ghost-button" onClick={() => setCurrentPage('policies')}>← Back</button>
          </div>
          <div className="policy-content">
            <div className="policy-section">
              <h4>📦 Digital Delivery</h4>
              <p>All DigiHook products are <strong>100% digital</strong>. There is no physical shipping involved. Once your payment is confirmed, your product will be delivered directly to your registered email address.</p>
            </div>
            <div className="policy-section">
              <h4>⏱ Delivery Time</h4>
              <ul>
                <li>Most products are delivered <strong>instantly</strong> after payment.</li>
                <li>In some cases, delivery may take up to <strong>24 hours</strong>.</li>
                <li>If you do not receive your product within 24 hours, contact our support team immediately.</li>
              </ul>
            </div>
            <div className="policy-section">
              <h4>📧 How You Receive It</h4>
              <p>Your product download link or access credentials will be sent to the email you provided at checkout. Please check your spam/junk folder if you don't see it in your inbox.</p>
            </div>
            <div className="policy-section">
              <h4>🌍 Availability</h4>
              <p>DigiHook delivers to customers <strong>worldwide</strong>. Since all products are digital, there are no geographical restrictions or customs delays.</p>
            </div>
          </div>
        </section>
      ) : null}

      {currentPage === 'refund' ? (
        <section className="policy-detail container">
          <div className="page-header">
            <div><p className="section-label">Policy</p><h3>Refund Policy</h3></div>
            <button type="button" className="ghost-button" onClick={() => setCurrentPage('policies')}>← Back</button>
          </div>
          <div className="policy-content">
            <div className="policy-section">
              <h4>🚫 No Refund After Delivery</h4>
              <p>Due to the digital nature of our products, we do <strong>not offer refunds</strong> once the product has been delivered and accessed. Please review the product description carefully before purchasing.</p>
            </div>
            <div className="policy-section">
              <h4>✅ When Refund May Be Considered</h4>
              <ul>
                <li>You were charged but did <strong>not receive</strong> the product within 24 hours.</li>
                <li>The product file is <strong>corrupted or inaccessible</strong>.</li>
                <li>You were charged <strong>twice</strong> for the same order.</li>
              </ul>
            </div>
            <div className="policy-section">
              <h4>📩 How to Request a Refund</h4>
              <p>Email us at <strong>support@digihook.example</strong> within <strong>48 hours</strong> of purchase with your order ID and a description of the issue. Our team will review and respond within 2 business days.</p>
            </div>
            <div className="policy-section">
              <h4>💳 Refund Processing Time</h4>
              <p>Approved refunds will be credited back to your original payment method within <strong>5–7 business days</strong>.</p>
            </div>
          </div>
        </section>
      ) : null}

      {currentPage === 'terms' ? (
        <section className="policy-detail container">
          <div className="page-header">
            <div><p className="section-label">Policy</p><h3>Terms And Conditions</h3></div>
            <button type="button" className="ghost-button" onClick={() => setCurrentPage('policies')}>← Back</button>
          </div>
          <div className="policy-content">
            <div className="policy-section">
              <h4>📋 Acceptance of Terms</h4>
              <p>By accessing or purchasing from DigiHook, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our platform.</p>
            </div>
            <div className="policy-section">
              <h4>🛒 Use of Products</h4>
              <ul>
                <li>Products are licensed for <strong>personal or resale use only</strong>.</li>
                <li>You may <strong>not redistribute</strong> products without purchasing a license.</li>
                <li>Reverse engineering, copying, or sharing product files is strictly prohibited.</li>
              </ul>
            </div>
            <div className="policy-section">
              <h4>⚖️ Intellectual Property</h4>
              <p>All content on DigiHook — including product files, descriptions, images, and branding — is the intellectual property of DigiHook. Unauthorized use may result in legal action.</p>
            </div>
            <div className="policy-section">
              <h4>🔄 Changes to Terms</h4>
              <p>DigiHook reserves the right to update these Terms at any time. Continued use of the platform after changes constitutes your acceptance of the new Terms.</p>
            </div>
          </div>
        </section>
      ) : null}

      {currentPage === 'cancellation' ? (
        <section className="policy-detail container">
          <div className="page-header">
            <div><p className="section-label">Policy</p><h3>Cancellation And Refund</h3></div>
            <button type="button" className="ghost-button" onClick={() => setCurrentPage('policies')}>← Back</button>
          </div>
          <div className="policy-content">
            <div className="policy-section">
              <h4>❌ Cancellation Window</h4>
              <p>You may cancel your order <strong>within 1 hour</strong> of placing it, provided the product has not yet been delivered. Once the product is delivered, cancellation is not possible.</p>
            </div>
            <div className="policy-section">
              <h4>📩 How to Cancel</h4>
              <ul>
                <li>Email us at <strong>support@digihook.example</strong> with your Order ID.</li>
                <li>Mention the reason for cancellation.</li>
                <li>Our team will confirm the cancellation within a few hours.</li>
              </ul>
            </div>
            <div className="policy-section">
              <h4>💰 Refund After Cancellation</h4>
              <p>If your cancellation is approved, the full amount will be refunded to your original payment method within <strong>5–7 business days</strong>.</p>
            </div>
            <div className="policy-section">
              <h4>⚠️ Non-Cancellable Orders</h4>
              <p>Orders that have already been delivered or where the download link has been accessed <strong>cannot be cancelled</strong> under any circumstances.</p>
            </div>
          </div>
        </section>
      ) : null}

      {currentPage === 'privacy' ? (
        <section className="policy-detail container">
          <div className="page-header">
            <div><p className="section-label">Policy</p><h3>Privacy Policy</h3></div>
            <button type="button" className="ghost-button" onClick={() => setCurrentPage('policies')}>← Back</button>
          </div>
          <div className="policy-content">
            <div className="policy-section">
              <h4>🔐 Information We Collect</h4>
              <ul>
                <li><strong>Name</strong> — to personalize your order.</li>
                <li><strong>Email address</strong> — to deliver your product and send receipts.</li>
                <li><strong>Phone number</strong> — for order support only.</li>
              </ul>
            </div>
            <div className="policy-section">
              <h4>🚫 What We Don't Do</h4>
              <ul>
                <li>We do <strong>not sell</strong> your personal data to any third party.</li>
                <li>We do <strong>not share</strong> your information with advertisers.</li>
                <li>We do <strong>not store</strong> your payment details — all payments are processed securely.</li>
              </ul>
            </div>
            <div className="policy-section">
              <h4>🛡 Data Security</h4>
              <p>Your data is stored on secure servers with encryption. We follow industry-standard practices to protect your information from unauthorized access.</p>
            </div>
            <div className="policy-section">
              <h4>📬 Contact About Privacy</h4>
              <p>If you have any questions about how your data is used, email us at <strong>privacy@digihook.example</strong>. We will respond within 2 business days.</p>
            </div>
          </div>
        </section>
      ) : null}

      {currentPage === 'contact' ? (
        <section className="contact-page container">
          <div className="page-header">
            <div>
              <p className="section-label">Contact</p>
              <h3>Get in touch with us</h3>
            </div>
            <button
              type="button"
              className="ghost-button"
              onClick={() => setCurrentPage('shop')}
            >
              Back to Shop
            </button>
          </div>

          <div className="contact-layout">
            <div className="contact-form-card">
              <form
                className="checkout-form contact-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (!contactForm.name || !contactForm.email || !contactForm.message)
                    return
                  setContactSubmitted(true)
                }}
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm((v) => ({ ...v, name: e.target.value }))
                  }
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm((v) => ({ ...v, email: e.target.value }))
                  }
                />
                <textarea
                  rows="5"
                  placeholder="Write your message"
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm((v) => ({ ...v, message: e.target.value }))
                  }
                />

                <button
                  type="submit"
                  className="primary-action"
                  disabled={
                    !contactForm.name || !contactForm.email || !contactForm.message
                  }
                >
                  Send Message
                </button>
              </form>

              {contactSubmitted ? (
                <div className="contact-success">
                  Thanks! We received your message. We will contact you soon.
                </div>
              ) : null}
            </div>

            <aside className="contact-info-card">
              <h4>Our Support</h4>
              <p>
                Email: <strong>support@dihook.example</strong>
              </p>
              <p>
                Phone: <strong>+1 (000) 000-0000</strong>
              </p>
              <p>Hours: Mon - Sat, 10:00 AM - 6:00 PM</p>
            </aside>
          </div>
        </section>
      ) : null}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="modal-overlay" onClick={() => setQuickViewProduct(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setQuickViewProduct(null)}>✕</button>
            <div className="modal-inner">
              <div className="modal-img">
                <img src={quickViewProduct.image} alt={quickViewProduct.name} />
              </div>
              <div className="modal-info">
                <span className="product-category">{quickViewProduct.category}</span>
                <h3>{quickViewProduct.name}</h3>
                <p>{quickViewProduct.description}</p>
                <strong className="modal-price">Rs. {quickViewProduct.price.toFixed(2)}</strong>
                <div className="modal-actions">
                  <button type="button" className="primary-action" onClick={() => { handleAddToCart(quickViewProduct); setQuickViewProduct(null) }}>Add to Cart</button>
                  <button
                    type="button"
                    className={`ghost-button${wishlist.find((p) => p.id === quickViewProduct.id) ? ' wishlist-active' : ''}`}
                    onClick={() => toggleWishlist(quickViewProduct)}
                  >{wishlist.find((p) => p.id === quickViewProduct.id) ? '❤️ Wishlisted' : '🤍 Wishlist'}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wishlist Page */}
      {currentPage === 'wishlist' ? (
        <section className="container">
          <div className="page-header">
            <div><p className="section-label">My Wishlist</p><h3>Saved Products ❤️</h3></div>
            <button type="button" className="ghost-button" onClick={() => setCurrentPage('home')}>Back to Home</button>
          </div>
          {wishlist.length === 0 ? (
            <div className="empty-state">Your wishlist is empty. Click 🤍 on any product to save it.</div>
          ) : (
            <div className="product-grid" style={{ paddingBottom: '4rem' }}>
              {wishlist.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          )}
        </section>
      ) : null}

      {/* Compare Page */}
      {currentPage === 'compare' ? (
        <section className="container">
          <div className="page-header">
            <div><p className="section-label">Compare</p><h3>Product Comparison ⇄</h3></div>
            <button type="button" className="ghost-button" onClick={() => setCurrentPage('home')}>Back to Home</button>
          </div>
          {compareList.length === 0 ? (
            <div className="empty-state">No products to compare. Click ⇄ on any product to add.</div>
          ) : (
            <div className="compare-table-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    {compareList.map((p) => <th key={p.id}>{p.name}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Image</td>
                    {compareList.map((p) => <td key={p.id}><img src={p.image} alt={p.name} className="compare-img" /></td>)}
                  </tr>
                  <tr>
                    <td>Category</td>
                    {compareList.map((p) => <td key={p.id}><span className="product-category">{p.category}</span></td>)}
                  </tr>
                  <tr>
                    <td>Price</td>
                    {compareList.map((p) => <td key={p.id}><strong>Rs. {p.price.toFixed(2)}</strong></td>)}
                  </tr>
                  <tr>
                    <td>Description</td>
                    {compareList.map((p) => <td key={p.id}>{p.description}</td>)}
                  </tr>
                  <tr>
                    <td>Action</td>
                    {compareList.map((p) => (
                      <td key={p.id}>
                        <button type="button" className="primary-action" onClick={() => handleAddToCart(p)}>Add to Cart</button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </section>
      ) : null}

      {/* Compare floating bar */}
      {compareList.length > 0 && currentPage !== 'compare' && (
        <div className="compare-bar">
          <span>{compareList.length} product{compareList.length > 1 ? 's' : ''} selected</span>
          <div className="compare-bar__thumbs">
            {compareList.map((p) => <img key={p.id} src={p.image} alt={p.name} />)}
          </div>
          <button type="button" className="primary-action" onClick={() => setCurrentPage('compare')}>Compare Now</button>
          <button type="button" className="ghost-button" onClick={() => setCompareList([])}>Clear</button>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="container footer-grid">

            {/* Brand */}
            <div className="footer-brand">
              <div className="brand-mark">DH</div>
              <p>DigiHook is your one-stop marketplace for premium digital products. Buy, brand, and resell — keep 100% of the profits.</p>
              <div className="footer-socials">
                <a href="#" aria-label="UPI" title="UPI">
                  <svg viewBox="0 0 48 20" width="48" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="20" rx="4" fill="#fff"/>
                    <text x="50%" y="14" textAnchor="middle" fontSize="9" fontWeight="800" fill="#6B3FA0" fontFamily="Arial">UPI</text>
                  </svg>
                </a>
                <a href="#" aria-label="Visa" title="Visa">
                  <svg viewBox="0 0 48 20" width="48" height="20" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="20" rx="4" fill="#1A1F71"/>
                    <text x="50%" y="14" textAnchor="middle" fontSize="10" fontWeight="900" fill="#fff" fontFamily="Arial" letterSpacing="1">VISA</text>
                  </svg>
                </a>
                <a href="#" aria-label="Mastercard" title="Mastercard">
                  <svg viewBox="0 0 48 20" width="48" height="20" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="20" rx="4" fill="#252525"/>
                    <circle cx="18" cy="10" r="7" fill="#EB001B"/>
                    <circle cx="30" cy="10" r="7" fill="#F79E1B"/>
                    <path d="M24 4.8a7 7 0 0 1 0 10.4A7 7 0 0 1 24 4.8z" fill="#FF5F00"/>
                  </svg>
                </a>
                <a href="#" aria-label="Razorpay" title="Razorpay">
                  <svg viewBox="0 0 48 20" width="48" height="20" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="20" rx="4" fill="#2B6BE6"/>
                    <text x="50%" y="14" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#fff" fontFamily="Arial">Razorpay</text>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h5>Quick Links</h5>
              <ul>
                {[
                  { label: 'Home', page: 'home' },
                  { label: 'Shop', page: 'shop' },
                  { label: 'About Us', page: 'about' },
                  { label: 'Contact Us', page: 'contact' },
                  { label: 'Cart', page: 'cart' },
                ].map(({ label, page }) => (
                  <li key={page}><button type="button" onClick={() => setCurrentPage(page)}>{label}</button></li>
                ))}
              </ul>
            </div>

            {/* Policies */}
            <div className="footer-col">
              <h5>Policies</h5>
              <ul>
                {[
                  { label: 'Shipping & Delivery', page: 'shipping' },
                  { label: 'Refund Policy', page: 'refund' },
                  { label: 'Terms & Conditions', page: 'terms' },
                  { label: 'Cancellation & Refund', page: 'cancellation' },
                  { label: 'Privacy Policy', page: 'privacy' },
                ].map(({ label, page }) => (
                  <li key={page}><button type="button" onClick={() => setCurrentPage(page)}>{label}</button></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <h5>Contact Us</h5>
              <ul className="footer-contact-list">
                <li>📧 <span>support@digihook.example</span></li>
                <li>📞 <span>+1 (000) 000-0000</span></li>
                <li>🕐 <span>Mon – Sat, 10AM – 6PM</span></li>
                <li>🌍 <span>Worldwide Digital Delivery</span></li>
              </ul>
              <button type="button" className="footer-whatsapp" onClick={() => setCurrentPage('contact')}>
                💬 Join WhatsApp Group
              </button>
            </div>

          </div>
        </div>

        <div className="footer-bottom">
          <div className="container footer-bottom__inner">
            <p>© {new Date().getFullYear()} DigiHook. All rights reserved.</p>
            <p>Made with ❤️ for digital entrepreneurs worldwide.</p>
          </div>
        </div>
      </footer>

    </main>
  )
}

export default App





import React, { useState, useMemo } from 'react';
import { Search, Filter, ShoppingBag, SortAsc, SortDesc } from 'lucide-react';
import { MarketplaceCard } from '../components/MarketplaceCard';
import { DetailModal } from '../components/DetailModal';
import { PriceRangeFilter } from '../components/PriceRangeFilter';
import toast from 'react-hot-toast';

const CATEGORIES = ['All', 'History', 'Architecture', 'Memories', 'Travel', 'Education'];

const SORT_OPTIONS = [
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Most Viewed', value: 'views-desc' },
  { label: 'Latest', value: 'date-desc' },
];

const SAMPLE_DATA = [
  {
    id: 1,
    title: 'Historical World War II Documentation',
    description: 'Authentic footage and documents from WWII, verified by historians. Includes rare photographs, personal accounts, and official military records.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1587483166702-bf9aa66bd791?auto=format&fit=crop&q=80',
    category: 'History',
    author: 'Historical Archives',
    date: '2024-03-15',
    location: 'Europe',
    views: 1205
  },
  {
    id: 2,
    title: 'Ancient Rome Architecture Collection',
    description: 'Detailed 3D scans and documentation of Roman architecture. Features comprehensive analysis of construction techniques and architectural innovations.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80',
    price: 199.99,
    category: 'Architecture',
    author: 'Roman Heritage Institute',
    date: '2024-03-10',
    location: 'Rome, Italy',
    views: 856
  },
  {
    id: 3,
    title: 'Tokyo Travel Guide 2024',
    description: 'Comprehensive travel data and hidden gems of Tokyo. Includes local recommendations, cultural insights, and practical travel tips.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80',
    price: 49.99,
    category: 'Travel',
    author: 'Tokyo Explorers',
    date: '2024-03-20',
    location: 'Tokyo, Japan',
    views: 2341
  },
  {
    id: 4,
    title: 'University Life Collection 2023',
    description: 'A curated collection of memories and experiences from university students worldwide. Perfect for research and nostalgia.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80',
    price: 79.99,
    category: 'Memories',
    author: 'Global Campus Network',
    date: '2024-02-28',
    location: 'Global',
    views: 1876
  },
  {
    id: 5,
    title: 'Advanced Mathematics Course Bundle',
    description: 'Comprehensive mathematics course materials from top universities. Includes lecture notes, problem sets, and solution guides.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80',
    price: 149.99,
    category: 'Education',
    author: 'Math Excellence',
    date: '2024-03-18',
    location: 'Online',
    views: 3102
  }
];

export function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('date-desc');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedData = useMemo(() => {
    let filtered = SAMPLE_DATA.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = item.price >= minPrice && item.price <= maxPrice;
      return matchesCategory && matchesSearch && matchesPrice;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'views-desc':
          return (b.views || 0) - (a.views || 0);
        case 'date-desc':
          return new Date(b.date || '').getTime() - new Date(a.date || '').getTime();
        default:
          return 0;
      }
    });
  }, [selectedCategory, searchQuery, sortBy, minPrice, maxPrice]);

  const handlePurchase = async (id: number) => {
    setLoading(id);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Purchase successful! Check your Auzen vault.');
      setSelectedItem(null);
    } catch (error) {
      toast.error('Purchase failed. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-auzen-black to-auzen-black-light p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-auzen-gold">
            <ShoppingBag className="inline-block mr-2 mb-1" />
            Auzen Marketplace
          </h1>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search marketplace..."
                className="w-full pl-10 pr-4 py-2 bg-auzen-black-light text-white rounded-lg focus:ring-2 focus:ring-auzen-gold outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-auzen-black-light text-auzen-gold rounded-lg hover:bg-auzen-black-light/80 transition-colors"
              >
                <Filter className="w-5 h-5" />
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-auzen-black-light text-auzen-gold rounded-lg hover:bg-auzen-black-light/80 transition-colors outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {showFilters && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-200
                      ${selectedCategory === category
                        ? 'bg-auzen-gold text-auzen-black'
                        : 'bg-auzen-black-light text-auzen-gold hover:bg-auzen-black-light/80'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <PriceRangeFilter
                minPrice={minPrice}
                maxPrice={maxPrice}
                onMinChange={setMinPrice}
                onMaxChange={setMaxPrice}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedData.map(item => (
            <MarketplaceCard
              key={item.id}
              {...item}
              loading={loading === item.id}
              onPurchase={() => handlePurchase(item.id)}
              onViewDetails={() => setSelectedItem(item.id)}
            />
          ))}
        </div>

        {selectedItem && (
          <DetailModal
            item={SAMPLE_DATA.find(item => item.id === selectedItem)!}
            onClose={() => setSelectedItem(null)}
            onPurchase={() => handlePurchase(selectedItem)}
            loading={loading === selectedItem}
          />
        )}
      </div>
    </div>
  );
}
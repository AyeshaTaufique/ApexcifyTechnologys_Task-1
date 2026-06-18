// Change the import at the top:
import { motion } from 'motion/react';
import {
  ShoppingCart,
  Leaf,
  ShieldCheck,
  Truck,
  CreditCard,
  Phone,
  Mail,
  ChevronRight,
  Menu,
  Clock,
  Apple,
  Milk,
  Carrot,
  Coffee,
} from 'lucide-react';
import { useState } from 'react';

export default function Homepage({ onLoginClick, onRegisterClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="full-width-homepage">
      {/* Navigation */}
      <nav className="fixed w-full z-50 transition-all duration-300 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-2 rounded-xl text-white shadow-lg shadow-orange-500/30">
                <ShoppingCart size={24} />
              </div>
              <span className="font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400">
                FoodMart
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-slate-600 hover:text-orange-500 font-medium transition-colors">About</a>
              <a href="#services" className="text-slate-600 hover:text-orange-500 font-medium transition-colors">Services</a>
              <a href="#how-it-works" className="text-slate-600 hover:text-orange-500 font-medium transition-colors">How it Works</a>
              <a href="#products" className="text-slate-600 hover:text-orange-500 font-medium transition-colors">Products</a>
              <button 
                onClick={onLoginClick}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-medium transition-transform hover:scale-105 shadow-md shadow-orange-500/20 active:scale-95 cursor-pointer"
              >
                Login / Sign Up
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-orange-500 focus:outline-none"
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-100"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 text-center shadow-xl">
              <a href="#about" className="block px-3 py-3 text-slate-700 font-medium hover:bg-orange-50 rounded-lg">About</a>
              <a href="#services" className="block px-3 py-3 text-slate-700 font-medium hover:bg-orange-50 rounded-lg">Services</a>
              <a href="#how-it-works" className="block px-3 py-3 text-slate-700 font-medium hover:bg-orange-50 rounded-lg">How it Works</a>
              <a href="#products" className="block px-3 py-3 text-slate-700 font-medium hover:bg-orange-50 rounded-lg">Products</a>
              <button 
                onClick={onLoginClick}
                className="w-full px-3 py-3 mt-4 text-white font-medium bg-orange-500 hover:bg-orange-600 rounded-full shadow-md cursor-pointer"
              >
                Login / Sign Up
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center">
        {/* Animated Background Gradients & Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-orange-400/20 blur-[80px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-green-400/15 blur-[100px]" />
          
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] right-[15%] opacity-20"
          >
            <Apple size={64} className="text-orange-500" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} 
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[20%] right-[30%] opacity-20"
          >
            <Carrot size={72} className="text-green-500" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }} 
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[30%] left-[10%] opacity-20"
          >
            <Milk size={56} className="text-slate-400" />
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/80 text-orange-600 font-medium text-sm mb-8 backdrop-blur-md border border-orange-200"
            >
              <Leaf size={16} />
              <span>GroceriesToGo</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight"
            >
              Fresh Groceries <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">Delivered</span> to Your Doorstep
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-600 mb-4 max-w-2xl mx-auto leading-relaxed"
            >
              GroceriesToGo brings you fresh dairy products, kitchen essentials, and groceries with quality, care, and reliability.
            </motion.p>
            
            <motion.p
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.6, delay: 0.3 }}
               className="text-slate-500 font-medium mb-10 text-sm tracking-wide"
            >
              No delivery charges • Fresh guaranteed • Fast service
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a href="#services" className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-full font-medium transition-all hover:bg-slate-800 hover:shadow-lg hover:-translate-y-1">
                Explore Services
              </a>
              <button 
                onClick={onLoginClick}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-500 text-white rounded-full font-medium transition-all hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer"
              >
                Login / Sign Up <ChevronRight size={18} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="about" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-green-100 to-orange-50 rounded-3xl transform rotate-2"></div>
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" 
                  alt="Fresh groceries" 
                  className="relative rounded-2xl shadow-xl object-cover h-[500px] w-full"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating glass card */}
                <div className="absolute -bottom-6 -right-6 lg:bottom-10 lg:-right-10 bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/40 max-w-xs">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="bg-green-100 p-3 rounded-full text-green-600">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-lg">100% Fresh</p>
                      <p className="text-slate-500 text-sm">Quality Guaranteed</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-sm font-bold tracking-widest text-orange-500 uppercase mb-3">Who We Are</h2>
              <h3 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">Delivering Freshness to Your Community</h3>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                FoodMart is a modern grocery delivery platform focused on providing fresh dairy products and daily kitchen essentials directly to your home. We believe in quality, reliability, and convenience. Our goal is to simplify your daily shopping by delivering everything you need with just a few clicks.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                      <Truck size={20} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 mb-2">Our Mission</h4>
                    <p className="text-slate-600">To provide high-quality grocery products with zero delivery hassle and maximum convenience.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Leaf size={20} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 mb-2">Our Vision</h4>
                    <p className="text-slate-600">To become a trusted household name for grocery delivery by ensuring freshness, affordability, and reliability.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
             <h2 className="text-sm font-bold tracking-widest text-orange-500 uppercase mb-3">Our Offerings</h2>
             <h3 className="text-4xl font-extrabold text-slate-900 mb-6">Explore Our Services</h3>
             <p className="text-lg text-slate-600">Everything you need, carefully selected and quickly delivered.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Milk size={32} />, title: 'Fresh Dairy Products', desc: 'Milk, Butter, Cheese, Yogurt sourced daily.', color: 'from-blue-50 to-white', iconColor: 'text-blue-500', iconBg: 'bg-blue-100' },
              { icon: <Coffee size={32} />, title: 'Kitchen Essentials', desc: 'Premium Rice, Flour, Oil, and Sugar.', color: 'from-orange-50 to-white', iconColor: 'text-orange-500', iconBg: 'bg-orange-100' },
              { icon: <Apple size={32} />, title: 'Fresh Fruits & Vegetables', desc: 'Handpicked, farm-fresh organic produce.', color: 'from-green-50 to-white', iconColor: 'text-green-500', iconBg: 'bg-green-100' },
              { icon: <ShoppingCart size={32} />, title: 'Packaged Foods', desc: 'Top quality snacks and pantry items.', color: 'from-purple-50 to-white', iconColor: 'text-purple-500', iconBg: 'bg-purple-100' },
              { icon: <Leaf size={32} />, title: 'Juices & Beverages', desc: 'Refreshing juices and healthy drinks.', color: 'from-pink-50 to-white', iconColor: 'text-pink-500', iconBg: 'bg-pink-100' },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-8 rounded-3xl bg-gradient-to-b ${service.color} border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer`}
              >
                <div className={`w-16 h-16 rounded-2xl ${service.iconBg} ${service.iconColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h4>
                <p className="text-slate-600 leading-relaxed min-h-[48px]">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center max-w-3xl mx-auto mb-16">
             <h2 className="text-sm font-bold tracking-widest text-orange-500 uppercase mb-3">Why Choose Us</h2>
             <h3 className="text-4xl font-extrabold text-slate-900 mb-6">The FoodMart Advantage</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <ShieldCheck size={28}/>, title: 'Quality Assurance', desc: 'We ensure all products are fresh and verified', color: 'bg-emerald-50 text-emerald-600' },
              { icon: <Truck size={28}/>, title: 'Free Delivery', desc: 'No delivery charges on your orders', color: 'bg-orange-50 text-orange-600' },
              { icon: <Clock size={28}/>, title: 'Reliable Service', desc: 'On-time and consistent delivery', color: 'bg-blue-50 text-blue-600' },
              { icon: <ShoppingCart size={28}/>, title: 'Easy Ordering', desc: 'Simple and smooth user experience', color: 'bg-purple-50 text-purple-600' },
              { icon: <CreditCard size={28}/>, title: 'Secure Payments', desc: 'Safe and flexible payment options', color: 'bg-rose-50 text-rose-600' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-5 p-6 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
              >
                <div className={`p-4 rounded-2xl flex-shrink-0 ${feature.color}`}>
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-1">{feature.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-[100px]"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
             <h2 className="text-sm font-bold tracking-widest text-orange-400 uppercase mb-3">Simple Process</h2>
             <h3 className="text-4xl font-extrabold mb-6">How It Works</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center relative">
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-orange-500/0 via-orange-500/50 to-orange-500/0 -z-10"></div>

            {[
              { step: '01', title: 'Login or Register' },
              { step: '02', title: 'Browse Products' },
              { step: '03', title: 'Select Items' },
              { step: '04', title: 'Choose Payment' },
              { step: '05', title: 'Confirm Order' },
              { step: '06', title: 'Get Delivery' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full bg-slate-800/80 backdrop-blur-md border border-slate-700 flex items-center justify-center text-2xl font-bold font-mono text-orange-400 mb-6 shadow-xl relative group">
                  {item.step}
                  <div className="absolute inset-0 rounded-full border-2 border-orange-500/0 group-hover:border-orange-500/100 transition-colors duration-300 scale-110"></div>
                </div>
                <h4 className="text-sm font-medium text-slate-300 px-2 leading-tight">{item.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS PREVIEW */}
      <section id="products" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
             <h2 className="text-sm font-bold tracking-widest text-orange-500 uppercase mb-3">Sneak Peek</h2>
             <h3 className="text-4xl font-extrabold text-slate-900 mb-6">Popular Categories</h3>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: '🥛', name: 'Milk' },
              { icon: '🍞', name: 'Bread' },
              { icon: '🧈', name: 'Butter' },
              { icon: '🧀', name: 'Cheese' },
              { icon: '🍎', name: 'Fruits' },
              { icon: '🥦', name: 'Vegetables' },
              { icon: '🧃', name: 'Juices' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white px-8 py-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center min-w-[140px] cursor-pointer"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h4 className="font-semibold text-slate-700">{item.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG / TIPS SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
               <h2 className="text-sm font-bold tracking-widest text-orange-500 uppercase mb-3">Insights</h2>
               <h3 className="text-4xl font-extrabold text-slate-900">Healthy Living & Food Tips</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "How to Keep Dairy Products Fresh Longer", 
                img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
                cat: "Dairy Tips"
              },
              { 
                title: "Top 10 Healthy Grocery Essentials", 
                img: "https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=600&q=80",
                cat: "Nutrition"
              },
              { 
                title: "Cook Healthy Food", 
                img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80",
                cat: "Organization"
              }
            ].map((post, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden rounded-3xl mb-6 relative aspect-[4/3]">
                  <img 
                    src={post.img} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-orange-600">
                    {post.cat}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <div className="flex items-center text-orange-500 font-medium text-sm mt-3">
                  Read Article <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-orange-400"></div>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-8"
          >
            Start Your Fresh Journey Today
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button 
              onClick={onLoginClick}
              className="inline-flex items-center gap-2 bg-white text-orange-600 px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-transform active:scale-95 cursor-pointer"
            >
              Login / Sign Up <ChevronRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-12">
            
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-orange-500 p-1.5 rounded-lg text-white">
                  <ShoppingCart size={20} />
                </div>
                <span className="font-bold text-xl text-white">
                  FoodMart
                </span>
              </div>
              <p className="text-slate-400 mb-6 max-w-sm">
                FoodMart — Freshness You Can Trust. Delivering quality groceries right to your doorstep with care and dedication.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-4">
                <li><a href="#about" className="hover:text-orange-400 transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-orange-400 transition-colors">Services</a></li>
                <li><a href="#how-it-works" className="hover:text-orange-400 transition-colors">How it Works</a></li>
                <li><a href="#products" className="hover:text-orange-400 transition-colors">Products Preview</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail size={18} className="text-orange-500 mt-1 flex-shrink-0" />
                  <span>support@foodmart.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={18} className="text-orange-500 mt-1 flex-shrink-0" />
                  <span>+92-300-1234567</span>
                </li>
              </ul>
            </div>

          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {new Date().getFullYear()} FoodMart. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  Users, 
  MapPin, 
  Shield, 
  Clock, 
  Heart, 
  Stethoscope,
  Ambulance,
  Building2,
  Award,
  Phone,
  Mail,
  CheckCircle,
  Star,
  ArrowRight,
  Play
} from 'lucide-react';
import Button from '../components/UI/Button';

const Landing: React.FC = () => {
  const stats = [
    { label: 'Hospitals Connected', value: '150+', icon: Building2 },
    { label: 'Patients Served', value: '50K+', icon: Users },
    { label: 'Emergency Responses', value: '10K+', icon: Ambulance },
    { label: 'Success Rate', value: '99.8%', icon: Award }
  ];

  const features = [
    {
      icon: Clock,
      title: 'Real-time Tracking',
      description: 'Monitor bed availability, wait times, and facility status in real-time across all hospital departments.',
      color: 'blue'
    },
    {
      icon: MapPin,
      title: 'Smart Navigation',
      description: 'Help patients find the best hospitals and assist EMS teams with optimal routing for emergency response.',
      color: 'green'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Role-based access control ensures data security while maintaining system reliability for critical healthcare operations.',
      color: 'red'
    },
    {
      icon: Stethoscope,
      title: 'Medical Integration',
      description: 'Seamlessly integrate with existing hospital management systems and medical equipment.',
      color: 'purple'
    },
    {
      icon: Heart,
      title: 'Patient Care Focus',
      description: 'Prioritize patient outcomes with intelligent bed allocation and care coordination.',
      color: 'pink'
    },
    {
      icon: Ambulance,
      title: 'Emergency Response',
      description: 'Optimize emergency response times with real-time hospital capacity and route planning.',
      color: 'orange'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      hospital: 'City General Hospital',
      content: 'HealthDash has revolutionized our bed management system. We\'ve reduced wait times by 40% and improved patient satisfaction significantly.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'EMS Coordinator',
      hospital: 'Metro Emergency Services',
      content: 'The real-time hospital data helps us make critical decisions faster. Our response efficiency has improved dramatically.',
      rating: 5
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Patient',
      hospital: 'St. Mary Medical Center',
      content: 'Finding the right hospital with available beds used to be stressful. Now I can see everything I need in one place.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background */}
      <div 
        className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.8), rgba(30, 64, 175, 0.8)), url('https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center text-white">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <Activity className="h-20 w-20 text-white" />
              </div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Hospital Dashboard
              <span className="block text-blue-200">System</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              Revolutionizing healthcare operations with intelligent bed tracking, 
              real-time facility management, and seamless emergency response coordination.
            </p>

            {/* Login Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              {/* <Link to="/login/admin" className="group">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <Users className="h-12 w-12 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Hospital Admin</h3>
                  <p className="text-blue-100 text-sm mb-4">Manage beds, facilities & operations</p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Login as Admin
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Link> */}

              {/* <Link to="/login/patient" className="group">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <Heart className="h-12 w-12 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Patient Portal</h3>
                  <p className="text-blue-100 text-sm mb-4">Find hospitals & check availability</p>
                  <Button variant="success" className="w-full">
                    Login
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Link> */}

              {/* <Link to="/login/ems" className="group">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <Shield className="h-12 w-12 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">EMS Services</h3>
                  <p className="text-blue-100 text-sm mb-4">Emergency response & routing</p>
                  <Button variant="danger" className="w-full">
                    Login as EMS
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Link> */}
            </div>

            {/* Demo Video Button */}
            {/* <div className="flex justify-center">
              <button className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-8 py-4 hover:bg-white/20 transition-all duration-300">
                <Play className="h-6 w-6 text-white" />
                <span className="text-white font-medium">Watch Demo Video</span>
              </button>
            </div> */}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Healthcare Professionals</h2>
            <p className="text-xl text-gray-600">Making a difference in healthcare delivery across the nation</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <stat.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Healthcare Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides everything you need to streamline healthcare operations 
              and improve patient outcomes through technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full">
                  <div className={`inline-flex p-4 rounded-xl mb-6 bg-${feature.color}-100`}>
                    <feature.icon className={`h-8 w-8 text-${feature.color}-600`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div 
        className="py-20 bg-gradient-to-r from-blue-600 to-blue-800"
        style={{
          backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.9), rgba(29, 78, 216, 0.9)), url('https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Users Say</h2>
            <p className="text-xl text-blue-100">Real feedback from healthcare professionals using HealthDash</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="border-t border-white/20 pt-4">
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-blue-200 text-sm">{testimonial.role}</div>
                  <div className="text-blue-300 text-sm">{testimonial.hospital}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Healthcare Operations?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of healthcare professionals who trust HealthDash for their daily operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started Today
            </Button>
            <Button size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>

      {/* About & Contact Section */}
      <div id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About HealthDash</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                HealthDash is a comprehensive hospital management system designed to improve 
                healthcare delivery through technology. Our platform connects hospitals, 
                patients, and emergency services to ensure efficient, coordinated care.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Founded by healthcare professionals and technology experts, we understand 
                the unique challenges facing modern healthcare systems and provide solutions 
                that make a real difference in patient outcomes.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">24/7 System Reliability</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">HIPAA Compliant Security</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">Real-time Data Integration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">Expert Support Team</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">info@healthdash.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">123 Healthcare Ave<br />Medical District, City 12345</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-4">Business Hours:</p>
                <p className="text-gray-700">Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p className="text-gray-700">Emergency Support: 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
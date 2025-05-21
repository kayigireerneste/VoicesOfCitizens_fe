import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'rw';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.submit': 'Submit Complaint',
    'nav.track': 'Track Complaint',
    'nav.login': 'Login',
    
    // Hero Section
    'hero.title': 'Voice of Citizens',
    'hero.subtitle': 'Your voice matters. Submit feedback on public services and help improve governance in Rwanda.',
    'hero.submit': 'Submit Complaint',
    'hero.track': 'Track Complaint',
    
    // Stats
    'stats.resolved': 'Complaints Resolved',
    'stats.response': 'Average Response',
    'stats.satisfaction': 'Citizen Satisfaction',
    'stats.resolved.desc': 'Successfully resolved citizen complaints',
    'stats.response.desc': 'Average time to initial response',
    'stats.satisfaction.desc': 'Citizens satisfied with resolution',
    
    // Features
    'features.title': 'How It Works',
    'features.submit.title': 'Submit Feedback',
    'features.submit.desc': 'Fill out our simple form with details about your experience with public services.',
    'features.track.title': 'Track Progress',
    'features.track.desc': 'Follow the status of your submission with the provided tracking number.',
    'features.resolve.title': 'Get Resolution',
    'features.resolve.desc': 'Receive updates and resolution information directly from government agencies.',
    
    // Categories
    'categories.title': 'Service Categories',
    'categories.subtitle': 'We handle feedback across a wide range of public services to ensure your voice reaches the right department.',
    'categories.infrastructure': 'Infrastructure',
    'categories.infrastructure.desc': 'Roads, bridges, public buildings, and facilities',
    'categories.healthcare': 'Healthcare',
    'categories.healthcare.desc': 'Hospitals, clinics, and medical services',
    'categories.education': 'Education',
    'categories.education.desc': 'Schools, universities, and educational programs',
    'categories.utilities': 'Utilities',
    'categories.utilities.desc': 'Water, electricity, and waste management',
    'categories.transport': 'Transportation',
    'categories.transport.desc': 'Public transit, traffic management',
    'categories.admin': 'Administrative Services',
    'categories.admin.desc': 'Documents, permits, and certificates',
    
    // CTA
    'cta.title': 'Ready to Make Your Voice Heard?',
    'cta.subtitle': 'Join thousands of citizens who are helping to improve public services through their valuable feedback.',
    'cta.button': 'Submit Now',
    
    // Footer
    'footer.about': 'Empowering citizens to engage with government services through feedback and transparent communication.',
    'footer.quickLinks': 'Quick Links',
    'footer.govLinks': 'Government Links',
    'footer.contact': 'Contact Us',
    'footer.rights': 'All rights reserved.',

    // login
    'login.welcomeBack': 'Welcome Back',
    'login.createAccount': 'Create an Account',
    'login.loginToDashboard': 'Log in to access the admin dashboard',
    'login.signupToManage': 'Sign up to manage complaints and provide feedback',
    'login.email': 'Email Address',
    'login.emailPlaceholder': 'Enter your email',
    'login.password': 'Password',
    'login.passwordPlaceholder': 'Enter your password',
    'login.confirmPassword': 'Confirm Password',
    'login.confirmPasswordPlaceholder': 'Confirm your password',
    'login.rememberMe': 'Remember me',
    'login.forgotPassword': 'Forgot password?',
    'login.loginBtn': 'Log In',
    'login.createAccountBtn': 'Create Account',
    'login.signup': 'Sign up',
    'login.noAccount': "Don't have an account?",
    'login.haveAccount': 'Already have an account?',
    'login.success': 'Login successful',
    'login.failed': 'Login failed',
    'login.registerSuccess': 'Account created successfully',
    'login.registerFailed': 'Registration failed',
    'login.loggingIn': 'Logging in...',
    'login.creatingAccount': 'Creating account...',
    'login.error.emailRequired': 'Email is required',
    'login.error.emailInvalid': 'Please enter a valid email address',
    'login.error.passwordRequired': 'Password is required',
    'login.error.passwordShort': 'Password must be at least 6 characters',
    'login.error.passwordsNoMatch': 'Passwords do not match',

    // Submit Complaint Page
    'submit.title': 'Submit a Complaint',
    'submit.subtitle': 'Help us improve public services by sharing your experience',
    'submit.info': 'Your contact information helps us follow up on your complaint. If you prefer to remain anonymous, check the anonymous option below.',
    'submit.anonymous': "Submit anonymously (you won't receive updates on your complaint)",
    'submit.anonymousShort': 'Submitting anonymously',
    'submit.fullName': 'Full Name',
    'submit.fullNamePlaceholder': 'Enter your full name',
    'submit.phone': 'Phone Number',
    'submit.phonePlaceholder': 'e.g. +250 788 123 456',
    'submit.email': 'Email Address (Optional)',
    'submit.emailPlaceholder': 'Enter your email address',

    'submit.categoryInfo': 'Categorizing your complaint correctly helps route it to the appropriate government agency.',
    'submit.category': 'Category',
    'submit.selectCategory': 'Select a category',
    'submit.subcategory': 'Subcategory',
    'submit.selectSubcategory': 'Select a subcategory',
    'submit.location': 'Location',
    'submit.locationPlaceholder': 'e.g. Kigali, Gasabo District, Kimironko Sector',
    'submit.locationInfo': 'Please be as specific as possible about the location of the issue',

    'submit.descriptionInfo': 'Provide a detailed description of the issue and attach any evidence (photos, documents) if available.',
    'submit.description': 'Description',
    'submit.descriptionPlaceholder': 'Please describe the issue in detail...',
    'submit.descriptionHint': 'Include relevant details such as when the issue occurred, who was involved, and any previous attempts to resolve it',
    'submit.attachments': 'Attachments (Optional)',
    'submit.dragDrop': 'Drag and drop files here, or',
    'submit.browse': 'browse',
    'submit.fileInfo': 'JPG, PNG or PDF up to 10MB',
    'submit.attachedFiles': 'Attached Files:',

    'submit.reviewInfo': "Please review your complaint details below. Once submitted, you'll receive a tracking number to check the status.",
    'submit.step1': 'Personal Information',
    'submit.step2': 'Complaint Details',
    'submit.step3': 'Description & Evidence',
    'submit.step4': 'Review & Submit',

    'submit.previous': 'Previous',
    'submit.next': 'Next',
    'submit.submitBtn': 'Submit Complaint',
    'submit.submitting': 'Submitting...',
    'submit.success': 'Complaint submitted successfully!',
    'submit.error.general': 'Something went wrong. Please try again.',

    // Categories and subcategories (for translation keys)
    'submit.category.infrastructure': 'Infrastructure',
    'submit.category.healthcare': 'Healthcare',
    'submit.category.education': 'Education',
    'submit.category.utilities': 'Utilities',
    'submit.category.transportation': 'Transportation',
    'submit.category.administrative': 'Administrative Services',

    'submit.subcategory.roads': 'Roads',
    'submit.subcategory.bridges': 'Bridges',
    'submit.subcategory.publicBuildings': 'Public Buildings',
    'submit.subcategory.drainage': 'Drainage',
    'submit.subcategory.streetLighting': 'Street Lighting',
    'submit.subcategory.hospitals': 'Hospitals',
    'submit.subcategory.healthCenters': 'Health Centers',
    'submit.subcategory.medicalStaff': 'Medical Staff',
    'submit.subcategory.medicalSupplies': 'Medical Supplies',
    'submit.subcategory.ambulanceServices': 'Ambulance Services',
    'submit.subcategory.schools': 'Schools',
    'submit.subcategory.universities': 'Universities',
    'submit.subcategory.teachers': 'Teachers',
    'submit.subcategory.educationalMaterials': 'Educational Materials',
    'submit.subcategory.schoolFacilities': 'School Facilities',
    'submit.subcategory.waterSupply': 'Water Supply',
    'submit.subcategory.electricity': 'Electricity',
    'submit.subcategory.wasteManagement': 'Waste Management',
    'submit.subcategory.sewage': 'Sewage',
    'submit.subcategory.internetServices': 'Internet Services',
    'submit.subcategory.publicTransit': 'Public Transit',
    'submit.subcategory.trafficManagement': 'Traffic Management',
    'submit.subcategory.parking': 'Parking',
    'submit.subcategory.roadSafety': 'Road Safety',
    'submit.subcategory.publicTransportFacilities': 'Public Transport Facilities',
    'submit.subcategory.documentProcessing': 'Document Processing',
    'submit.subcategory.permits': 'Permits',
    'submit.subcategory.certificates': 'Certificates',
    'submit.subcategory.governmentOffices': 'Government Offices',
    'submit.subcategory.publicServiceDelivery': 'Public Service Delivery',

    // Validation errors
    'submit.error.nameRequired': 'Name is required',
    'submit.error.phoneRequired': 'Phone number is required',
    'submit.error.phoneInvalid': 'Please enter a valid phone number',
    'submit.error.emailInvalid': 'Please enter a valid email address',
    'submit.error.categoryRequired': 'Please select a category',
    'submit.error.subcategoryRequired': 'Please select a subcategory',
    'submit.error.locationRequired': 'Location is required',
    'submit.error.descriptionRequired': 'Description is required',
    'submit.error.descriptionShort': 'Description should be at least 20 characters',

    //TrackComplaint page 
    'track.error.id': 'please enter a tracking number',
    'track.title': 'Track Your Complaint',
    'track.subtitle': 'Enter your tracking ID to see the status and updates on your submitted complaint',
    'track.input.placeholder': 'Enter tracking ID (e.g. CMP-123456)',
    'track.button.loading': 'Searching...',
    'track.button.submit': 'Track',
  },
  rw: {
    // Navigation
    'nav.home': 'Ahabanza',
    'nav.submit': 'Tanga Ikibazo',
    'nav.track': 'Kurikirana Ikibazo',
    'nav.login': 'Injira',
    
    // Hero Section
    'hero.title': 'Ijwi ry\'Abaturage',
    'hero.subtitle': 'Ijwi ryawe rirafite agaciro. Tanga ibitekerezo ku mirimo ya Leta kandi ufashe guteza imbere imiyoborere mu Rwanda.',
    'hero.submit': 'Tanga Ikibazo',
    'hero.track': 'Kurikirana Ikibazo',
    
    // Stats
    'stats.resolved': 'Ibibazo Byakemutse',
    'stats.response': 'Igihe cyo Gusubiza',
    'stats.satisfaction': 'Kunyurwa kw\'Abaturage',
    'stats.resolved.desc': 'Ibibazo by\'abaturage byakemutse neza',
    'stats.response.desc': 'Igihe gisanzwe cyo gutanga igisubizo',
    'stats.satisfaction.desc': 'Abaturage banyuzwe n\'ibisubizo',
    
    // Features
    'features.title': 'Uko Bikora',
    'features.submit.title': 'Tanga Ibitekerezo',
    'features.submit.desc': 'Uzuza urupapuro rworoshye ushyiremo ibisobanuro ku byerekeye uburyo wahuye n\'imirimo ya Leta.',
    'features.track.title': 'Kurikirana Iterambere',
    'features.track.desc': 'Kurikirana aho igitekerezo cyawe kigeze ukoresheje nomero yawe yo gukurikirana.',
    'features.resolve.title': 'Kubona Igisubizo',
    'features.resolve.desc': 'Kubona amakuru n\'ibisubizo biturutse ku nzego za Leta.',
    
    // Categories
    'categories.title': 'Ibyiciro by\'Imirimo',
    'categories.subtitle': 'Dukurikirana ibitekerezo ku mirimo itandukanye ya Leta kugira ngo ijwi ryawe rigere ku ishami ribigenewe.',
    'categories.infrastructure': 'Ibikorwa remezo',
    'categories.infrastructure.desc': 'Imihanda, ibiraro, inyubako za Leta, n\'ibikoresho',
    'categories.healthcare': 'Ubuzima',
    'categories.healthcare.desc': 'Ibitaro, ibigo nderabuzima, na serivisi z\'ubuvuzi',
    'categories.education': 'Uburezi',
    'categories.education.desc': 'Amashuri, za kaminuza, na gahunda z\'uburezi',
    'categories.utilities': 'Ibikoresho',
    'categories.utilities.desc': 'Amazi, umuriro, n\'imicungire y\'imyanda',
    'categories.transport': 'Gutwara Abantu n\'Ibintu',
    'categories.transport.desc': 'Gutwara rubanda, gucunga umuhanda',
    'categories.admin': 'Serivisi z\'Ubuyobozi',
    'categories.admin.desc': 'Inyandiko, impushya, n\'ibyemezo',
    
    // CTA
    'cta.title': 'Witeguye Kugira Ijwi Ryawe Ryumvikane?',
    'cta.subtitle': 'Wifatanye n\'ibihumbi by\'abaturage bafasha guteza imbere serivisi za Leta binyuze mu bitekerezo byabo bifite agaciro.',
    'cta.button': 'Tanga Nonaha',
    
    // Footer
    'footer.about': 'Guha abaturage ububasha bwo kugira uruhare muri serivisi za Leta binyuze mu bitekerezo no mu itumanaho risobanutse.',
    'footer.quickLinks': 'Aho Ugana Vuba',
    'footer.govLinks': 'Aho Ugana Leta',
    'footer.contact': 'Twandikire',
    'footer.rights': 'Uburenganzira bwose bwahawe.',

    // login
    'login.welcomeBack': 'Ikaze Ugarutse',
    'login.createAccount': 'Fungura Konti',
    'login.loginToDashboard': 'Injira kugira ngo ubone urubuga rw’abayobozi',
    'login.signupToManage': 'Iyandikishe kugira ngo ushobore gucunga ibirego no gutanga ibitekerezo',
    'login.email': 'Aderesi Imeyili',
    'login.emailPlaceholder': 'Andika imeyili yawe',
    'login.password': 'Ijambobanga',
    'login.passwordPlaceholder': 'Andika ijambobanga ryawe',
    'login.confirmPassword': 'Emeza Ijambobanga',
    'login.confirmPasswordPlaceholder': 'Emeza ijambobanga ryawe',
    'login.rememberMe': 'Nyibuka',
    'login.forgotPassword': 'Wibagiwe ijambobanga?',
    'login.loginBtn': 'Injira',
    'login.createAccountBtn': 'Fungura Konti',
    'login.signup': 'Iyandikishe',
    'login.noAccount': 'Nta konti ufite?',
    'login.haveAccount': 'Ufite konti isanzwe?',
    'login.success': 'Winjiye neza',
    'login.failed': 'Kwinjira byanze',
    'login.registerSuccess': 'Konti yashinzwe neza',
    'login.registerFailed': 'Iyandikwa byanze',
    'login.loggingIn': 'Turimo kukwinjiza...',
    'login.creatingAccount': 'Turimo gufungura konti...',
    'login.error.emailRequired': 'Imeyili irakenewe',
    'login.error.emailInvalid': 'Andika aderesi y’imeyili yujuje ibisabwa',
    'login.error.passwordRequired': 'Ijambobanga rirakenewe',
    'login.error.passwordShort': 'Ijambobanga rigomba kuba nibura rigizwe n’inyuguti 6',
    'login.error.passwordsNoMatch': 'Ijambobanga ntabwo rihura',

    // Submit Complaint Page
    'submit.title': 'Tanga Ikirego',
    'submit.subtitle': 'Dufashe kunoza serivisi rusange utugezaho uko byagenze',
    'submit.info': 'Amakuru yawe atuma tubasha kugukurikirana ku birego watanze. Niba ushaka kuguma mu ibanga, shyiraho uburyo bwo gutanga ikirego utigaragaje.',
    'submit.anonymous': "Tanga ikirego utigaragaje (ntuzabona amakuru ku iterambere ryacyo)",
    'submit.anonymousShort': 'Urimo gutanga ikirego utigaragaje',
    'submit.fullName': 'Amazina Yombi',
    'submit.fullNamePlaceholder': 'Andika amazina yawe yose',
    'submit.phone': 'Numero ya Telefone',
    'submit.phonePlaceholder': 'urugero: +250 788 123 456',
    'submit.email': 'Aderesi Imeyili (Si itegeko)',
    'submit.emailPlaceholder': 'Andika aderesi yawe ya imeyili',

    'submit.categoryInfo': 'Gushyira ikirego mu cyiciro gikwiye bituma kijya aho kibereye mu nzego za Leta.',
    'submit.category': 'Icyiciro',
    'submit.selectCategory': 'Hitamo icyiciro',
    'submit.subcategory': 'Icyiciro Cyihariye',
    'submit.selectSubcategory': 'Hitamo icyiciro cyihariye',
    'submit.location': 'Aho byabereye',
    'submit.locationPlaceholder': 'urugero: Kigali, Akarere ka Gasabo, Umurenge wa Kimironko',
    'submit.locationInfo': 'Gerageza gutanga amakuru ahagije ku hantu ikibazo cyabereye',

    'submit.descriptionInfo': 'Tanga ibisobanuro birambuye ku kibazo ndetse n’ibimenyetso (amafoto, inyandiko) niba bihari.',
    'submit.description': 'Ibisobanuro',
    'submit.descriptionPlaceholder': 'Sobanura ikibazo mu buryo burambuye...',
    'submit.descriptionHint': 'Shyiramo ibisobanuro birimo igihe byabereye, abari babigizemo uruhare, n’inzego wagezeho mbere ushaka igisubizo',
    'submit.attachments': 'Inyongera (Si itegeko)',
    'submit.dragDrop': 'Kuruza cyangwa ukurure inyandiko hano, cyangwa',
    'submit.browse': 'shakisha',
    'submit.fileInfo': 'JPG, PNG cyangwa PDF kugeza kuri 10MB',
    'submit.attachedFiles': 'Inyandiko zamaze kwiyongera:',

    'submit.reviewInfo': "Sobanukirwa neza ibyo watanze mbere yo kubyohereza. Nyuma yo kubitanga, uzahabwa nimero yo gukurikirana aho bigeze.",
    'submit.step1': 'Amakuru Y’umuntu',
    'submit.step2': 'Ibisobanuro by’Ikirego',
    'submit.step3': 'Ibisobanuro & Ibimenyetso',
    'submit.step4': 'Reba & Ohereza',

    'submit.previous': 'Icyabanje',
    'submit.next': 'Ikikurikira',
    'submit.submitBtn': 'Ohereza Ikirego',
    'submit.submitting': 'Birimo koherezwa...',
    'submit.success': 'Ikirego cyoherejwe neza!',
    'submit.error.general': 'Habaye ikibazo. Ongera ugerageze.',

    // Categories and subcategories
    'submit.category.infrastructure': 'Ibikorwaremezo',
    'submit.category.healthcare': 'Ubuvuzi',
    'submit.category.education': 'Uburezi',
    'submit.category.utilities': 'Serivisi z’ibanze',
    'submit.category.transportation': 'Ubwikorezi',
    'submit.category.administrative': 'Serivisi za Leta',

    'submit.subcategory.roads': 'Imihanda',
    'submit.subcategory.bridges': 'Ibiraro',
    'submit.subcategory.publicBuildings': 'Inyubako rusange',
    'submit.subcategory.drainage': 'Imiyoboro y’amazi',
    'submit.subcategory.streetLighting': 'Urumuri rwo mu mihanda',
    'submit.subcategory.hospitals': 'Ibitaro',
    'submit.subcategory.healthCenters': 'Ibigo nderabuzima',
    'submit.subcategory.medicalStaff': 'Abakozi b’ubuvuzi',
    'submit.subcategory.medicalSupplies': 'Ibikoresho by’ubuvuzi',
    'submit.subcategory.ambulanceServices': 'Serivisi z’imbangukiragutabara',
    'submit.subcategory.schools': 'Amashuri abanza n’ayisumbuye',
    'submit.subcategory.universities': 'Kaminuza',
    'submit.subcategory.teachers': 'Abarezi',
    'submit.subcategory.educationalMaterials': 'Ibikoresho by’amasomo',
    'submit.subcategory.schoolFacilities': 'Ibikoresho byo mu mashuri',
    'submit.subcategory.waterSupply': 'Itangwa ry’amazi',
    'submit.subcategory.electricity': 'Amashanyarazi',
    'submit.subcategory.wasteManagement': 'Imicungire y’imyanda',
    'submit.subcategory.sewage': 'Imiyoboro y’amazi mabi',
    'submit.subcategory.internetServices': 'Serivisi z’Internet',
    'submit.subcategory.publicTransit': 'Ubwikorezi rusange',
    'submit.subcategory.trafficManagement': 'Imicungire y’umuvuduko',
    'submit.subcategory.parking': 'Ahaparikwa imodoka',
    'submit.subcategory.roadSafety': 'Umutekano wo mu mihanda',
    'submit.subcategory.publicTransportFacilities': 'Ibikoresho by’ubwikorezi rusange',
    'submit.subcategory.documentProcessing': 'Gutunganya inyandiko',
    'submit.subcategory.permits': 'Impushya',
    'submit.subcategory.certificates': 'Ibyemezo',
    'submit.subcategory.governmentOffices': 'Ibiro bya Leta',
    'submit.subcategory.publicServiceDelivery': 'Itangwa rya serivisi rusange',

    // Validation errors
    'submit.error.nameRequired': 'Amazina arakenewe',
    'submit.error.phoneRequired': 'Numero ya telefone irakenewe',
    'submit.error.phoneInvalid': 'Andika numero ya telefone yujuje ibisabwa',
    'submit.error.emailInvalid': 'Andika aderesi ya email yujuje ibisabwa',
    'submit.error.categoryRequired': 'Hitamo icyiciro',
    'submit.error.subcategoryRequired': 'Hitamo icyiciro cyihariye',
    'submit.error.locationRequired': 'Aho byabereye birakenewe',
    'submit.error.descriptionRequired': 'Ibisobanuro birakenewe',
    'submit.error.descriptionShort': 'Ibisobanuro bigomba kuba nibura bigizwe n’inyuguti 20',

    //TrackComplaint page 
    'track.error.id': 'andikamo nimero yo gukurikirana',
    'track.title': 'Kurikira Ikibazo Cyawe',
    'track.subtitle': 'Injiza nimero yo gukurikirana kugira ngo urebe aho ikibazo cyawe kigeze n’amakuru mashya',
    'track.input.placeholder': 'Andika nimero yo gukurikirana (urugero: CMP-123456)',
    'track.button.loading': 'Birashakishwa...',
    'track.button.submit': 'Shaka',
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language');
    return (savedLang as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);


  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Upload, MapPin, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { useApp } from '../contexts/AppContext';

type FormData = {
  name: string;
  phone: string;
  email: string;
  category: string;
  subcategory: string;
  location: string;
  description: string;
  files: FileList | null;
  anonymous: boolean;
};

const categories = [
  { 
    id: 'infrastructure', 
    nameKey: 'submit.category.infrastructure',
    subcategories: [
      'submit.subcategory.roads',
      'submit.subcategory.bridges',
      'submit.subcategory.publicBuildings',
      'submit.subcategory.drainage',
      'submit.subcategory.streetLighting'
    ]
  },
  { 
    id: 'healthcare', 
    nameKey: 'submit.category.healthcare',
    subcategories: [
      'submit.subcategory.hospitals',
      'submit.subcategory.healthCenters',
      'submit.subcategory.medicalStaff',
      'submit.subcategory.medicalSupplies',
      'submit.subcategory.ambulanceServices'
    ]
  },
  { 
    id: 'education', 
    nameKey: 'submit.category.education',
    subcategories: [
      'submit.subcategory.schools',
      'submit.subcategory.universities',
      'submit.subcategory.teachers',
      'submit.subcategory.educationalMaterials',
      'submit.subcategory.schoolFacilities'
    ]
  },
  { 
    id: 'utilities', 
    nameKey: 'submit.category.utilities',
    subcategories: [
      'submit.subcategory.waterSupply',
      'submit.subcategory.electricity',
      'submit.subcategory.wasteManagement',
      'submit.subcategory.sewage',
      'submit.subcategory.internetServices'
    ]
  },
  { 
    id: 'transportation', 
    nameKey: 'submit.category.transportation',
    subcategories: [
      'submit.subcategory.publicTransit',
      'submit.subcategory.trafficManagement',
      'submit.subcategory.parking',
      'submit.subcategory.roadSafety',
      'submit.subcategory.publicTransportFacilities'
    ]
  },
  { 
    id: 'administrative', 
    nameKey: 'submit.category.administrative',
    subcategories: [
      'submit.subcategory.documentProcessing',
      'submit.subcategory.permits',
      'submit.subcategory.certificates',
      'submit.subcategory.governmentOffices',
      'submit.subcategory.publicServiceDelivery'
    ]
  }
];

const sendConfirmationEmail = async (email: string, trackingNumber: string, complaintData: FormData) => {
  try {
    const emailData = {
      to: email,
      subject: `Complaint Submitted Successfully - Tracking ID: ${trackingNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h2 style="color: #2d3748; margin-bottom: 20px;">Complaint Submitted Successfully</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
              <h3 style="color: #38b2ac; margin-bottom: 15px;">Tracking Information</h3>
              <p style="font-size: 18px; font-weight: bold; color: #2d3748;">
                Complaint ID: <span style="color: #38b2ac;">${trackingNumber}</span>
              </p>
              <p style="color: #4a5568; margin-bottom: 10px;">
                Please save this tracking number to check the status of your complaint.
              </p>
            </div>

            <div style="background-color: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
              <h3 style="color: #38b2ac; margin-bottom: 15px;">Complaint Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #4a5568; font-weight: bold;">Category:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #2d3748;">${complaintData.category}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #4a5568; font-weight: bold;">Subcategory:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #2d3748;">${complaintData.subcategory}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #4a5568; font-weight: bold;">Location:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #2d3748;">${complaintData.location}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #4a5568; font-weight: bold;">Submitted:</td>
                  <td style="padding: 8px 0; color: #2d3748;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
            </div>

            <div style="background-color: #e6fffa; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
              <h3 style="color: #234e52; margin-bottom: 10px;">What Happens Next?</h3>
              <ul style="color: #234e52; margin: 0; padding-left: 20px;">
                <li>Your complaint has been logged in our system</li>
                <li>It will be reviewed by the appropriate department</li>
                <li>You will receive updates on the progress via email</li>
                <li>Expected response time: 3-5 business days</li>
              </ul>
            </div>

            <div style="text-align: center; padding: 20px 0;">
              <p style="color: #4a5568; margin-bottom: 10px;">
                You can track your complaint status anytime using your tracking ID.
              </p>
              <a href="${window.location.origin}/track?id=${trackingNumber}" 
                 style="background-color: #38b2ac; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Track Complaint Status
              </a>
            </div>

            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
              <p style="color: #718096; font-size: 14px;">
                This is an automated email. Please do not reply to this message.
                <br>
                If you have any questions, please contact our support team.
              </p>
            </div>
          </div>
        </div>
      `
    };

    /*
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to send email');
    }
    */

    console.log('Email would be sent:', emailData);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

const SubmitComplaintPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    category: '',
    subcategory: '',
    location: '',
    description: '',
    files: null,
    anonymous: false,
  });
  const [activeStep, setActiveStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedCategory = categories.find(c => c.id === formData.category);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }

    if (name === 'category') {
      setFormData(prev => ({
        ...prev,
        subcategory: ''
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      files: e.target.files
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.anonymous) {
        if (!formData.name.trim()) {
          newErrors.name = t('submit.error.nameRequired');
        }
        if (!formData.phone.trim()) {
          newErrors.phone = t('submit.error.phoneRequired');
        } else if (!/^\+?[0-9]{10,12}$/.test(formData.phone.replace(/\s/g, ''))) {
          newErrors.phone = t('submit.error.phoneInvalid');
        }
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = t('submit.error.emailInvalid');
        }
      }
    } else if (step === 2) {
      if (!formData.category) {
        newErrors.category = t('submit.error.categoryRequired');
      }
      if (formData.category && !formData.subcategory) {
        newErrors.subcategory = t('submit.error.subcategoryRequired');
      }
      if (!formData.location.trim()) {
        newErrors.location = t('submit.error.locationRequired');
      }
    } else if (step === 3) {
      if (!formData.description.trim()) {
        newErrors.description = t('submit.error.descriptionRequired');
      } else if (formData.description.trim().length < 20) {
        newErrors.description = t('submit.error.descriptionShort');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    setActiveStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(activeStep)) {
      setIsSubmitting(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const trackingNumber = `CMP-${Math.floor(100000 + Math.random() * 900000)}`;
        
        const shouldSendEmail = !formData.anonymous && formData.email;
        let emailSent = false;
        
        if (shouldSendEmail) {
          emailSent = await sendConfirmationEmail(formData.email, trackingNumber, formData);
        }
        
        toast.success(t('submit.success'));
        
        if (shouldSendEmail) {
          if (emailSent) {
            toast.success(
              `Confirmation email sent to ${formData.email}`,
              {
                duration: 4000,
                icon: '📧'
              }
            );
          } else {
            toast.error(
              'Failed to send confirmation email, but your complaint was submitted successfully.',
              {
                duration: 4000,
              }
            );
          }
        }
        
        navigate(`/track?id=${trackingNumber}`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error(t('submit.error.general'));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">{t('submit.title')}</h1>
          <p className="text-gray-600 mb-8 text-center">
            {t('submit.subtitle')}
          </p>
          {/* Progress Steps */}
          <div className="mb-10">
            <div className="flex items-center justify-between">
              <ProgressStep
                number={1}
                title={t('submit.step1')}
                active={activeStep === 1}
                completed={activeStep > 1}
              />
              <div className={`h-1 w-full max-w-20 ${activeStep > 1 ? 'bg-teal-500' : 'bg-gray-300'}`}></div>
              <ProgressStep
                number={2}
                title={t('submit.step2')}
                active={activeStep === 2}
                completed={activeStep > 2}
              />
              <div className={`h-1 w-full max-w-20 ${activeStep > 2 ? 'bg-teal-500' : 'bg-gray-300'}`}></div>
              <ProgressStep
                number={3}
                title={t('submit.step3')}
                active={activeStep === 3}
                completed={activeStep > 3}
              />
              <div className={`h-1 w-full max-w-20 ${activeStep > 3 ? 'bg-teal-500' : 'bg-gray-300'}`}></div>
              <ProgressStep
                number={4}
                title={t('submit.step4')}
                active={activeStep === 4}
                completed={activeStep > 4}
              />
            </div>
          </div>

          <form className="bg-white shadow-md rounded-lg p-8 animate-fadeIn" onSubmit={handleSubmit}>
            {activeStep === 1 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                  <p className="text-blue-700 text-sm">
                    {t('submit.info')}
                  </p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
                    <div>
                      <p className="text-green-700 text-sm font-medium mb-1">
                        Email Notification
                      </p>
                      <p className="text-green-600 text-xs">
                        Provide your email to receive a confirmation with your complaint tracking ID and status updates.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="anonymous"
                    name="anonymous"
                    checked={formData.anonymous}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                    {t('submit.anonymous')}
                  </label>
                </div>
                {!formData.anonymous && (
                  <>
                    <FormField
                      label={t('submit.fullName')}
                      name="name"
                      type="text"
                      placeholder={t('submit.fullNamePlaceholder')}
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      required
                    />
                    <FormField
                      label={t('submit.phone')}
                      name="phone"
                      type="tel"
                      placeholder={t('submit.phonePlaceholder')}
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      required
                    />
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                        {t('submit.email')} <span className="text-sm text-gray-500">(Recommended for tracking)</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder={t('submit.emailPlaceholder')}
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500`}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                      <p className="mt-1 text-xs text-gray-500">
                        We'll send you a confirmation email with your complaint tracking ID
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
            {activeStep === 2 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                  <p className="text-blue-700 text-sm">
                    {t('submit.categoryInfo')}
                  </p>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="category">
                    {t('submit.category')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500`}
                    required
                  >
                    <option value="">{t('submit.selectCategory')}</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{t(category.nameKey)}</option>
                    ))}
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                </div>
                {formData.category && (
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="subcategory">
                      {t('submit.subcategory')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subcategory"
                      name="subcategory"
                      value={formData.subcategory}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${errors.subcategory ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500`}
                      required
                    >
                      <option value="">{t('submit.selectSubcategory')}</option>
                      {selectedCategory?.subcategories.map(sub => (
                        <option key={sub} value={t(sub)}>{t(sub)}</option>
                      ))}
                    </select>
                    {errors.subcategory && <p className="mt-1 text-sm text-red-500">{errors.subcategory}</p>}
                  </div>
                )}
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="location">
                    {t('submit.location')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      placeholder={t('submit.locationPlaceholder')}
                      value={formData.location}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500`}
                      required
                    />
                    <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
                  <p className="mt-1 text-xs text-gray-500">
                    {t('submit.locationInfo')}
                  </p>
                </div>
              </div>
            )}
            {activeStep === 3 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                  <p className="text-blue-700 text-sm">
                    {t('submit.descriptionInfo')}
                  </p>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="description">
                    {t('submit.description')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={6}
                    placeholder={t('submit.descriptionPlaceholder')}
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500`}
                    required
                  ></textarea>
                  {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                  <p className="mt-1 text-xs text-gray-500">
                    {t('submit.descriptionHint')}
                  </p>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="files">
                    {t('submit.attachments')}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-500">
                      {t('submit.dragDrop')}{" "}
                      <label htmlFor="file-upload" className="text-teal-600 hover:text-teal-500 cursor-pointer">
                        {t('submit.browse')}
                        <input
                          id="file-upload"
                          name="files"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          multiple
                        />
                      </label>
                    </p>
                    <p className="text-xs text-gray-500">
                      {t('submit.fileInfo')}
                    </p>
                  </div>
                  {formData.files && formData.files.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700">{t('submit.attachedFiles')}</p>
                      <ul className="mt-1 text-sm text-gray-500">
                        {Array.from(formData.files).map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeStep === 4 && (
              <div className="space-y-6">
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                  <p className="text-green-700 text-sm">
                    {t('submit.reviewInfo')}
                  </p>
                </div>
                {!formData.anonymous && formData.email && (
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                      <div>
                        <p className="text-blue-700 text-sm font-medium">
                          Confirmation email will be sent to: {formData.email}
                        </p>
                        <p className="text-blue-600 text-xs mt-1">
                          You'll receive your complaint tracking ID and status updates via email.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="bg-gray-50 rounded-md p-6 space-y-4">
                  <h3 className="font-semibold text-gray-700">{t('submit.step1')}</h3>
                  {formData.anonymous ? (
                    <p className="text-gray-600">{t('submit.anonymousShort')}</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">{t('submit.fullName')}</p>
                        <p>{formData.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('submit.phone')}</p>
                        <p>{formData.phone}</p>
                      </div>
                      {formData.email && (
                        <div>
                          <p className="text-sm text-gray-500">{t('submit.email')}</p>
                          <p>{formData.email}</p>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-semibold text-gray-700">{t('submit.step2')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-sm text-gray-500">{t('submit.category')}</p>
                        <p>{formData.category ? t(categories.find(c => c.id === formData.category)?.nameKey || '') : ''}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('submit.subcategory')}</p>
                        <p>{formData.subcategory}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-500">{t('submit.location')}</p>
                        <p>{formData.location}</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-semibold text-gray-700">{t('submit.description')}</h3>
                    <p className="mt-2 whitespace-pre-line">{formData.description}</p>
                  </div>
                  {formData.files && formData.files.length > 0 && (
                    <div className="border-t border-gray-200 pt-4">
                      <h3 className="font-semibold text-gray-700">{t('submit.attachments')}</h3>
                      <ul className="mt-2 text-sm">
                        {Array.from(formData.files).map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="flex justify-between mt-8">
              {activeStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  disabled={isSubmitting}
                >
                  {t('submit.previous')}
                </button>
              )}
              <div className="ml-auto">
                {activeStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2 bg-teal-600 text-white rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    {t('submit.next')}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2 bg-teal-600 text-white rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 flex items-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('submit.submitting')}
                      </>
                    ) : (
                      t('submit.submitBtn')
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const FormField: React.FC<{
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}> = ({ label, name, type, placeholder, value, onChange, error, required }) => (
  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor={name}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500`}
      required={required}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

const ProgressStep: React.FC<{
  number: number;
  title: string;
  active: boolean;
  completed: boolean;
}> = ({ number, title, active, completed }) => (
  <div className="flex flex-col items-center">
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center ${
        completed
          ? 'bg-teal-500 text-white'
          : active
          ? 'bg-teal-50 border-2 border-teal-500 text-teal-500'
          : 'bg-gray-100 text-gray-500'
      } transition-colors duration-200`}
    >
      {completed ? <Check size={18} /> : number}
    </div>
    <p className={`mt-2 text-xs ${active || completed ? 'text-teal-600 font-medium' : 'text-gray-500'}`}>
      {title}
    </p>
  </div>
);

export default SubmitComplaintPage;
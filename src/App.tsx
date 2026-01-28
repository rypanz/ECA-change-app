import React, { useState } from 'react'
import './styles/bayer-theme.css'
import { FileSearch, FileText, Users, Download, GitBranch, Shield, ListChecks, Package } from 'lucide-react'
import DocumentSearch from './components/DocumentSearch'
import ScopeOfChange from './components/ScopeOfChange'
import FullVsFastTrack from './components/FullVsFastTrack'
import CRBMembers from './components/CRBMembers'
import ProductChange from './components/ProductChange'
import ProductECA from './components/ProductECA'
import ManufacturingChange from './components/ManufacturingChange'
import MinimumDeliverables from './components/MinimumDeliverables'
import ReviewExport from './components/ReviewExport'

type Step = 'search' | 'scope' | 'track' | 'qsr' | 'product-affected' | 'product-eca' | 'em' | 'sd' | 'crb' | 'deliverables' | 'review'

interface ChangeData {
  ecrNumber: string
  documentNumber: string
  documentType: string
  documentVersion: string
  documentState: string
  changeType?: 'product' | 'manufacturing'
  objectType?: string
  qsrDetermination?: {
    includesQSRDatasets: boolean
    includesQualityDatasets: boolean
    includesTrainingDocs: boolean
    noneOfAboveQSR: boolean
    needsQSR: boolean
  }
  productTypeOptions?: {
    includesPartObjects: boolean
    includesProductDesignDatasets: boolean
    includesProtocolReport: boolean
  }
  manufacturingDetermination?: {
    includesProductDesignInMfg: boolean
    includesMfgDatasetsEM: boolean
    includesServiceDatasets: boolean
    includesMfgDatasetsSD: boolean
    needsEM: boolean
    needsSD: boolean
  }
  requiredECATypes?: string[]
  scopeOfChange: string
  changeSummary: string
  trackType?: string
  complexityScores?: {
    impact: number
    risk: number
    cost: number
  }
  totalComplexityScore?: number
  complexityRationale?: string
  crbMembers?: string
  cibMembers?: string
  approvalNotes?: string
  minimumDeliverables?: string
  productData?: any
  productECAData?: any
  manufacturingData?: any
}

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('search')
  const [changeData, setChangeData] = useState<ChangeData>({
    ecrNumber: '',
    documentNumber: '',
    documentType: '',
    documentVersion: '',
    documentState: '',
    scopeOfChange: '',
    changeSummary: ''
  })

  const getSteps = () => {
    const steps = [
      { id: 'search', name: 'ECR Information', icon: FileSearch },
      { id: 'scope', name: 'Scope of Change', icon: FileText },
      { id: 'track', name: 'Full vs Fast Track', icon: GitBranch }
    ]

    // Add QSR if needed (right after track)
    if (changeData.qsrDetermination?.needsQSR) {
      steps.push({ id: 'qsr', name: 'QSR Assessment', icon: Users })
    }

    // Add Product pages if product change
    if (changeData.changeType === 'product') {
      steps.push({ id: 'product-affected', name: 'Product Affected Items', icon: Users })
      steps.push({ id: 'product-eca', name: 'Product ECA', icon: Package })
    }

    // Add Manufacturing pages if manufacturing change
    if (changeData.changeType === 'manufacturing') {
      if (changeData.manufacturingDetermination?.needsEM) {
        steps.push({ id: 'em', name: 'EM Assessment', icon: Users })
      }
      if (changeData.manufacturingDetermination?.needsSD) {
        steps.push({ id: 'sd', name: 'SD Assessment', icon: Users })
      }
    }

    // Add CRB if Full Track (BEFORE Minimum Deliverables)
    if (changeData.trackType === 'full') {
      steps.push({ id: 'crb', name: 'CRB/CIB Members', icon: Shield })
    }

    // Add Minimum Deliverables before Review
    steps.push({ id: 'deliverables', name: 'Minimum Deliverables', icon: ListChecks })
    steps.push({ id: 'review', name: 'Review & Export', icon: Download })

    return steps
  }

  const steps = getSteps()

  const updateChangeData = (updates: Partial<ChangeData>) => {
    setChangeData(prev => ({ ...prev, ...updates }))
  }

  const goToNextStep = () => {
    const stepOrder = steps.map(s => s.id)
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1] as Step)
    }
  }

  const goToPreviousStep = () => {
    const stepOrder = steps.map(s => s.id)
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1] as Step)
    }
  }

  return (
    <div className="min-h-screen lmnt-theme-surface-bg">
      {/* Header */}
      <header className="lmnt-theme-primary-bg lmnt-theme-on-primary py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Engineering Change Assessment System</h1>
          <p className="lmnt-theme-on-primary-inactive mt-2">Streamlined change management for manufacturing</p>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="lmnt-theme-background-bg border-b lmnt-theme-divider-primary">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between overflow-x-auto">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = steps.findIndex(s => s.id === currentStep) > index
              
              return (
                <div key={step.id} className="flex items-center flex-1 min-w-[120px]">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isActive 
                        ? 'lmnt-theme-primary-bg lmnt-theme-on-primary' 
                        : isCompleted 
                        ? 'lmnt-theme-success-bg lmnt-theme-on-success'
                        : 'lmnt-theme-surface-variant-bg lmnt-theme-on-surface'
                    }`}>
                      <Icon size={24} />
                    </div>
                    <span className={`mt-2 text-sm font-medium text-center ${
                      isActive ? 'lmnt-theme-primary' : 'lmnt-theme-on-surface'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-1 flex-1 mx-4 ${
                      isCompleted ? 'lmnt-theme-success-bg' : 'lmnt-theme-surface-variant-bg'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="lmnt-theme-background-bg rounded-lg shadow-lg p-8">
          {currentStep === 'search' && (
            <DocumentSearch 
              changeData={changeData}
              updateChangeData={updateChangeData}
              onNext={goToNextStep}
            />
          )}
          
          {currentStep === 'scope' && (
            <ScopeOfChange 
              changeData={changeData}
              updateChangeData={updateChangeData}
              onNext={goToNextStep}
              onBack={goToPreviousStep}
            />
          )}
          
          {currentStep === 'track' && (
            <FullVsFastTrack 
              changeData={changeData}
              updateChangeData={updateChangeData}
              onNext={goToNextStep}
              onBack={goToPreviousStep}
            />
          )}

          {currentStep === 'qsr' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold lmnt-theme-primary mb-2">QSR Assessment</h2>
                <p className="lmnt-theme-on-surface">Quality System Requirements assessment for QSR datasets and training documents</p>
              </div>
              <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg">
                <p className="text-sm lmnt-theme-on-surface mb-4">
                  This page will contain QSR-specific assessment questions and compliance requirements.
                </p>
                <p className="text-sm lmnt-theme-on-surface-variant">
                  [QSR assessment content to be implemented based on requirements]
                </p>
              </div>
              <div className="flex justify-between pt-6 border-t lmnt-theme-divider-primary">
                <button
                  onClick={goToPreviousStep}
                  className="lmnt-theme-surface-variant-bg lmnt-theme-on-surface px-8 py-3 rounded-lg font-medium hover:opacity-90"
                >
                  Back
                </button>
                <button
                  onClick={goToNextStep}
                  className="lmnt-theme-primary-bg lmnt-theme-on-primary px-8 py-3 rounded-lg font-medium hover:opacity-90"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
          
          {currentStep === 'product-affected' && (
            <ProductChange 
              changeData={changeData}
              updateChangeData={updateChangeData}
              onNext={goToNextStep}
              onBack={goToPreviousStep}
            />
          )}

          {currentStep === 'product-eca' && (
            <ProductECA 
              changeData={changeData}
              updateChangeData={updateChangeData}
              onNext={goToNextStep}
              onBack={goToPreviousStep}
            />
          )}

          {currentStep === 'em' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold lmnt-theme-primary mb-2">EM (Engineering Manufacturing) Assessment</h2>
                <p className="lmnt-theme-on-surface">Assessment for O'Hara, Rydalmere, EMO sites and service datasets</p>
              </div>
              <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg">
                <p className="text-sm lmnt-theme-on-surface mb-4">
                  This page will contain EM-specific assessment questions for manufacturing datasets at O'Hara, Rydalmere, EMO sites and service datasets.
                </p>
                <p className="text-sm lmnt-theme-on-surface-variant">
                  [EM assessment content to be implemented based on requirements]
                </p>
              </div>
              <div className="flex justify-between pt-6 border-t lmnt-theme-divider-primary">
                <button
                  onClick={goToPreviousStep}
                  className="lmnt-theme-surface-variant-bg lmnt-theme-on-surface px-8 py-3 rounded-lg font-medium hover:opacity-90"
                >
                  Back
                </button>
                <button
                  onClick={goToNextStep}
                  className="lmnt-theme-primary-bg lmnt-theme-on-primary px-8 py-3 rounded-lg font-medium hover:opacity-90"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
          
          {currentStep === 'sd' && (
            <ManufacturingChange 
              changeData={changeData}
              updateChangeData={updateChangeData}
              onNext={goToNextStep}
              onBack={goToPreviousStep}
            />
          )}
          
          {currentStep === 'crb' && (
            <CRBMembers 
              changeData={changeData}
              updateChangeData={updateChangeData}
              onNext={goToNextStep}
              onBack={goToPreviousStep}
            />
          )}
          
          {currentStep === 'deliverables' && (
            <MinimumDeliverables 
              changeData={changeData}
              updateChangeData={updateChangeData}
              onNext={goToNextStep}
              onBack={goToPreviousStep}
            />
          )}
          
          {currentStep === 'review' && (
            <ReviewExport 
              changeData={changeData}
              onBack={goToPreviousStep}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default App
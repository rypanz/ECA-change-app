import React, { useState } from 'react'
import './styles/bayer-theme.css'
import { FileSearch, FileText, Users, Download, GitBranch } from 'lucide-react'
import DocumentSearch from './components/DocumentSearch'
import ScopeOfChange from './components/ScopeOfChange'
import FullVsFastTrack from './components/FullVsFastTrack'
import ProductChange from './components/ProductChange'
import ManufacturingChange from './components/ManufacturingChange'
import ReviewExport from './components/ReviewExport'

type Step = 'search' | 'scope' | 'track' | 'assessment' | 'review'

interface ChangeData {
  ecrNumber: string
  documentNumber: string
  documentType: string
  documentVersion: string
  documentState: string
  changeType?: 'product' | 'manufacturing'
  objectType?: string
  productTypeOptions?: {
    includesPartObjects: boolean
    includesProductDesignDatasets: boolean
    includesProtocolReport: boolean
  }
  requiredECATypes?: string[]
  scopeOfChange: string
  changeSummary: string
  trackType?: string
  crbMembers?: string
  productData?: any
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
    return [
      { id: 'search', name: 'ECR Information', icon: FileSearch },
      { id: 'scope', name: 'Scope of Change', icon: FileText },
      { id: 'track', name: 'Full vs Fast Track', icon: GitBranch },
      { id: 'assessment', name: 'Impact Assessment', icon: Users },
      { id: 'review', name: 'Review & Export', icon: Download }
    ]
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

  const isProductChange = changeData.changeType === 'product'
  const isManufacturingChange = changeData.changeType === 'manufacturing'

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
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = steps.findIndex(s => s.id === currentStep) > index
              
              return (
                <div key={step.id} className="flex items-center flex-1">
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
          
          {currentStep === 'assessment' && isProductChange && (
            <ProductChange 
              changeData={changeData}
              updateChangeData={updateChangeData}
              onNext={goToNextStep}
              onBack={goToPreviousStep}
            />
          )}
          
          {currentStep === 'assessment' && isManufacturingChange && (
            <ManufacturingChange 
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
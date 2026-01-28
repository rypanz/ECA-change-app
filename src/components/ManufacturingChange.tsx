import React, { useState } from 'react'
import { AlertCircle, Users, FileText } from 'lucide-react'

interface Props {
  changeData: any
  updateChangeData: (updates: any) => void
  onNext: () => void
  onBack: () => void
}

interface Assessment {
  id: string
  question: string
  answer: 'yes' | 'no' | ''
  justification?: string
  noReason?: string
}

const ManufacturingChange: React.FC<Props> = ({ changeData, updateChangeData, onNext, onBack }) => {
  const [impactedObjects, setImpactedObjects] = useState(changeData.manufacturingData?.impactedObjects || '')
  const [changeInitiator, setChangeInitiator] = useState(changeData.manufacturingData?.changeInitiator || '')
  const [changeLeader, setChangeLeader] = useState(changeData.manufacturingData?.changeLeader || '')
  const [implementationLead, setImplementationLead] = useState(changeData.manufacturingData?.implementationLead || '')
  const [smes, setSmes] = useState(changeData.manufacturingData?.smes || '')

  const [assessments, setAssessments] = useState<Assessment[]>(changeData.manufacturingData?.assessments || [
    {
      id: 'design',
      question: 'Does this change affect product design specifications?',
      answer: '',
      justification: '',
      noReason: ''
    },
    {
      id: 'quality',
      question: 'Does this change impact quality control procedures?',
      answer: '',
      justification: '',
      noReason: ''
    },
    {
      id: 'manufacturing',
      question: 'Does this change affect manufacturing processes or equipment?',
      answer: '',
      justification: '',
      noReason: ''
    },
    {
      id: 'safety',
      question: 'Does this change have safety implications?',
      answer: '',
      justification: '',
      noReason: ''
    },
    {
      id: 'regulatory',
      question: 'Does this change require regulatory notification or approval?',
      answer: '',
      justification: '',
      noReason: ''
    },
    {
      id: 'training',
      question: 'Does this change require personnel training or qualification updates?',
      answer: '',
      justification: '',
      noReason: ''
    },
    {
      id: 'validation',
      question: 'Does this change require validation or verification activities?',
      answer: '',
      justification: '',
      noReason: ''
    },
    {
      id: 'documentation',
      question: 'Does this change affect controlled documentation (SOPs, work instructions, etc.)?',
      answer: '',
      justification: '',
      noReason: ''
    }
  ])

  const noReasonOptions = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5'
  ]

  const updateAssessment = (id: string, field: keyof Assessment, value: string) => {
    setAssessments(prev => prev.map(assessment => {
      if (assessment.id === id) {
        const updated = { ...assessment, [field]: value }
        // Clear noReason if answer is not "no"
        if (field === 'answer' && value !== 'no') {
          updated.noReason = ''
        }
        return updated
      }
      return assessment
    }))
  }

  const handleContinue = () => {
    updateChangeData({
      manufacturingData: {
        impactedObjects,
        changeInitiator,
        changeLeader,
        implementationLead,
        smes,
        assessments
      }
    })
    onNext()
  }

  const isValid = impactedObjects && changeInitiator && changeLeader && 
    assessments.every(a => a.answer && (a.answer === 'yes' || (a.answer === 'no' && a.noReason)))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold lmnt-theme-primary mb-2">Manufacturing/QSR Change Assessment</h2>
        <p className="lmnt-theme-on-surface">Complete the impact assessment for manufacturing and QSR changes (Step 5)</p>
      </div>

      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg border-l-4 lmnt-theme-secondary-border">
        <div className="flex items-start gap-3">
          <AlertCircle size={24} className="lmnt-theme-secondary mt-1" />
          <div>
            <h4 className="font-bold lmnt-theme-on-surface mb-2">Manufacturing/QSR Change Scope</h4>
            <p className="text-sm lmnt-theme-on-surface mb-2">This assessment covers:</p>
            <ul className="text-sm lmnt-theme-on-surface list-disc list-inside space-y-1">
              <li>QSR Dataset document types</li>
              <li>Quality Dataset documents (Supplier Quality Requirements - Released State)</li>
              <li>Training documents</li>
              <li>Product Design Datasets used in manufacturing</li>
              <li>Manufacturing Dataset documents (O'Hara, Rydalmere, EMO, Heredia, Indianola, Saxonburg sites)</li>
              <li>Service Datasets</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <FileText size={24} className="lmnt-theme-primary" />
          <h3 className="font-bold lmnt-theme-on-surface">Change Information</h3>
        </div>

        <div>
          <label className="block lmnt-theme-on-surface font-medium mb-2">
            Impacted Objects *
          </label>
          <textarea
            value={impactedObjects}
            onChange={(e) => setImpactedObjects(e.target.value)}
            rows={3}
            placeholder="List the objects impacted by this change (QSR Datasets, Manufacturing Datasets, Training Documents, etc.)"
            className="w-full px-4 py-3 border lmnt-theme-primary-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 lmnt-theme-primary resize-none"
          />
        </div>
      </div>

      {/* Team Members */}
      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Users size={24} className="lmnt-theme-secondary" />
          <h3 className="font-bold lmnt-theme-on-surface">Team Members</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block lmnt-theme-on-surface font-medium mb-2">
              Change Initiator *
            </label>
            <input
              type="text"
              value={changeInitiator}
              onChange={(e) => setChangeInitiator(e.target.value)}
              placeholder="Name of person initiating the change"
              className="w-full px-4 py-3 border lmnt-theme-primary-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 lmnt-theme-primary"
            />
          </div>

          <div>
            <label className="block lmnt-theme-on-surface font-medium mb-2">
              Change Leader *
            </label>
            <input
              type="text"
              value={changeLeader}
              onChange={(e) => setChangeLeader(e.target.value)}
              placeholder="Name of change leader"
              className="w-full px-4 py-3 border lmnt-theme-primary-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 lmnt-theme-primary"
            />
          </div>

          <div>
            <label className="block lmnt-theme-on-surface font-medium mb-2">
              Implementation Lead
            </label>
            <input
              type="text"
              value={implementationLead}
              onChange={(e) => setImplementationLead(e.target.value)}
              placeholder="Name of implementation lead"
              className="w-full px-4 py-3 border lmnt-theme-primary-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 lmnt-theme-primary"
            />
          </div>

          <div>
            <label className="block lmnt-theme-on-surface font-medium mb-2">
              Subject Matter Experts (SMEs)
            </label>
            <input
              type="text"
              value={smes}
              onChange={(e) => setSmes(e.target.value)}
              placeholder="Names of SMEs involved"
              className="w-full px-4 py-3 border lmnt-theme-primary-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 lmnt-theme-primary"
            />
          </div>
        </div>
      </div>

      {/* Impact Assessment Questions */}
      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg space-y-6">
        <h3 className="font-bold lmnt-theme-on-surface text-lg">Impact Assessment Questions</h3>
        <p className="text-sm lmnt-theme-on-surface-variant">
          Answer each question and provide justification. If you select "No", you must select a reason from the dropdown.
        </p>

        {assessments.map((assessment, index) => (
          <div key={assessment.id} className="lmnt-theme-background-bg p-5 rounded-lg border lmnt-theme-primary-border">
            <div className="mb-4">
              <p className="lmnt-theme-on-surface font-medium mb-3">
                {index + 1}. {assessment.question}
              </p>
              
              <div className="flex gap-4 mb-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`assessment-${assessment.id}`}
                    checked={assessment.answer === 'yes'}
                    onChange={() => updateAssessment(assessment.id, 'answer', 'yes')}
                    className="w-4 h-4"
                  />
                  <span className="lmnt-theme-on-surface">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`assessment-${assessment.id}`}
                    checked={assessment.answer === 'no'}
                    onChange={() => updateAssessment(assessment.id, 'answer', 'no')}
                    className="w-4 h-4"
                  />
                  <span className="lmnt-theme-on-surface">No</span>
                </label>
              </div>

              {assessment.answer === 'no' && (
                <div className="mb-3">
                  <label className="block lmnt-theme-on-surface font-medium mb-2 text-sm">
                    Reason for "No" *
                  </label>
                  <select
                    value={assessment.noReason || ''}
                    onChange={(e) => updateAssessment(assessment.id, 'noReason', e.target.value)}
                    className="w-full px-4 py-3 border lmnt-theme-primary-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 lmnt-theme-primary"
                  >
                    <option value="">Select a reason...</option>
                    {noReasonOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {assessment.answer && (
                <div>
                  <label className="block lmnt-theme-on-surface font-medium mb-2 text-sm">
                    Comment/Justification (Optional)
                  </label>
                  <textarea
                    value={assessment.justification || ''}
                    onChange={(e) => updateAssessment(assessment.id, 'justification', e.target.value)}
                    rows={3}
                    placeholder="Provide additional context or justification..."
                    className="w-full px-4 py-3 border lmnt-theme-primary-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 lmnt-theme-primary resize-none"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-6 border-t lmnt-theme-divider-primary">
        <button
          onClick={onBack}
          className="lmnt-theme-surface-variant-bg lmnt-theme-on-surface px-8 py-3 rounded-lg font-medium hover:opacity-90"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!isValid}
          className="lmnt-theme-primary-bg lmnt-theme-on-primary px-8 py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
        >
          Continue to Review & Export
        </button>
      </div>
    </div>
  )
}

export default ManufacturingChange
import React, { useState } from 'react'
import { Shield, Users, AlertCircle } from 'lucide-react'

interface Props {
  changeData: any
  updateChangeData: (updates: any) => void
  onNext: () => void
  onBack: () => void
}

const CRBMembers: React.FC<Props> = ({ changeData, updateChangeData, onNext, onBack }) => {
  const [crbMembers, setCrbMembers] = useState(changeData.crbMembers || '')
  const [cibMembers, setCibMembers] = useState(changeData.cibMembers || '')
  const [approvalNotes, setApprovalNotes] = useState(changeData.approvalNotes || '')

  const handleContinue = () => {
    updateChangeData({
      crbMembers,
      cibMembers,
      approvalNotes
    })
    onNext()
  }

  const isValid = crbMembers.trim() && cibMembers.trim()

  const getStepNumber = () => {
    let step = 5
    if (changeData.qsrDetermination?.needsQSR) step++
    if (changeData.changeType === 'product') step += 2
    if (changeData.changeType === 'manufacturing') {
      if (changeData.manufacturingDetermination?.needsEM) step++
      if (changeData.manufacturingDetermination?.needsSD) step++
    }
    return step
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold lmnt-theme-primary mb-2">CRB/CIB Members</h2>
        <p className="lmnt-theme-on-surface">Identify Change Review Board and Change Implementation Board members for Full Track approval (Step {getStepNumber()})</p>
      </div>

      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg border-l-4 lmnt-theme-primary-border">
        <div className="flex items-start gap-3">
          <Shield size={24} className="lmnt-theme-primary mt-1" />
          <div>
            <h4 className="font-bold lmnt-theme-on-surface mb-2">Full Track Requirements</h4>
            <p className="text-sm lmnt-theme-on-surface mb-3">
              Because this change has been determined to be <strong>Full Track</strong> (complexity score ≥ 7), 
              it requires formal approval from both the Change Review Board (CRB) and Change Implementation Board (CIB).
            </p>
            <ul className="text-sm lmnt-theme-on-surface list-disc list-inside space-y-1">
              <li><strong>CRB</strong> reviews and approves Change Requests (ECR)</li>
              <li><strong>CIB</strong> reviews and approves Change Notices (ECN) for implementation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Current Change Summary */}
      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg">
        <h4 className="font-bold lmnt-theme-on-surface mb-3">Change Summary</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="lmnt-theme-on-surface-variant">ECR Number</p>
            <p className="lmnt-theme-on-surface font-medium">{changeData.ecrNumber}</p>
          </div>
          <div>
            <p className="lmnt-theme-on-surface-variant">Change Type</p>
            <p className="lmnt-theme-on-surface font-medium capitalize">{changeData.changeType}</p>
          </div>
          <div>
            <p className="lmnt-theme-on-surface-variant">Complexity Score</p>
            <p className="lmnt-theme-primary font-medium text-lg">{changeData.totalComplexityScore}</p>
          </div>
          <div>
            <p className="lmnt-theme-on-surface-variant">Track Type</p>
            <p className="lmnt-theme-primary font-medium text-lg">Full Track</p>
          </div>
        </div>
      </div>

      {/* CRB Members */}
      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <Users size={24} className="lmnt-theme-primary" />
          <h3 className="font-bold lmnt-theme-on-surface">Change Review Board (CRB) Members</h3>
        </div>
        
        <label className="block lmnt-theme-on-surface font-medium mb-2">
          CRB Members *
        </label>
        <textarea
          value={crbMembers}
          onChange={(e) => setCrbMembers(e.target.value)}
          rows={4}
          placeholder="List the CRB members who will review and approve the Change Request (ECR)...&#10;&#10;Example:&#10;• John Smith - Engineering Director&#10;• Jane Doe - Quality Manager&#10;• Bob Johnson - Manufacturing Lead"
          className="w-full px-4 py-3 border lmnt-theme-primary-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 lmnt-theme-primary resize-none"
        />
        <p className="text-sm lmnt-theme-on-surface-variant mt-2">
          Include names and roles of all CRB members required for ECR approval
        </p>
      </div>

      {/* CIB Members */}
      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <Users size={24} className="lmnt-theme-secondary" />
          <h3 className="font-bold lmnt-theme-on-surface">Change Implementation Board (CIB) Members</h3>
        </div>
        
        <label className="block lmnt-theme-on-surface font-medium mb-2">
          CIB Members *
        </label>
        <textarea
          value={cibMembers}
          onChange={(e) => setCibMembers(e.target.value)}
          rows={4}
          placeholder="List the CIB members who will review and approve the Change Notice (ECN) for implementation...&#10;&#10;Example:&#10;• Sarah Williams - Implementation Manager&#10;• Mike Davis - Operations Lead&#10;• Lisa Brown - Quality Assurance"
          className="w-full px-4 py-3 border lmnt-theme-primary-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 lmnt-theme-primary resize-none"
        />
        <p className="text-sm lmnt-theme-on-surface-variant mt-2">
          Include names and roles of all CIB members required for ECN approval
        </p>
      </div>

      {/* Approval Notes */}
      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg">
        <label className="block lmnt-theme-on-surface font-medium mb-2">
          Additional Approval Notes (Optional)
        </label>
        <textarea
          value={approvalNotes}
          onChange={(e) => setApprovalNotes(e.target.value)}
          rows={3}
          placeholder="Add any additional notes or special instructions for the approval process..."
          className="w-full px-4 py-3 border lmnt-theme-primary-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 lmnt-theme-primary resize-none"
        />
        <p className="text-sm lmnt-theme-on-surface-variant mt-2">
          Include any special considerations, timelines, or dependencies for the approval process
        </p>
      </div>

      {/* Information Box */}
      <div className="lmnt-theme-background-bg p-6 rounded-lg border-l-4 lmnt-theme-secondary-border">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="lmnt-theme-secondary mt-0.5" />
          <div>
            <p className="text-sm lmnt-theme-on-surface">
              <strong>Next Steps:</strong> After completing this form, you will proceed to the Minimum Deliverables page 
              to document the change implementation plan. The CRB/CIB information will be included in the final exported 
              document for routing and approval.
            </p>
          </div>
        </div>
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
          Continue to Minimum Deliverables
        </button>
      </div>
    </div>
  )
}

export default CRBMembers
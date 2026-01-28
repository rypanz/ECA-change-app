import React, { useState } from 'react'
import { FileText, ListChecks } from 'lucide-react'

interface Props {
  changeData: any
  updateChangeData: (updates: any) => void
  onNext: () => void
  onBack: () => void
}

const MinimumDeliverables: React.FC<Props> = ({ changeData, updateChangeData, onNext, onBack }) => {
  const [deliverables, setDeliverables] = useState(changeData.minimumDeliverables || '')

  const handleContinue = () => {
    updateChangeData({
      minimumDeliverables: deliverables
    })
    onNext()
  }

  const getStepNumber = () => {
    let step = 5
    if (changeData.trackType === 'full') step++
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
        <h2 className="text-2xl font-bold lmnt-theme-primary mb-2">Minimum Deliverables (CIP)</h2>
        <p className="lmnt-theme-on-surface">Document project deliverables and change implementation plan (Step {getStepNumber()})</p>
      </div>

      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg border-l-4 lmnt-theme-secondary-border">
        <div className="flex items-start gap-3">
          <ListChecks size={24} className="lmnt-theme-secondary mt-1" />
          <div>
            <h4 className="font-bold lmnt-theme-on-surface mb-2">About This Section</h4>
            <p className="text-sm lmnt-theme-on-surface mb-3">
              Use this section to:
            </p>
            <ul className="text-sm lmnt-theme-on-surface list-disc list-inside space-y-1">
              <li>Document all deliverables required for change implementation</li>
              <li>Track responsibilities and timelines</li>
              <li>Serve as a project organization tool</li>
              <li>Provide an overflow list for additional documents</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Current Change Information */}
      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg">
        <h4 className="font-bold lmnt-theme-on-surface mb-3">Current Change Information</h4>
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
            <p className="lmnt-theme-on-surface-variant">Track Type</p>
            <p className={`font-medium capitalize ${
              changeData.trackType === 'full' ? 'lmnt-theme-primary' : 'lmnt-theme-success'
            }`}>
              {changeData.trackType || 'Not determined'} Track
            </p>
          </div>
          <div>
            <p className="lmnt-theme-on-surface-variant">Required Assessments</p>
            <p className="lmnt-theme-on-surface font-medium">
              {changeData.requiredECATypes?.join(', ') || 'None'}
            </p>
          </div>
        </div>
      </div>

      {/* Deliverables Editor */}
      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <FileText size={24} className="lmnt-theme-primary" />
          <h3 className="font-bold lmnt-theme-on-surface">Change Implementation Plan (CIP)</h3>
        </div>

        <label className="block lmnt-theme-on-surface font-medium mb-2">
          Minimum Deliverables
        </label>
        <p className="text-sm lmnt-theme-on-surface-variant mb-3">
          List all deliverables, documents, and activities required to implement this change. 
          Include responsible parties, due dates, and status where applicable.
        </p>
        
        <textarea
          value={deliverables}
          onChange={(e) => setDeliverables(e.target.value)}
          rows={15}
          placeholder="Document your minimum deliverables here...&#10;&#10;Example format:&#10;&#10;1. Updated Design Documentation&#10;   - Responsible: Engineering Team&#10;   - Due Date: 2024-02-15&#10;   - Status: In Progress&#10;&#10;2. Manufacturing Process Updates&#10;   - Responsible: Manufacturing Engineering&#10;   - Due Date: 2024-02-20&#10;   - Status: Not Started&#10;&#10;3. Training Materials&#10;   - Responsible: Quality Team&#10;   - Due Date: 2024-02-25&#10;   - Status: Not Started&#10;&#10;4. Validation Protocol&#10;   - Responsible: Quality Assurance&#10;   - Due Date: 2024-03-01&#10;   - Status: Not Started"
          className="w-full px-4 py-3 border lmnt-theme-primary-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 lmnt-theme-primary resize-none font-mono text-sm"
        />
        <p className="text-sm lmnt-theme-on-surface-variant mt-2">
          This information will be included as a separate tab in the exported Excel document
        </p>
      </div>

      {/* Helpful Tips */}
      <div className="lmnt-theme-background-bg p-6 rounded-lg border lmnt-theme-primary-border">
        <h4 className="font-bold lmnt-theme-on-surface mb-3">Helpful Tips</h4>
        <ul className="text-sm lmnt-theme-on-surface space-y-2">
          <li>• <strong>Be Specific:</strong> Clearly identify each deliverable and its requirements</li>
          <li>• <strong>Assign Ownership:</strong> List who is responsible for each item</li>
          <li>• <strong>Set Timelines:</strong> Include realistic due dates for tracking</li>
          <li>• <strong>Track Progress:</strong> Update status as work progresses</li>
          <li>• <strong>Consider Dependencies:</strong> Note any items that depend on others</li>
        </ul>
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
          className="lmnt-theme-primary-bg lmnt-theme-on-primary px-8 py-3 rounded-lg font-medium hover:opacity-90"
        >
          Continue to Review & Export
        </button>
      </div>
    </div>
  )
}

export default MinimumDeliverables
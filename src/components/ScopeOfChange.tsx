import React, { useState } from 'react'
import { FileText } from 'lucide-react'

interface Props {
  changeData: any
  updateChangeData: (updates: any) => void
  onNext: () => void
  onBack: () => void
}

const ScopeOfChange: React.FC<Props> = ({ changeData, updateChangeData, onNext, onBack }) => {
  const [scope, setScope] = useState(changeData.scopeOfChange || '')
  const [summary, setSummary] = useState(changeData.changeSummary || '')

  const handleContinue = () => {
    updateChangeData({
      scopeOfChange: scope,
      changeSummary: summary
    })
    onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold lmnt-theme-primary mb-2">Scope of Change</h2>
        <p className="lmnt-theme-on-surface">Document the scope and reason for this change (Step 3)</p>
      </div>

      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg border-l-4 lmnt-theme-secondary-border">
        <div className="flex items-start gap-3">
          <FileText size={24} className="lmnt-theme-secondary mt-1" />
          <div>
            <h4 className="font-bold lmnt-theme-on-surface mb-2">Change Type</h4>
            <div className="flex flex-wrap gap-2">
              <span className="lmnt-theme-primary-bg lmnt-theme-on-primary px-3 py-1 rounded-full text-sm font-medium capitalize">
                {changeData.changeType}
              </span>
              {changeData.requiredECATypes?.map((type: string) => (
                <span key={type} className="lmnt-theme-secondary-bg lmnt-theme-on-secondary px-3 py-1 rounded-full text-sm font-medium">
                  {type} ECA Required
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block lmnt-theme-on-surface font-medium mb-2">
            Scope and Reason for Change *
          </label>
          <textarea
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            rows={6}
            placeholder="Describe the scope and reason for this change...&#10;&#10;Include:&#10;• What is changing and why&#10;• Background/context for the change&#10;• Business justification&#10;• Regulatory or compliance drivers (if applicable)"
            className="w-full px-4 py-3 border lmnt-theme-primary-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 lmnt-theme-primary resize-none"
          />
          <p className="text-sm lmnt-theme-on-surface-variant mt-2">
            Provide a clear description of what is changing and why this change is necessary
          </p>
        </div>

        <div>
          <label className="block lmnt-theme-on-surface font-medium mb-2">
            Summary of Change *
          </label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={6}
            placeholder="Summarize what parts or documents are changing...&#10;&#10;Include:&#10;• Specific part numbers, document numbers, or assemblies affected&#10;• Nature of changes (design, specification, procedure, etc.)&#10;• Revision levels&#10;• Related documents or dependencies"
            className="w-full px-4 py-3 border lmnt-theme-primary-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 lmnt-theme-primary resize-none"
          />
          <p className="text-sm lmnt-theme-on-surface-variant mt-2">
            List specific parts, drawings, or documents affected by this change
          </p>
        </div>
      </div>

      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg">
        <h4 className="font-bold lmnt-theme-on-surface mb-3">Change Information Summary</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="lmnt-theme-on-surface-variant">Document Number</p>
            <p className="lmnt-theme-on-surface font-medium">{changeData.documentNumber}</p>
          </div>
          <div>
            <p className="lmnt-theme-on-surface-variant">Document Type</p>
            <p className="lmnt-theme-on-surface font-medium">{changeData.documentType}</p>
          </div>
          <div>
            <p className="lmnt-theme-on-surface-variant">Version</p>
            <p className="lmnt-theme-on-surface font-medium">{changeData.documentVersion}</p>
          </div>
          <div>
            <p className="lmnt-theme-on-surface-variant">State</p>
            <p className="lmnt-theme-on-surface font-medium">{changeData.documentState}</p>
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
          disabled={!scope || !summary}
          className="lmnt-theme-primary-bg lmnt-theme-on-primary px-8 py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
        >
          Continue to Full vs. Fast Track
        </button>
      </div>
    </div>
  )
}

export default ScopeOfChange
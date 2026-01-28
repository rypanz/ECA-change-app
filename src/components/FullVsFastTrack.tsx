import React, { useState, useEffect } from 'react'
import { AlertCircle, Calculator, FileText } from 'lucide-react'

interface Props {
  changeData: any
  updateChangeData: (updates: any) => void
  onNext: () => void
  onBack: () => void
}

const FullVsFastTrack: React.FC<Props> = ({ changeData, updateChangeData, onNext, onBack }) => {
  const [impactScore, setImpactScore] = useState<number>(changeData.complexityScores?.impact || 0)
  const [riskScore, setRiskScore] = useState<number>(changeData.complexityScores?.risk || 0)
  const [costScore, setCostScore] = useState<number>(changeData.complexityScores?.cost || 0)
  const [rationale, setRationale] = useState(changeData.complexityRationale || '')

  const totalScore = impactScore + riskScore + costScore
  const trackType = totalScore >= 7 ? 'full' : 'fast'

  const handleContinue = () => {
    updateChangeData({
      complexityScores: {
        impact: impactScore,
        risk: riskScore,
        cost: costScore
      },
      totalComplexityScore: totalScore,
      trackType,
      complexityRationale: rationale
    })
    onNext()
  }

  const isValid = impactScore > 0 && riskScore > 0 && costScore > 0 && rationale.trim()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold lmnt-theme-primary mb-2">Full vs. Fast Track Determination</h2>
        <p className="lmnt-theme-on-surface">Assess change complexity to determine routing (Step 4)</p>
      </div>

      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg border-l-4 lmnt-theme-secondary-border">
        <div className="flex items-start gap-3">
          <FileText size={24} className="lmnt-theme-secondary mt-1" />
          <div>
            <h4 className="font-bold lmnt-theme-on-surface mb-2">Reference: D-0000916903</h4>
            <p className="text-sm lmnt-theme-on-surface mb-3">
              The Change Lead (CL) and functional stakeholders shall determine the complexity using the criteria below. 
              All ECA team members must agree and document the decision and rationale.
            </p>
            <div className="lmnt-theme-background-bg p-3 rounded border lmnt-theme-primary-border">
              <p className="text-sm lmnt-theme-on-surface font-medium">
                Change Complexity = Impact Score + Risk Score + Cost Score
              </p>
              <ul className="text-sm lmnt-theme-on-surface mt-2 space-y-1">
                <li>• Scores ≥ 7 = <strong>Full Track</strong> (requires CRB/CIB approval)</li>
                <li>• Scores &lt; 7 = <strong>Fast Track</strong> (expedited process)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Complexity Scoring */}
      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Calculator size={24} className="lmnt-theme-primary" />
          <h3 className="font-bold lmnt-theme-on-surface">Complexity Assessment</h3>
        </div>

        {/* Impact Score */}
        <div className="lmnt-theme-background-bg p-5 rounded-lg border lmnt-theme-primary-border">
          <label className="block lmnt-theme-on-surface font-medium mb-2">
            Change Impact *
          </label>
          <p className="text-sm lmnt-theme-on-surface-variant mb-3">
            The level of impact to products, parts, documents, and/or processes. The change complexity 
            shall be determined as an outcome of the enterprise change assessment (ECA) during the change request.
          </p>
          <select
            value={impactScore}
            onChange={(e) => setImpactScore(Number(e.target.value))}
            className="w-full px-4 py-3 border lmnt-theme-primary-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 lmnt-theme-primary"
          >
            <option value={0}>Select impact level...</option>
            <option value={1}>1 - Low Impact</option>
            <option value={2}>2 - Medium Impact</option>
            <option value={3}>3 - High Impact</option>
          </select>
        </div>

        {/* Risk Score */}
        <div className="lmnt-theme-background-bg p-5 rounded-lg border lmnt-theme-primary-border">
          <label className="block lmnt-theme-on-surface font-medium mb-2">
            Risk *
          </label>
          <p className="text-sm lmnt-theme-on-surface-variant mb-3">
            The level of risk introduced due to the change including both strategic and operational risks. 
            Strategic risk threatens your organization's plans to achieve its business objectives. 
            Operational risk refers to potential losses from disruptions to day-to-day business operations, 
            affecting financial impact, business continuity, reputation, and compliance.
          </p>
          <select
            value={riskScore}
            onChange={(e) => setRiskScore(Number(e.target.value))}
            className="w-full px-4 py-3 border lmnt-theme-primary-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 lmnt-theme-primary"
          >
            <option value={0}>Select risk level...</option>
            <option value={1}>1 - Low Risk</option>
            <option value={2}>2 - Medium Risk</option>
            <option value={3}>3 - High Risk</option>
          </select>
        </div>

        {/* Cost Score */}
        <div className="lmnt-theme-background-bg p-5 rounded-lg border lmnt-theme-primary-border">
          <label className="block lmnt-theme-on-surface font-medium mb-2">
            Cost Estimation *
          </label>
          <p className="text-sm lmnt-theme-on-surface-variant mb-3">
            The associated costs to the business due to the change. This should include all direct, indirect, 
            fixed, and variable costs. Direct costs are linked to doing the work (e.g., specialized contractors, 
            software licenses, scrapping/reworking product). Indirect costs are the cost of doing business overall. 
            Fixed costs are one-off charges not linked to project length. Variable costs can change based on 
            project length (e.g., functional resources, external vendor contracts).
          </p>
          <select
            value={costScore}
            onChange={(e) => setCostScore(Number(e.target.value))}
            className="w-full px-4 py-3 border lmnt-theme-primary-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 lmnt-theme-primary"
          >
            <option value={0}>Select cost level...</option>
            <option value={1}>1 - Low Cost</option>
            <option value={2}>2 - Medium Cost</option>
            <option value={3}>3 - High Cost</option>
          </select>
        </div>

        {/* Complexity Calculation */}
        {totalScore > 0 && (
          <div className={`p-6 rounded-lg border-2 ${
            trackType === 'full' 
              ? 'lmnt-theme-primary-border lmnt-theme-surface-variant-bg' 
              : 'lmnt-theme-success-border lmnt-theme-background-bg'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold lmnt-theme-on-surface text-lg">Complexity Calculation</h4>
              <div className="text-right">
                <p className="text-sm lmnt-theme-on-surface-variant">Total Score</p>
                <p className={`text-3xl font-bold ${trackType === 'full' ? 'lmnt-theme-primary' : 'lmnt-theme-success'}`}>
                  {totalScore}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-sm lmnt-theme-on-surface-variant">Impact</p>
                <p className="text-2xl font-bold lmnt-theme-on-surface">{impactScore}</p>
              </div>
              <div className="text-center">
                <p className="text-sm lmnt-theme-on-surface-variant">Risk</p>
                <p className="text-2xl font-bold lmnt-theme-on-surface">{riskScore}</p>
              </div>
              <div className="text-center">
                <p className="text-sm lmnt-theme-on-surface-variant">Cost</p>
                <p className="text-2xl font-bold lmnt-theme-on-surface">{costScore}</p>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${
              trackType === 'full' 
                ? 'lmnt-theme-primary-bg lmnt-theme-on-primary' 
                : 'lmnt-theme-success-bg lmnt-theme-on-success'
            }`}>
              <p className="font-bold text-lg mb-2">
                {trackType === 'full' ? '🔴 Full Track Required' : '🟢 Fast Track Approved'}
              </p>
              <p className="text-sm">
                {trackType === 'full' 
                  ? 'Score ≥ 7: This change requires CRB (Change Review Board) approval for Change Requests and CIB (Change Implementation Board) approval for Change Notices.'
                  : 'Score < 7: This change qualifies for expedited Fast Track processing with lower impact, risk, and cost.'}
              </p>
            </div>
          </div>
        )}

        {/* Rationale */}
        <div>
          <label className="block lmnt-theme-on-surface font-medium mb-2">
            Decision Rationale *
          </label>
          <p className="text-sm lmnt-theme-on-surface-variant mb-3">
            Document the rationale for the High, Medium, or Low categorization for each criterion. 
            All stakeholders of the ECA team must agree on this decision.
          </p>
          <textarea
            value={rationale}
            onChange={(e) => setRationale(e.target.value)}
            rows={6}
            placeholder="Explain the reasoning behind each score selection...&#10;&#10;Include:&#10;• Why this impact level was chosen&#10;• Risk factors considered&#10;• Cost breakdown and justification&#10;• Agreement from all ECA team stakeholders"
            className="w-full px-4 py-3 border lmnt-theme-primary-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 lmnt-theme-primary resize-none"
          />
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
            <p className="lmnt-theme-on-surface-variant">Required ECA Types</p>
            <p className="lmnt-theme-on-surface font-medium">
              {changeData.requiredECATypes?.join(', ') || 'None'}
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
          Continue to Assessments
        </button>
      </div>
    </div>
  )
}

export default FullVsFastTrack
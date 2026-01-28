import React from 'react'
import { Download, CheckCircle, Send, FileSpreadsheet } from 'lucide-react'
import { exportToExcel } from '../utils/excelExport'

interface Props {
  changeData: any
  onBack: () => void
}

const ReviewExport: React.FC<Props> = ({ changeData, onBack }) => {
  const handleExport = () => {
    try {
      exportToExcel(changeData)
      alert('ECA document exported successfully! Check your downloads folder.')
    } catch (error) {
      console.error('Export error:', error)
      alert('Error exporting document. Please try again.')
    }
  }

  const handleSubmit = () => {
    alert('ECA submitted to approvers for review. The document will be uploaded to Windchill and routed for approval.')
  }

  const getExportTabsList = () => {
    const tabs = [
      'Instructions',
      'Scope of Change',
      'Full vs Fast Track'
    ]

    if (changeData.trackType === 'full') {
      tabs.push('CRB-CIB')
    }

    if (changeData.requiredECATypes?.includes('Product')) {
      tabs.push('Product ECA', 'Affected Items', 'Impact Analysis')
    }

    if (changeData.requiredECATypes?.includes('QSR')) {
      tabs.push('QSR ECA')
    }

    if (changeData.requiredECATypes?.some((type: string) => type.includes('Manufacturing'))) {
      tabs.push('Manufacturing ECA')
    }

    tabs.push('Minimum Deliverables')

    return tabs
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold lmnt-theme-primary mb-2">Review & Export</h2>
        <p className="lmnt-theme-on-surface">Review your assessment and export the ECA document</p>
      </div>

      {/* Summary Card */}
      <div className="lmnt-theme-success-bg lmnt-theme-on-success p-6 rounded-lg">
        <div className="flex items-start gap-3">
          <CheckCircle size={24} />
          <div>
            <h3 className="font-bold text-lg mb-2">Assessment Complete</h3>
            <p className="lmnt-theme-on-success-inactive">
              Your Engineering Change Assessment is ready for review and approval
            </p>
          </div>
        </div>
      </div>

      {/* Excel Export Information */}
      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg border-l-4 lmnt-theme-secondary-border">
        <div className="flex items-start gap-3">
          <FileSpreadsheet size={24} className="lmnt-theme-secondary mt-1" />
          <div className="flex-1">
            <h4 className="font-bold lmnt-theme-on-surface mb-3">Excel Export Tabs</h4>
            <p className="text-sm lmnt-theme-on-surface mb-3">
              The exported Excel file will contain the following tabs:
            </p>
            <div className="grid md:grid-cols-2 gap-2">
              {getExportTabsList().map((tab, index) => (
                <div key={index} className="flex items-center gap-2 text-sm lmnt-theme-on-surface">
                  <span className="lmnt-theme-secondary-bg lmnt-theme-on-secondary w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <span>{tab}</span>
                </div>
              ))}
            </div>
            <p className="text-sm lmnt-theme-on-surface-variant mt-4">
              Note: Unused tabs should be deleted before uploading to Windchill
            </p>
          </div>
        </div>
      </div>

      {/* Review Sections */}
      <div className="space-y-4">
        {/* Document Information */}
        <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg">
          <h3 className="font-bold lmnt-theme-on-surface mb-4">Document Information</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="lmnt-theme-on-surface-variant">ECR Number</p>
              <p className="lmnt-theme-on-surface font-medium">{changeData.ecrNumber}</p>
            </div>
            <div>
              <p className="lmnt-theme-on-surface-variant">Document Number</p>
              <p className="lmnt-theme-on-surface font-medium">{changeData.documentNumber}</p>
            </div>
            <div>
              <p className="lmnt-theme-on-surface-variant">Change Type</p>
              <p className="lmnt-theme-on-surface font-medium capitalize">{changeData.changeType}</p>
            </div>
            <div>
              <p className="lmnt-theme-on-surface-variant">Object Type</p>
              <p className="lmnt-theme-on-surface font-medium">{changeData.objectType}</p>
            </div>
          </div>
        </div>

        {/* Complexity & Track Type */}
        <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg">
          <h3 className="font-bold lmnt-theme-on-surface mb-4">Complexity Assessment</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p className="lmnt-theme-on-surface-variant">Total Complexity Score</p>
              <p className="lmnt-theme-on-surface font-medium text-2xl">{changeData.totalComplexityScore || 0}</p>
            </div>
            <div>
              <p className="lmnt-theme-on-surface-variant">Track Type</p>
              <p className={`font-medium text-2xl capitalize ${
                changeData.trackType === 'full' ? 'lmnt-theme-primary' : 'lmnt-theme-success'
              }`}>
                {changeData.trackType || 'Not determined'}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="lmnt-theme-on-surface-variant">Impact Score</p>
              <p className="lmnt-theme-on-surface font-medium">{changeData.complexityScores?.impact || 0}</p>
            </div>
            <div>
              <p className="lmnt-theme-on-surface-variant">Risk Score</p>
              <p className="lmnt-theme-on-surface font-medium">{changeData.complexityScores?.risk || 0}</p>
            </div>
            <div>
              <p className="lmnt-theme-on-surface-variant">Cost Score</p>
              <p className="lmnt-theme-on-surface font-medium">{changeData.complexityScores?.cost || 0}</p>
            </div>
          </div>
        </div>

        {/* Scope of Change */}
        <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg">
          <h3 className="font-bold lmnt-theme-on-surface mb-4">Scope of Change</h3>
          <div className="space-y-3">
            <div>
              <p className="lmnt-theme-on-surface-variant text-sm mb-1">Scope and Reason</p>
              <p className="lmnt-theme-on-surface">{changeData.scopeOfChange}</p>
            </div>
            <div>
              <p className="lmnt-theme-on-surface-variant text-sm mb-1">Summary</p>
              <p className="lmnt-theme-on-surface">{changeData.changeSummary}</p>
            </div>
          </div>
        </div>

        {/* Product Change Details */}
        {changeData.requiredECATypes?.includes('Product') && changeData.productData && (
          <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg">
            <h3 className="font-bold lmnt-theme-on-surface mb-4">Product Change Details</h3>
            <div className="space-y-3">
              <div>
                <p className="lmnt-theme-on-surface-variant text-sm mb-1">Product Change Criteria</p>
                <ul className="text-sm lmnt-theme-on-surface list-disc list-inside space-y-1">
                  {changeData.productTypeOptions?.includesPartObjects && (
                    <li>Includes part object types</li>
                  )}
                  {changeData.productTypeOptions?.includesProductDesignDatasets && (
                    <li>Includes Product Design Dataset document types - Released state</li>
                  )}
                  {changeData.productTypeOptions?.includesProtocolReport && (
                    <li>Includes protocol and/or report linked to parts or Product Design Datasets</li>
                  )}
                </ul>
              </div>
              <div>
                <p className="lmnt-theme-on-surface-variant text-sm mb-1">Affected Items</p>
                <p className="lmnt-theme-on-surface">{changeData.productData.bomItems?.length || 0} items identified</p>
              </div>
              <div>
                <p className="lmnt-theme-on-surface-variant text-sm mb-1">Impact Analysis</p>
                <p className="lmnt-theme-on-surface">{changeData.productData.impactAnalysis || 'Not provided'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Manufacturing Change Details */}
        {changeData.requiredECATypes?.some((type: string) => type.includes('Manufacturing')) && changeData.manufacturingData && (
          <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg">
            <h3 className="font-bold lmnt-theme-on-surface mb-4">Manufacturing Change Details</h3>
            <div className="space-y-3">
              <div>
                <p className="lmnt-theme-on-surface-variant text-sm mb-1">Impacted Objects</p>
                <p className="lmnt-theme-on-surface">{changeData.manufacturingData.impactedObjects}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="lmnt-theme-on-surface-variant text-sm mb-1">Change Initiator</p>
                  <p className="lmnt-theme-on-surface">{changeData.manufacturingData.changeInitiator}</p>
                </div>
                <div>
                  <p className="lmnt-theme-on-surface-variant text-sm mb-1">Change Leader</p>
                  <p className="lmnt-theme-on-surface">{changeData.manufacturingData.changeLeader}</p>
                </div>
                <div>
                  <p className="lmnt-theme-on-surface-variant text-sm mb-1">Implementation Lead</p>
                  <p className="lmnt-theme-on-surface">{changeData.manufacturingData.implementationLead}</p>
                </div>
              </div>
              <div>
                <p className="lmnt-theme-on-surface-variant text-sm mb-1">Assessments Completed</p>
                <p className="lmnt-theme-on-surface">
                  {changeData.manufacturingData.assessments?.filter((a: any) => a.answer).length || 0} / 
                  {changeData.manufacturingData.assessments?.length || 0}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6 border-t lmnt-theme-divider-primary">
        <button
          onClick={onBack}
          className="lmnt-theme-surface-variant-bg lmnt-theme-on-surface px-8 py-3 rounded-lg font-medium hover:opacity-90"
        >
          Back to Edit
        </button>
        <button
          onClick={handleExport}
          className="flex-1 lmnt-theme-secondary-bg lmnt-theme-on-secondary px-8 py-3 rounded-lg font-medium hover:opacity-90 flex items-center justify-center gap-2"
        >
          <Download size={20} />
          Export Excel Document
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 lmnt-theme-primary-bg lmnt-theme-on-primary px-8 py-3 rounded-lg font-medium hover:opacity-90 flex items-center justify-center gap-2"
        >
          <Send size={20} />
          Submit for Approval
        </button>
      </div>

      {/* Next Steps Information */}
      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg">
        <h4 className="font-bold lmnt-theme-on-surface mb-3">Next Steps</h4>
        <ul className="space-y-2 text-sm lmnt-theme-on-surface list-disc list-inside">
          <li>Export the ECA document as an Excel file</li>
          <li>Review the exported file and delete any unused tabs</li>
          <li>Save the file locally with 'ECA_' prefix for easy recognition</li>
          <li>Upload the ECA to the ECR's Attachments section in Windchill</li>
          <li>Complete the 'Analyze Change Request' task for the ECR</li>
          <li>Engineering Change Notice (ECN) will be created</li>
          <li>Change tasks will be generated based on this assessment</li>
          <li>Document will be routed to approvers for review</li>
          <li>If rejected, the assessment will be returned for revision</li>
        </ul>
      </div>
    </div>
  )
}

export default ReviewExport
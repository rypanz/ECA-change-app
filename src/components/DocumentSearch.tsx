import React, { useState } from 'react'
import { FileText, Package, Wrench } from 'lucide-react'

interface Props {
  changeData: any
  updateChangeData: (updates: any) => void
  onNext: () => void
}

const DocumentSearch: React.FC<Props> = ({ changeData, updateChangeData, onNext }) => {
  const [ecrNumber, setEcrNumber] = useState(changeData.ecrNumber || '')
  const [changeType, setChangeType] = useState<'product' | 'manufacturing' | null>(changeData.changeType || null)
  const [objectType, setObjectType] = useState(changeData.objectType || '')
  const [documentNumber, setDocumentNumber] = useState(changeData.documentNumber || '')

  // Product change type options
  const [includesPartObjects, setIncludesPartObjects] = useState(changeData.productTypeOptions?.includesPartObjects || false)
  const [includesProductDesignDatasets, setIncludesProductDesignDatasets] = useState(changeData.productTypeOptions?.includesProductDesignDatasets || false)
  const [includesProtocolReport, setIncludesProtocolReport] = useState(changeData.productTypeOptions?.includesProtocolReport || false)

  const handleTypeSelect = (type: 'product' | 'manufacturing') => {
    setChangeType(type)
    if (type === 'manufacturing') {
      // Clear product options if switching to manufacturing
      setIncludesPartObjects(false)
      setIncludesProductDesignDatasets(false)
      setIncludesProtocolReport(false)
    }
  }

  const handleContinue = () => {
    if (changeType === 'product') {
      updateChangeData({ 
        ecrNumber,
        documentNumber,
        changeType: 'product',
        objectType,
        productTypeOptions: {
          includesPartObjects,
          includesProductDesignDatasets,
          includesProtocolReport
        },
        requiredECATypes: ['Product']
      })
    } else {
      updateChangeData({ 
        ecrNumber,
        documentNumber,
        changeType: 'manufacturing',
        objectType,
        productTypeOptions: null,
        requiredECATypes: ['Manufacturing', 'QSR']
      })
    }
    onNext()
  }

  const isProductValid = changeType === 'product' && (includesPartObjects || includesProductDesignDatasets || includesProtocolReport)
  const isValid = ecrNumber && documentNumber && changeType && objectType && 
    (changeType === 'manufacturing' || isProductValid)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold lmnt-theme-primary mb-2">Engineering Change Request Information</h2>
        <p className="lmnt-theme-on-surface">Enter the basic information for this change request (Step 1)</p>
      </div>

      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg border-l-4 lmnt-theme-secondary-border">
        <div className="flex items-start gap-3">
          <FileText size={24} className="lmnt-theme-secondary mt-1" />
          <div>
            <h4 className="font-bold lmnt-theme-on-surface mb-2">Reference Documents</h4>
            <ul className="text-sm lmnt-theme-on-surface space-y-1">
              <li>• <strong>D-0000916903:</strong> ECA Requirements and Additional Details</li>
              <li>• <strong>D-0001048589:</strong> Object Types Reference</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ECR Number */}
      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg">
        <label className="block lmnt-theme-on-surface font-medium mb-2">
          ECR Number *
        </label>
        <input
          type="text"
          value={ecrNumber}
          onChange={(e) => setEcrNumber(e.target.value)}
          placeholder="Enter ECR number (e.g., ECR-2024-001)"
          className="w-full px-4 py-3 border lmnt-theme-primary-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 lmnt-theme-primary"
        />
        <p className="text-sm lmnt-theme-on-surface-variant mt-2">
          Engineering Change Request number from Windchill
        </p>
      </div>

      {/* Change Type Selection */}
      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg">
        <h3 className="font-bold lmnt-theme-on-surface mb-4">Change Type *</h3>
        <p className="text-sm lmnt-theme-on-surface-variant mb-4">
          Select either <strong>Product Change</strong> or <strong>Manufacturing/QSR Change</strong>. 
          A change can only be one type or the other, not both.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => handleTypeSelect('product')}
            className={`p-6 rounded-lg border-2 transition-all ${
              changeType === 'product'
                ? 'lmnt-theme-primary-border lmnt-theme-background-bg'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <Package size={40} className="lmnt-theme-primary mx-auto mb-3" />
            <h4 className="font-bold lmnt-theme-on-surface mb-2">Product Change</h4>
            <p className="lmnt-theme-on-surface text-sm">
              Changes affecting product design, specifications, or Bill of Materials (BOM)
            </p>
          </button>

          <button
            onClick={() => handleTypeSelect('manufacturing')}
            className={`p-6 rounded-lg border-2 transition-all ${
              changeType === 'manufacturing'
                ? 'lmnt-theme-primary-border lmnt-theme-background-bg'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <Wrench size={40} className="lmnt-theme-secondary mx-auto mb-3" />
            <h4 className="font-bold lmnt-theme-on-surface mb-2">Manufacturing/QSR Change</h4>
            <p className="lmnt-theme-on-surface text-sm">
              Changes affecting manufacturing processes, QSR datasets, or training documents
            </p>
          </button>
        </div>

        {/* Product Change Type Options */}
        {changeType === 'product' && (
          <div className="mt-6 p-4 lmnt-theme-background-bg rounded-lg border lmnt-theme-primary-border">
            <h4 className="font-bold lmnt-theme-on-surface mb-3">Product Change Criteria</h4>
            <p className="text-sm lmnt-theme-on-surface-variant mb-3">
              Select all that apply:
            </p>
            
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={includesPartObjects}
                  onChange={(e) => setIncludesPartObjects(e.target.checked)}
                  className="mt-1 w-5 h-5 lmnt-theme-primary"
                />
                <div className="flex-1">
                  <span className="lmnt-theme-on-surface font-medium group-hover:lmnt-theme-primary">
                    Includes part object types
                  </span>
                  <p className="text-sm lmnt-theme-on-surface-variant mt-1">
                    Physical parts, assemblies, or components in the product structure
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={includesProductDesignDatasets}
                  onChange={(e) => setIncludesProductDesignDatasets(e.target.checked)}
                  className="mt-1 w-5 h-5 lmnt-theme-primary"
                />
                <div className="flex-1">
                  <span className="lmnt-theme-on-surface font-medium group-hover:lmnt-theme-primary">
                    Includes Product Design Dataset document types - Released state
                  </span>
                  <p className="text-sm lmnt-theme-on-surface-variant mt-1">
                    Released design documentation, drawings, specifications, or technical datasets
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={includesProtocolReport}
                  onChange={(e) => setIncludesProtocolReport(e.target.checked)}
                  className="mt-1 w-5 h-5 lmnt-theme-primary"
                />
                <div className="flex-1">
                  <span className="lmnt-theme-on-surface font-medium group-hover:lmnt-theme-primary">
                    Includes protocol and/or report linked to parts or Product Design Datasets
                  </span>
                  <p className="text-sm lmnt-theme-on-surface-variant mt-1">
                    Test protocols, validation reports, or documentation linked to part/design changes
                  </p>
                </div>
              </label>
            </div>

            {!isProductValid && changeType === 'product' && (
              <div className="lmnt-theme-surface-variant-bg border-l-4 lmnt-theme-primary-border p-4 mt-4">
                <p className="text-sm lmnt-theme-on-surface">
                  ⚠️ Please select at least one product change criterion to continue
                </p>
              </div>
            )}
          </div>
        )}

        {/* Manufacturing/QSR Change Information */}
        {changeType === 'manufacturing' && (
          <div className="mt-6 p-4 lmnt-theme-background-bg rounded-lg border lmnt-theme-secondary-border">
            <h4 className="font-bold lmnt-theme-on-surface mb-3">Manufacturing/QSR Change Includes</h4>
            <ul className="space-y-2 text-sm lmnt-theme-on-surface list-disc list-inside">
              <li>QSR Dataset document types</li>
              <li>Quality Dataset documents (Supplier Quality Requirements - Released State)</li>
              <li>Training documents</li>
              <li>Product Design Datasets used in manufacturing</li>
              <li>Manufacturing Dataset documents (O'Hara, Rydalmere, EMO, Heredia, Indianola, Saxonburg sites)</li>
              <li>Service Datasets</li>
            </ul>
          </div>
        )}
      </div>

      {/* Object Type */}
      {changeType && (
        <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg">
          <label className="block lmnt-theme-on-surface font-medium mb-2">
            Object Type *
          </label>
          <select
            value={objectType}
            onChange={(e) => setObjectType(e.target.value)}
            className="w-full px-4 py-3 border lmnt-theme-primary-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 lmnt-theme-primary"
          >
            <option value="">Select object type...</option>
            {changeType === 'product' ? (
              <>
                <option value="Part">Part</option>
                <option value="Assembly">Assembly</option>
                <option value="Product Design Dataset">Product Design Dataset</option>
                <option value="Drawing">Drawing</option>
                <option value="Specification">Specification</option>
                <option value="Protocol">Protocol</option>
                <option value="Report">Report</option>
              </>
            ) : (
              <>
                <option value="QSR Dataset">QSR Dataset</option>
                <option value="Quality Dataset">Quality Dataset</option>
                <option value="Training Document">Training Document</option>
                <option value="Manufacturing Dataset">Manufacturing Dataset</option>
                <option value="Service Dataset">Service Dataset</option>
                <option value="Work Instruction">Work Instruction</option>
                <option value="SOP">SOP</option>
              </>
            )}
          </select>
          <p className="text-sm lmnt-theme-on-surface-variant mt-2">
            Select the type of object being changed (reference D-0001048589)
          </p>
        </div>
      )}

      {/* Document Number */}
      {changeType && objectType && (
        <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg">
          <label className="block lmnt-theme-on-surface font-medium mb-2">
            Document Number *
          </label>
          <input
            type="text"
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
            placeholder="Enter document number (e.g., D-000XXXXXXX or Part Number)"
            className="w-full px-4 py-3 border lmnt-theme-primary-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 lmnt-theme-primary"
          />
          <p className="text-sm lmnt-theme-on-surface-variant mt-2">
            Enter the document or part number from Windchill
          </p>
        </div>
      )}

      <div className="flex justify-end pt-6 border-t lmnt-theme-divider-primary">
        <button
          onClick={handleContinue}
          disabled={!isValid}
          className="lmnt-theme-primary-bg lmnt-theme-on-primary px-8 py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
        >
          Continue to Scope of Change
        </button>
      </div>
    </div>
  )
}

export default DocumentSearch
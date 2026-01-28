import React, { useState } from 'react'
import { FileText, Package, Wrench, AlertCircle } from 'lucide-react'

interface Props {
  changeData: any
  updateChangeData: (updates: any) => void
  onNext: () => void
}

const DocumentSearch: React.FC<Props> = ({ changeData, updateChangeData, onNext }) => {
  const [ecrNumber, setEcrNumber] = useState(changeData.ecrNumber || '')
  const [changeType, setChangeType] = useState<'product' | 'manufacturing' | null>(changeData.changeType || null)

  // QSR determination questions
  const [includesQSRDatasets, setIncludesQSRDatasets] = useState(changeData.qsrDetermination?.includesQSRDatasets || false)
  const [includesQualityDatasets, setIncludesQualityDatasets] = useState(changeData.qsrDetermination?.includesQualityDatasets || false)
  const [includesTrainingDocs, setIncludesTrainingDocs] = useState(changeData.qsrDetermination?.includesTrainingDocs || false)
  const [noneOfAboveQSR, setNoneOfAboveQSR] = useState(changeData.qsrDetermination?.noneOfAboveQSR || false)

  // Product change type options
  const [includesPartObjects, setIncludesPartObjects] = useState(changeData.productTypeOptions?.includesPartObjects || false)
  const [includesProductDesignDatasets, setIncludesProductDesignDatasets] = useState(changeData.productTypeOptions?.includesProductDesignDatasets || false)
  const [includesProtocolReport, setIncludesProtocolReport] = useState(changeData.productTypeOptions?.includesProtocolReport || false)

  // Manufacturing sub-questions (EM vs SD determination)
  const [includesProductDesignInMfg, setIncludesProductDesignInMfg] = useState(changeData.manufacturingDetermination?.includesProductDesignInMfg || false)
  const [includesMfgDatasetsEM, setIncludesMfgDatasetsEM] = useState(changeData.manufacturingDetermination?.includesMfgDatasetsEM || false)
  const [includesServiceDatasets, setIncludesServiceDatasets] = useState(changeData.manufacturingDetermination?.includesServiceDatasets || false)
  const [includesMfgDatasetsSD, setIncludesMfgDatasetsSD] = useState(changeData.manufacturingDetermination?.includesMfgDatasetsSD || false)

  const handleTypeSelect = (type: 'product' | 'manufacturing') => {
    setChangeType(type)
    if (type === 'product') {
      // Clear manufacturing options if switching to product
      setIncludesProductDesignInMfg(false)
      setIncludesMfgDatasetsEM(false)
      setIncludesServiceDatasets(false)
      setIncludesMfgDatasetsSD(false)
    } else {
      // Clear product options if switching to manufacturing
      setIncludesPartObjects(false)
      setIncludesProductDesignDatasets(false)
      setIncludesProtocolReport(false)
    }
  }

  const handleQSRCheckbox = (field: 'qsr' | 'quality' | 'training' | 'none', checked: boolean) => {
    if (field === 'none') {
      setNoneOfAboveQSR(checked)
      if (checked) {
        setIncludesQSRDatasets(false)
        setIncludesQualityDatasets(false)
        setIncludesTrainingDocs(false)
      }
    } else {
      if (checked) {
        setNoneOfAboveQSR(false)
      }
      
      switch (field) {
        case 'qsr':
          setIncludesQSRDatasets(checked)
          break
        case 'quality':
          setIncludesQualityDatasets(checked)
          break
        case 'training':
          setIncludesTrainingDocs(checked)
          break
      }
    }
  }

  const handleEMCheckbox = (field: 'design' | 'mfg' | 'service', checked: boolean) => {
    // If checking any EM box, uncheck all SD boxes
    if (checked) {
      setIncludesMfgDatasetsSD(false)
    }

    switch (field) {
      case 'design':
        setIncludesProductDesignInMfg(checked)
        break
      case 'mfg':
        setIncludesMfgDatasetsEM(checked)
        break
      case 'service':
        setIncludesServiceDatasets(checked)
        break
    }
  }

  const handleSDCheckbox = (checked: boolean) => {
    // If checking SD box, uncheck all EM boxes
    if (checked) {
      setIncludesProductDesignInMfg(false)
      setIncludesMfgDatasetsEM(false)
      setIncludesServiceDatasets(false)
    }
    setIncludesMfgDatasetsSD(checked)
  }

  const handleContinue = () => {
    const needsQSR = includesQSRDatasets || includesQualityDatasets || includesTrainingDocs
    const needsEM = includesProductDesignInMfg || includesMfgDatasetsEM || includesServiceDatasets
    const needsSD = includesMfgDatasetsSD

    // Determine required ECA types
    const requiredECATypes: string[] = []
    if (needsQSR) requiredECATypes.push('QSR')
    if (changeType === 'product') requiredECATypes.push('Product')
    if (changeType === 'manufacturing') {
      if (needsEM) requiredECATypes.push('EM')
      if (needsSD) requiredECATypes.push('SD')
    }

    updateChangeData({ 
      ecrNumber,
      changeType,
      qsrDetermination: {
        includesQSRDatasets,
        includesQualityDatasets,
        includesTrainingDocs,
        noneOfAboveQSR,
        needsQSR
      },
      productTypeOptions: changeType === 'product' ? {
        includesPartObjects,
        includesProductDesignDatasets,
        includesProtocolReport
      } : null,
      manufacturingDetermination: changeType === 'manufacturing' ? {
        includesProductDesignInMfg,
        includesMfgDatasetsEM,
        includesServiceDatasets,
        includesMfgDatasetsSD,
        needsEM,
        needsSD
      } : null,
      requiredECATypes
    })
    onNext()
  }

  const isProductValid = changeType === 'product' && (includesPartObjects || includesProductDesignDatasets || includesProtocolReport)
  const isManufacturingValid = changeType === 'manufacturing' && (
    includesProductDesignInMfg || includesMfgDatasetsEM || includesServiceDatasets || includesMfgDatasetsSD
  )
  const isQSRValid = includesQSRDatasets || includesQualityDatasets || includesTrainingDocs || noneOfAboveQSR
  const isValid = ecrNumber && changeType && isQSRValid &&
    (isProductValid || isManufacturingValid)

  const needsEM = includesProductDesignInMfg || includesMfgDatasetsEM || includesServiceDatasets
  const needsSD = includesMfgDatasetsSD

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

      {/* QSR Determination Questions */}
      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg">
        <h3 className="font-bold lmnt-theme-on-surface mb-4">QSR Assessment Determination</h3>
        <p className="text-sm lmnt-theme-on-surface-variant mb-4">
          Answer the following questions to determine if a QSR assessment will be required later in the workflow.
        </p>

        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={includesQSRDatasets}
              onChange={(e) => handleQSRCheckbox('qsr', e.target.checked)}
              className="mt-1 w-5 h-5 lmnt-theme-primary"
            />
            <div className="flex-1">
              <span className="lmnt-theme-on-surface font-medium group-hover:lmnt-theme-primary">
                Does the change include QSR Dataset document types?
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={includesQualityDatasets}
              onChange={(e) => handleQSRCheckbox('quality', e.target.checked)}
              className="mt-1 w-5 h-5 lmnt-theme-primary"
            />
            <div className="flex-1">
              <span className="lmnt-theme-on-surface font-medium group-hover:lmnt-theme-primary">
                Does the change include Quality Dataset document types with subtype of 'Supplier Quality' and class of 'Supplier Quality Requirement' - Released State?
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={includesTrainingDocs}
              onChange={(e) => handleQSRCheckbox('training', e.target.checked)}
              className="mt-1 w-5 h-5 lmnt-theme-primary"
            />
            <div className="flex-1">
              <span className="lmnt-theme-on-surface font-medium group-hover:lmnt-theme-primary">
                Does the change include a Training document?
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={noneOfAboveQSR}
              onChange={(e) => handleQSRCheckbox('none', e.target.checked)}
              className="mt-1 w-5 h-5 lmnt-theme-primary"
            />
            <div className="flex-1">
              <span className="lmnt-theme-on-surface font-medium group-hover:lmnt-theme-primary">
                None of the above
              </span>
            </div>
          </label>
        </div>

        {(includesQSRDatasets || includesQualityDatasets || includesTrainingDocs) && (
          <div className="lmnt-theme-background-bg border-l-4 lmnt-theme-secondary-border p-4 mt-4">
            <div className="flex items-start gap-2">
              <AlertCircle size={20} className="lmnt-theme-secondary mt-0.5" />
              <p className="text-sm lmnt-theme-on-surface">
                <strong>QSR Assessment Required:</strong> Based on your selections, a QSR assessment page will be included in your workflow.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Change Type Selection */}
      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg">
        <h3 className="font-bold lmnt-theme-on-surface mb-4">Change Type *</h3>
        <p className="text-sm lmnt-theme-on-surface-variant mb-4">
          Select either <strong>Product Change</strong> or <strong>Manufacturing Change</strong>. 
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
            <h4 className="font-bold lmnt-theme-on-surface mb-2">Manufacturing Change</h4>
            <p className="lmnt-theme-on-surface text-sm">
              Changes affecting manufacturing processes or datasets
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
              <div className="lmnt-theme-background-bg border-l-4 lmnt-theme-secondary-border p-4 mt-4">
                <p className="text-sm lmnt-theme-on-surface font-medium">
                  ℹ️ If none of these apply, please select <strong>Manufacturing Change</strong> instead.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Manufacturing Change Sub-Questions */}
        {changeType === 'manufacturing' && (
          <div className="mt-6 p-4 lmnt-theme-background-bg rounded-lg border lmnt-theme-secondary-border">
            <h4 className="font-bold lmnt-theme-on-surface mb-3">Manufacturing Change Determination</h4>
            <p className="text-sm lmnt-theme-on-surface-variant mb-4">
              Answer the following to determine which manufacturing assessment page(s) will be required. 
              <strong className="lmnt-theme-primary"> Note: You can only select either EM or SD criteria, not both.</strong>
            </p>

            <div className="space-y-4">
              <div className="border lmnt-theme-primary-border rounded-lg p-4">
                <h5 className="font-medium lmnt-theme-on-surface mb-3">EM (Engineering Manufacturing) Assessment Criteria</h5>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={includesProductDesignInMfg}
                      onChange={(e) => handleEMCheckbox('design', e.target.checked)}
                      className="mt-1 w-5 h-5 lmnt-theme-primary"
                    />
                    <div className="flex-1">
                      <span className="lmnt-theme-on-surface font-medium group-hover:lmnt-theme-primary">
                        Does the change include Product Design Dataset document types used in manufacturing?
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={includesMfgDatasetsEM}
                      onChange={(e) => handleEMCheckbox('mfg', e.target.checked)}
                      className="mt-1 w-5 h-5 lmnt-theme-primary"
                    />
                    <div className="flex-1">
                      <span className="lmnt-theme-on-surface font-medium group-hover:lmnt-theme-primary">
                        Does the change include Manufacturing Dataset document types for impacted sites O'Hara, Rydalmere, or EMO?
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={includesServiceDatasets}
                      onChange={(e) => handleEMCheckbox('service', e.target.checked)}
                      className="mt-1 w-5 h-5 lmnt-theme-primary"
                    />
                    <div className="flex-1">
                      <span className="lmnt-theme-on-surface font-medium group-hover:lmnt-theme-primary">
                        Does the change include Service Datasets?
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="border lmnt-theme-secondary-border rounded-lg p-4">
                <h5 className="font-medium lmnt-theme-on-surface mb-3">SD (Site-Specific) Assessment Criteria</h5>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={includesMfgDatasetsSD}
                    onChange={(e) => handleSDCheckbox(e.target.checked)}
                    className="mt-1 w-5 h-5 lmnt-theme-primary"
                  />
                  <div className="flex-1">
                    <span className="lmnt-theme-on-surface font-medium group-hover:lmnt-theme-primary">
                      Does the change include Manufacturing Dataset document types for impacted sites exclusively at Heredia, Indianola and/or Saxonburg?
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {needsEM && !needsSD && (
              <div className="lmnt-theme-background-bg border-l-4 lmnt-theme-secondary-border p-4 mt-4">
                <div className="flex items-start gap-2">
                  <AlertCircle size={20} className="lmnt-theme-secondary mt-0.5" />
                  <p className="text-sm lmnt-theme-on-surface">
                    <strong>EM Assessment Required:</strong> Based on your selections, an EM (Engineering Manufacturing) assessment page will be included in your workflow.
                  </p>
                </div>
              </div>
            )}

            {needsSD && !needsEM && (
              <div className="lmnt-theme-background-bg border-l-4 lmnt-theme-secondary-border p-4 mt-4">
                <div className="flex items-start gap-2">
                  <AlertCircle size={20} className="lmnt-theme-secondary mt-0.5" />
                  <p className="text-sm lmnt-theme-on-surface">
                    <strong>SD Assessment Required:</strong> Based on your selections, an SD (Site-Specific) assessment page will be included in your workflow.
                  </p>
                </div>
              </div>
            )}

            {!isManufacturingValid && changeType === 'manufacturing' && (
              <div className="lmnt-theme-background-bg border-l-4 lmnt-theme-secondary-border p-4 mt-4">
                <p className="text-sm lmnt-theme-on-surface font-medium">
                  ℹ️ If none of these apply, please select <strong>Product Change</strong> instead.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

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
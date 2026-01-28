import React, { useState } from 'react'
import { Plus, Trash2, Upload, Download, HelpCircle } from 'lucide-react'

interface Props {
  changeData: any
  updateChangeData: (updates: any) => void
  onNext: () => void
  onBack: () => void
}

interface BOMItem {
  id: string
  partNumber: string
  description: string
  bomStructure: 'N/A' | 'structure' | 'where used' | 'source/start' | ''
  affected: 'yes' | 'no' | ''
  interchangeable: 'yes' | 'no' | ''
  partDesign: 'EM' | 'SD' | 'SW' | 'Labeling' | 'Packaging' | ''
  designInput: 'yes' | 'no' | ''
  designOutput: 'yes' | 'no' | ''
  designTesting: 'yes' | 'no' | ''
  designVV: 'yes' | 'no' | ''
  usability: 'yes' | 'no' | ''
  sourcing: 'yes' | 'no' | ''
  manufacturing: 'yes' | 'no' | ''
  service: 'yes' | 'no' | ''
  fieldedProduct: 'yes' | 'no' | ''
  regulatoryImpact: 'yes' | 'no' | ''
}

interface ColumnHelp {
  title: string
  description: string
}

const ProductChange: React.FC<Props> = ({ changeData, updateChangeData, onNext, onBack }) => {
  const [bomItems, setBomItems] = useState<BOMItem[]>(changeData.productData?.bomItems || [])
  const [additionalNotes, setAdditionalNotes] = useState(changeData.productData?.additionalNotes || '')
  const [showHelp, setShowHelp] = useState<string | null>(null)

  const columnHelp: { [key: string]: ColumnHelp } = {
    bomStructure: {
      title: 'BOM Structure',
      description: 'Indicates how this part was identified in the BOM hierarchy (Structure export, Where Used export, or Source/Starting part)'
    },
    affected: {
      title: 'Affected?',
      description: 'Is this part affected by the change?'
    },
    interchangeable: {
      title: 'Interchangeable?',
      description: 'Is this part interchangeable with previous versions?'
    },
    partDesign: {
      title: 'Part Design?',
      description: 'What type of design discipline does this part belong to? (EM=Electro-Mechanical, SD=Sterile Disposables, SW=Software, Labeling, Packaging)'
    },
    designInput: {
      title: 'Design Input',
      description: 'Requirements: Are the requirements of this part affected?'
    },
    designOutput: {
      title: 'Design Output',
      description: 'Is the drawing / specification of this part affected?'
    },
    designTesting: {
      title: 'Design Testing',
      description: 'RRT/DET: Is any RRT/DET testing required for this part?'
    },
    designVV: {
      title: 'Design V&V',
      description: 'Is any V&V testing required for this part?'
    },
    usability: {
      title: 'Usability',
      description: 'HFE: Is any HFE (Human Factors Engineering) testing required for this part?'
    },
    sourcing: {
      title: 'Sourcing (Buy)',
      description: 'Make vs. Buy: Is this part purchased (Buy) or Manufactured (Make)?'
    },
    manufacturing: {
      title: 'Manufacturing (Make)',
      description: 'Is this part manufactured internally?'
    },
    service: {
      title: 'Service (Serviceable)',
      description: 'Is the part serviceable in the field?'
    },
    fieldedProduct: {
      title: 'Fielded Product',
      description: 'Is the part used in a fielded product?'
    },
    regulatoryImpact: {
      title: 'Regulatory Impact',
      description: 'Does the change to this part have any Regulatory Impact on fielded product?'
    }
  }

  const addBOMItem = () => {
    setBomItems([...bomItems, {
      id: Date.now().toString(),
      partNumber: '',
      description: '',
      bomStructure: '',
      affected: '',
      interchangeable: '',
      partDesign: '',
      designInput: '',
      designOutput: '',
      designTesting: '',
      designVV: '',
      usability: '',
      sourcing: '',
      manufacturing: '',
      service: '',
      fieldedProduct: '',
      regulatoryImpact: ''
    }])
  }

  const removeBOMItem = (id: string) => {
    setBomItems(bomItems.filter(item => item.id !== id))
  }

  const updateBOMItem = (id: string, field: keyof BOMItem, value: string) => {
    setBomItems(bomItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const handleWindchillImport = async () => {
    // TODO: Implement Windchill API integration
    alert('Windchill API import will be implemented. This will fetch BOM data from Windchill based on the document number.')
    
    // Placeholder for API integration
    // const response = await fetch(`/api/windchill/bom/${changeData.documentNumber}`)
    // const data = await response.json()
    // setBomItems(data.items)
  }

  const handleContinue = () => {
    updateChangeData({
      productData: {
        bomItems,
        additionalNotes
      }
    })
    onNext()
  }

  const HelpIcon: React.FC<{ columnKey: string }> = ({ columnKey }) => (
    <div className="relative inline-block ml-1">
      <button
        type="button"
        onMouseEnter={() => setShowHelp(columnKey)}
        onMouseLeave={() => setShowHelp(null)}
        className="lmnt-theme-secondary hover:opacity-80 transition-opacity"
      >
        <HelpCircle size={16} />
      </button>
      {showHelp === columnKey && (
        <div className="absolute z-50 w-64 p-3 lmnt-theme-background-bg border-2 lmnt-theme-secondary-border rounded-lg shadow-lg left-0 top-6">
          <p className="font-bold lmnt-theme-on-surface text-sm mb-1">
            {columnHelp[columnKey].title}
          </p>
          <p className="text-xs lmnt-theme-on-surface-variant">
            {columnHelp[columnKey].description}
          </p>
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold lmnt-theme-primary mb-2">Product Affected Items</h2>
        <p className="lmnt-theme-on-surface">Complete the Bill of Materials and impact analysis (Step {changeData.qsrDetermination?.needsQSR ? '5' : '4'})</p>
      </div>

      {/* Current Change Summary */}
      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg border-l-4 lmnt-theme-secondary-border">
        <h4 className="font-bold lmnt-theme-on-surface mb-3">Change Information</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="lmnt-theme-on-surface-variant">ECR Number</p>
            <p className="lmnt-theme-on-surface font-medium">{changeData.ecrNumber}</p>
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
            <p className="lmnt-theme-on-surface-variant">Complexity Score</p>
            <p className="lmnt-theme-on-surface font-medium">{changeData.totalComplexityScore || 0}</p>
          </div>
        </div>
      </div>

      {/* BOM Import Options */}
      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg">
        <h3 className="font-bold lmnt-theme-on-surface mb-4">Bill of Materials (BOM) Import</h3>
        <p className="text-sm lmnt-theme-on-surface-variant mb-4">
          Import BOM data from Windchill API or upload Structure/Where Used exports manually
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <button 
            onClick={handleWindchillImport}
            className="lmnt-theme-primary-bg lmnt-theme-on-primary px-4 py-3 rounded-lg font-medium hover:opacity-90 flex items-center justify-center gap-2"
          >
            <Download size={20} />
            Import from Windchill
          </button>
          <button className="lmnt-theme-secondary-bg lmnt-theme-on-secondary px-4 py-3 rounded-lg font-medium hover:opacity-90 flex items-center justify-center gap-2">
            <Upload size={20} />
            Upload Structure Export
          </button>
          <button className="lmnt-theme-secondary-bg lmnt-theme-on-secondary px-4 py-3 rounded-lg font-medium hover:opacity-90 flex items-center justify-center gap-2">
            <Upload size={20} />
            Upload Where Used Export
          </button>
        </div>
      </div>

      {/* Affected Items Table */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold lmnt-theme-on-surface">Affected Items</h3>
          <button
            onClick={addBOMItem}
            className="lmnt-theme-primary-bg lmnt-theme-on-primary px-4 py-2 rounded-lg font-medium hover:opacity-90 flex items-center gap-2"
          >
            <Plus size={20} />
            Add Item Manually
          </button>
        </div>

        {bomItems.length === 0 ? (
          <div className="lmnt-theme-surface-variant-bg p-8 rounded-lg text-center">
            <p className="lmnt-theme-on-surface-variant">
              No items added yet. Import from Windchill, upload a file, or add items manually.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border lmnt-theme-primary-border text-sm">
              <thead className="lmnt-theme-surface-variant-bg">
                <tr>
                  <th className="px-3 py-2 text-left lmnt-theme-on-surface font-medium border-r">Part Number</th>
                  <th className="px-3 py-2 text-left lmnt-theme-on-surface font-medium border-r">Description</th>
                  <th className="px-3 py-2 text-left lmnt-theme-on-surface font-medium border-r">
                    <div className="flex items-center">
                      BOM Structure
                      <HelpIcon columnKey="bomStructure" />
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left lmnt-theme-on-surface font-medium border-r">
                    <div className="flex items-center">
                      Affected?
                      <HelpIcon columnKey="affected" />
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left lmnt-theme-on-surface font-medium border-r">
                    <div className="flex items-center">
                      Interchangeable?
                      <HelpIcon columnKey="interchangeable" />
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left lmnt-theme-on-surface font-medium border-r">
                    <div className="flex items-center">
                      Part Design?
                      <HelpIcon columnKey="partDesign" />
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left lmnt-theme-on-surface font-medium border-r">
                    <div className="flex items-center">
                      Design Input?
                      <HelpIcon columnKey="designInput" />
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left lmnt-theme-on-surface font-medium border-r">
                    <div className="flex items-center">
                      Design Output?
                      <HelpIcon columnKey="designOutput" />
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left lmnt-theme-on-surface font-medium border-r">
                    <div className="flex items-center">
                      Design Testing?
                      <HelpIcon columnKey="designTesting" />
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left lmnt-theme-on-surface font-medium border-r">
                    <div className="flex items-center">
                      Design V&V?
                      <HelpIcon columnKey="designVV" />
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left lmnt-theme-on-surface font-medium border-r">
                    <div className="flex items-center">
                      Usability?
                      <HelpIcon columnKey="usability" />
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left lmnt-theme-on-surface font-medium border-r">
                    <div className="flex items-center">
                      Sourcing? (Buy)
                      <HelpIcon columnKey="sourcing" />
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left lmnt-theme-on-surface font-medium border-r">
                    <div className="flex items-center">
                      Manufacturing? (Make)
                      <HelpIcon columnKey="manufacturing" />
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left lmnt-theme-on-surface font-medium border-r">
                    <div className="flex items-center">
                      Service? (Serviceable)
                      <HelpIcon columnKey="service" />
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left lmnt-theme-on-surface font-medium border-r">
                    <div className="flex items-center">
                      Fielded Product?
                      <HelpIcon columnKey="fieldedProduct" />
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left lmnt-theme-on-surface font-medium border-r">
                    <div className="flex items-center">
                      Regulatory Impact?
                      <HelpIcon columnKey="regulatoryImpact" />
                    </div>
                  </th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {bomItems.map((item) => (
                  <tr key={item.id} className="border-t lmnt-theme-divider-primary">
                    <td className="px-3 py-2 border-r">
                      <input
                        type="text"
                        value={item.partNumber}
                        onChange={(e) => updateBOMItem(item.id, 'partNumber', e.target.value)}
                        className="w-32 px-2 py-1 border lmnt-theme-primary-border rounded text-sm"
                        placeholder="P-000XXX"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateBOMItem(item.id, 'description', e.target.value)}
                        className="w-48 px-2 py-1 border lmnt-theme-primary-border rounded text-sm"
                        placeholder="Description"
                      />
                    </td>
                    <td className="px-3 py-2 border-r">
                      <select
                        value={item.bomStructure}
                        onChange={(e) => updateBOMItem(item.id, 'bomStructure', e.target.value)}
                        className="w-32 px-2 py-1 border lmnt-theme-primary-border rounded text-sm"
                      >
                        <option value="">--</option>
                        <option value="N/A">N/A</option>
                        <option value="structure">Structure</option>
                        <option value="where used">Where Used</option>
                        <option value="source/start">Source/Start</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 border-r">
                      <select
                        value={item.affected}
                        onChange={(e) => updateBOMItem(item.id, 'affected', e.target.value)}
                        className="w-20 px-2 py-1 border lmnt-theme-primary-border rounded text-sm"
                      >
                        <option value="">--</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 border-r">
                      <select
                        value={item.interchangeable}
                        onChange={(e) => updateBOMItem(item.id, 'interchangeable', e.target.value)}
                        className="w-20 px-2 py-1 border lmnt-theme-primary-border rounded text-sm"
                      >
                        <option value="">--</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 border-r">
                      <select
                        value={item.partDesign}
                        onChange={(e) => updateBOMItem(item.id, 'partDesign', e.target.value)}
                        className="w-28 px-2 py-1 border lmnt-theme-primary-border rounded text-sm"
                      >
                        <option value="">--</option>
                        <option value="EM">EM</option>
                        <option value="SD">SD</option>
                        <option value="SW">SW</option>
                        <option value="Labeling">Labeling</option>
                        <option value="Packaging">Packaging</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 border-r">
                      <select
                        value={item.designInput}
                        onChange={(e) => updateBOMItem(item.id, 'designInput', e.target.value)}
                        className="w-20 px-2 py-1 border lmnt-theme-primary-border rounded text-sm"
                      >
                        <option value="">--</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 border-r">
                      <select
                        value={item.designOutput}
                        onChange={(e) => updateBOMItem(item.id, 'designOutput', e.target.value)}
                        className="w-20 px-2 py-1 border lmnt-theme-primary-border rounded text-sm"
                      >
                        <option value="">--</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 border-r">
                      <select
                        value={item.designTesting}
                        onChange={(e) => updateBOMItem(item.id, 'designTesting', e.target.value)}
                        className="w-20 px-2 py-1 border lmnt-theme-primary-border rounded text-sm"
                      >
                        <option value="">--</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 border-r">
                      <select
                        value={item.designVV}
                        onChange={(e) => updateBOMItem(item.id, 'designVV', e.target.value)}
                        className="w-20 px-2 py-1 border lmnt-theme-primary-border rounded text-sm"
                      >
                        <option value="">--</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 border-r">
                      <select
                        value={item.usability}
                        onChange={(e) => updateBOMItem(item.id, 'usability', e.target.value)}
                        className="w-20 px-2 py-1 border lmnt-theme-primary-border rounded text-sm"
                      >
                        <option value="">--</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 border-r">
                      <select
                        value={item.sourcing}
                        onChange={(e) => updateBOMItem(item.id, 'sourcing', e.target.value)}
                        className="w-20 px-2 py-1 border lmnt-theme-primary-border rounded text-sm"
                      >
                        <option value="">--</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 border-r">
                      <select
                        value={item.manufacturing}
                        onChange={(e) => updateBOMItem(item.id, 'manufacturing', e.target.value)}
                        className="w-20 px-2 py-1 border lmnt-theme-primary-border rounded text-sm"
                      >
                        <option value="">--</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 border-r">
                      <select
                        value={item.service}
                        onChange={(e) => updateBOMItem(item.id, 'service', e.target.value)}
                        className="w-20 px-2 py-1 border lmnt-theme-primary-border rounded text-sm"
                      >
                        <option value="">--</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 border-r">
                      <select
                        value={item.fieldedProduct}
                        onChange={(e) => updateBOMItem(item.id, 'fieldedProduct', e.target.value)}
                        className="w-20 px-2 py-1 border lmnt-theme-primary-border rounded text-sm"
                      >
                        <option value="">--</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 border-r">
                      <select
                        value={item.regulatoryImpact}
                        onChange={(e) => updateBOMItem(item.id, 'regulatoryImpact', e.target.value)}
                        className="w-20 px-2 py-1 border lmnt-theme-primary-border rounded text-sm"
                      >
                        <option value="">--</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => removeBOMItem(item.id)}
                        className="lmnt-theme-danger p-2 rounded hover:opacity-80"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Additional Notes */}
      <div>
        <label className="block lmnt-theme-on-surface font-medium mb-2">
          Additional Notes (Optional)
        </label>
        <textarea
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          rows={4}
          placeholder="Add any additional notes or context about the affected items..."
          className="w-full px-4 py-3 border lmnt-theme-primary-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 lmnt-theme-primary resize-none"
        />
        <p className="text-sm lmnt-theme-on-surface-variant mt-2">
          Optional field for any additional information about the product changes
        </p>
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
          Continue to Product ECA
        </button>
      </div>
    </div>
  )
}

export default ProductChange
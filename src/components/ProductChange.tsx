import React, { useState } from 'react'
import { Plus, Trash2, Upload, Download } from 'lucide-react'

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
  action: string
  cost: string
  resource: string
  time: string
}

const ProductChange: React.FC<Props> = ({ changeData, updateChangeData, onNext, onBack }) => {
  const [bomItems, setBomItems] = useState<BOMItem[]>(changeData.productData?.bomItems || [])
  const [impactAnalysis, setImpactAnalysis] = useState(changeData.productData?.impactAnalysis || '')

  const addBOMItem = () => {
    setBomItems([...bomItems, {
      id: Date.now().toString(),
      partNumber: '',
      description: '',
      action: '',
      cost: '',
      resource: '',
      time: ''
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
        impactAnalysis
      }
    })
    onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold lmnt-theme-primary mb-2">Product Change Assessment</h2>
        <p className="lmnt-theme-on-surface">Complete the Bill of Materials and impact analysis (Step 5)</p>
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
            <p className="lmnt-theme-on-surface-variant">Document Number</p>
            <p className="lmnt-theme-on-surface font-medium">{changeData.documentNumber}</p>
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
        <p className="text-xs lmnt-theme-on-surface-variant mt-3">
          <strong>Note:</strong> The Windchill import will automatically fetch Structure and Where Used data for document {changeData.documentNumber}
        </p>
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
            <table className="w-full border lmnt-theme-primary-border">
              <thead className="lmnt-theme-surface-variant-bg">
                <tr>
                  <th className="px-4 py-3 text-left lmnt-theme-on-surface font-medium">Part Number</th>
                  <th className="px-4 py-3 text-left lmnt-theme-on-surface font-medium">Description</th>
                  <th className="px-4 py-3 text-left lmnt-theme-on-surface font-medium">Action Required</th>
                  <th className="px-4 py-3 text-left lmnt-theme-on-surface font-medium">Cost</th>
                  <th className="px-4 py-3 text-left lmnt-theme-on-surface font-medium">Resource</th>
                  <th className="px-4 py-3 text-left lmnt-theme-on-surface font-medium">Time</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {bomItems.map((item) => (
                  <tr key={item.id} className="border-t lmnt-theme-divider-primary">
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={item.partNumber}
                        onChange={(e) => updateBOMItem(item.id, 'partNumber', e.target.value)}
                        className="w-full px-2 py-1 border lmnt-theme-primary-border rounded"
                        placeholder="P-000XXX"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateBOMItem(item.id, 'description', e.target.value)}
                        className="w-full px-2 py-1 border lmnt-theme-primary-border rounded"
                        placeholder="Description"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={item.action}
                        onChange={(e) => updateBOMItem(item.id, 'action', e.target.value)}
                        className="w-full px-2 py-1 border lmnt-theme-primary-border rounded"
                        placeholder="Action"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={item.cost}
                        onChange={(e) => updateBOMItem(item.id, 'cost', e.target.value)}
                        className="w-full px-2 py-1 border lmnt-theme-primary-border rounded"
                        placeholder="$"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={item.resource}
                        onChange={(e) => updateBOMItem(item.id, 'resource', e.target.value)}
                        className="w-full px-2 py-1 border lmnt-theme-primary-border rounded"
                        placeholder="Team"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={item.time}
                        onChange={(e) => updateBOMItem(item.id, 'time', e.target.value)}
                        className="w-full px-2 py-1 border lmnt-theme-primary-border rounded"
                        placeholder="Days"
                      />
                    </td>
                    <td className="px-4 py-3">
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

      {/* Impact Analysis */}
      <div>
        <label className="block lmnt-theme-on-surface font-medium mb-2">
          Impact Analysis *
        </label>
        <textarea
          value={impactAnalysis}
          onChange={(e) => setImpactAnalysis(e.target.value)}
          rows={6}
          placeholder="Describe the overall impact of this change on the product...&#10;&#10;Include:&#10;• Affected end items/products&#10;• Impact on product performance or specifications&#10;• Customer impact&#10;• Regulatory considerations&#10;• Manufacturing implications"
          className="w-full px-4 py-3 border lmnt-theme-primary-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 lmnt-theme-primary resize-none"
        />
        <p className="text-sm lmnt-theme-on-surface-variant mt-2">
          Provide a comprehensive assessment of how this change impacts the product and related systems
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
          disabled={!impactAnalysis}
          className="lmnt-theme-primary-bg lmnt-theme-on-primary px-8 py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
        >
          Continue to Review & Export
        </button>
      </div>
    </div>
  )
}

export default ProductChange
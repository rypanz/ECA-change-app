import React, { useState } from 'react'
import { Package, AlertCircle } from 'lucide-react'

interface Props {
  changeData: any
  updateChangeData: (updates: any) => void
  onNext: () => void
  onBack: () => void
}

interface ECARow {
  id: string
  affectedFunction: string
  affectedSubFunction: string
  affected: 'yes' | 'no' | ''
  impact: 'none' | 'low' | 'medium' | 'high' | ''
  ecaTeamMember: string
  impactAnalysis: string
  justification: string
}

const ProductECA: React.FC<Props> = ({ changeData, updateChangeData, onNext, onBack }) => {
  const [affectedProducts, setAffectedProducts] = useState(changeData.productECAData?.affectedProducts || '')
  
  // Pre-populated table data with merged rows logic
  const initialRows: ECARow[] = [
    {
      id: '1',
      affectedFunction: 'Program Management',
      affectedSubFunction: 'Product Family Owner/s',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'List the name/s of the Product Family Owner/s for the "Affected Products" identified above',
      justification: ''
    },
    {
      id: '2',
      affectedFunction: 'Program Management',
      affectedSubFunction: 'Change Lead / Project Lead',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Problem Reports to be included in the scope of this ECR',
      justification: '1-Identify all Problem Reports that are submitted against Affected Products (End Items) and Affected Parts and/or Documents\n2-List these Problem Reports here\n3-Assess with the team which ones to include in the scope of this ECR and the ones that will be addressed in later ECRs\n4-Document the justification for the ones that will be addressed in later ECRs\n5-Link any Problem Reports which will be included in the scope, to the ECR.'
    },
    {
      id: '3',
      affectedFunction: 'Program Management',
      affectedSubFunction: 'Change Lead / Project Lead',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'IP Impact assessment for design change (if applicable)',
      justification: 'Provide / reference IP assessment for design change (if applicable)'
    },
    {
      id: '4',
      affectedFunction: 'Regulatory',
      affectedSubFunction: 'Regulatory',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Does this change potentially impact product registrations / licenses / clearances or approvals for the applicable country, license expiry dates, any import/export considerations, other information to be considered',
      justification: ''
    },
    {
      id: '5',
      affectedFunction: 'Regulatory',
      affectedSubFunction: 'Regulatory',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Does Design Change Impact "Regulatory Relevant Accessories and Country Language Requirement Tables (D-0000777136)"?',
      justification: ''
    },
    {
      id: '6',
      affectedFunction: 'Regulatory',
      affectedSubFunction: 'Regulatory',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Is Unique Device Identification / GUDID data impacted?',
      justification: 'Regulatory clearance and UDI impacts per D-0000430061, D-0001048687, and D-0000299989'
    },
    {
      id: '7',
      affectedFunction: 'Technical',
      affectedSubFunction: 'Chief Engineer',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Does the change affect hardware or software compatibility with fielded product?',
      justification: 'Statement of what compatibility is impacted - hardware components, software, etc.\nIf yes:\n- Perform an assessment of compatibility between the updated hardware or software and the existing fielded hardware/software components.\n- Provide the compatibility strategy for the change to the product - fully backwards compatible, compatible with specific versions, not compatible, etc.'
    },
    {
      id: '8',
      affectedFunction: 'Technical',
      affectedSubFunction: 'Design Input',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Does the change affect the Design Input (requirements) of any affected part/s?',
      justification: ''
    },
    {
      id: '9',
      affectedFunction: 'Technical',
      affectedSubFunction: 'Design Output (EM)',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Does the change affect any Electro-Mechanical Design Output (drawings/specifications) of any affected part/s?',
      justification: ''
    },
    {
      id: '10',
      affectedFunction: 'Technical',
      affectedSubFunction: 'Design Output (EM)',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Are Safety Certifications or Critical Component List (CCL) impacted?',
      justification: ''
    },
    {
      id: '11',
      affectedFunction: 'Technical',
      affectedSubFunction: 'Design Output (EM)',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Are EMC Certifications impacted?',
      justification: ''
    },
    {
      id: '12',
      affectedFunction: 'Technical',
      affectedSubFunction: 'Design Output (EM)',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Is Waste Electrical and Electronic Equipment information new (new catalog #), changed (weight change), or is a product to be remove? If yes, the www.weee.bayer.com website must be updated.',
      justification: ''
    },
    {
      id: '13',
      affectedFunction: 'Technical',
      affectedSubFunction: 'Design Output (EM)',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Does the change impact or include dangerous goods?',
      justification: ''
    },
    {
      id: '14',
      affectedFunction: 'Technical',
      affectedSubFunction: 'Design Output (SD)',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Does the change affect any Sterile Disposables Design Output (drawings/specifications) of any affected part/s?',
      justification: ''
    },
    {
      id: '15',
      affectedFunction: 'Technical',
      affectedSubFunction: 'Design Output (SW)',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Does the change affect any Software Design Output of any affected part/s?',
      justification: ''
    },
    {
      id: '16',
      affectedFunction: 'Technical',
      affectedSubFunction: 'Design Output (SW)',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Does the change impact the software license definition file?',
      justification: ''
    },
    {
      id: '17',
      affectedFunction: 'Technical',
      affectedSubFunction: 'Design Output (Labeling)',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Does the change affect any Labeling?',
      justification: ''
    },
    {
      id: '18',
      affectedFunction: 'Technical',
      affectedSubFunction: 'Design Output (Labeling)',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Does the change impact IFUs or Op Manuals? If yes, ensure to update the website (https://manuals.radiology.bayer.com/op-manuals) with the latest released revisions of these IFUs and/or Op Manuals',
      justification: ''
    },
    {
      id: '19',
      affectedFunction: 'Technical',
      affectedSubFunction: 'Design Output (Packaging)',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Does the change affect any Packaging?',
      justification: ''
    },
    {
      id: '20',
      affectedFunction: 'Technical',
      affectedSubFunction: 'Design Output (Packaging)',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Are the packaging materials new or changed? If yes, D-0001887029 and the www.environmental.radiology.bayer.com website must be updated. (See website for details.)',
      justification: ''
    },
    {
      id: '21',
      affectedFunction: 'Technical',
      affectedSubFunction: 'Design Testing',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Would the change require any Design Testing/V&V/Useability?',
      justification: ''
    },
    {
      id: '22',
      affectedFunction: 'Technical',
      affectedSubFunction: 'Design Service',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Does the change affect any Service documentation? (Impacts to Field Service D-0001067028) Are there any new Globans that will be required to be repairable?',
      justification: ''
    },
    {
      id: '23',
      affectedFunction: 'Technical',
      affectedSubFunction: 'Design Service',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Are Service Process Validations / Qualifications required? (Impacts to validated manufacturing processes per D-0000141493)',
      justification: ''
    },
    {
      id: '24',
      affectedFunction: 'Technical',
      affectedSubFunction: 'Design Service',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Are there any new Globans that will be required to be Field repairable/replaceable or Depot repairable/replaceable?',
      justification: ''
    },
    {
      id: '25',
      affectedFunction: 'Product Supply',
      affectedSubFunction: 'PS Lead',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Are new part numbers (Globans) required? (apply Interchangeability Rules)',
      justification: ''
    },
    {
      id: '26',
      affectedFunction: 'Product Supply',
      affectedSubFunction: 'PS Lead',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Will product be received in Restricted Status at Outside of US distribution centers?',
      justification: 'Define if distributor notification and if release strategy is required. Reference D-0001218572.'
    },
    {
      id: '27',
      affectedFunction: 'Product Supply',
      affectedSubFunction: 'PS Lead',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Assess the impact of the change on the Global Supply Chain and Distribution Centers.',
      justification: 'Identify how the change will be affecting the shipping new parts, new revisions of existing parts, and/or shipping of bridge stock ...etc. Also, assess if any controls are needed to ship products to different countries.'
    },
    {
      id: '28',
      affectedFunction: 'Product Supply',
      affectedSubFunction: 'PS Lead',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Does this change impact production builds? Statement of what part numbers (GLOBANs) are not to be built in production and start/end date (if known) or rationale why not applicable.',
      justification: ''
    },
    {
      id: '29',
      affectedFunction: 'Product Supply',
      affectedSubFunction: 'PS Lead',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'GxP impacts as per D-0000915562',
      justification: ''
    },
    {
      id: '30',
      affectedFunction: 'Product Supply',
      affectedSubFunction: 'PS Lead',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Define the manner design transfer and associated design transfer review(s) will be executed. Refer to D-0000736387 for Design Transfer Guidance.',
      justification: ''
    },
    {
      id: '31',
      affectedFunction: 'Product Supply',
      affectedSubFunction: 'PS-Supply Chain',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Does the change affect any Sourced Parts?',
      justification: ''
    },
    {
      id: '32',
      affectedFunction: 'Product Supply',
      affectedSubFunction: 'PS-Supply Chain',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Does the change impact Global Supply Chain? (For example: New / changed saleable part number, Creation or change to configuration drawings, Revision changes if change will result in a Globan no longer being interchangeable.',
      justification: ''
    },
    {
      id: '33',
      affectedFunction: 'Product Supply',
      affectedSubFunction: 'PS-Manufacturing',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Does the change affect any Internally-Manufactured Parts? Are manufacturing processes, procedures, work-instructions, etc. impacted?',
      justification: ''
    },
    {
      id: '34',
      affectedFunction: 'Product Supply',
      affectedSubFunction: 'PS-Manufacturing',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Does the change impact fixtures, equipment, or test fixtures used in Internally-Manufactured Parts?',
      justification: ''
    },
    {
      id: '35',
      affectedFunction: 'Product Supply',
      affectedSubFunction: 'PS-Manufacturing',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Does the DMRI need updated',
      justification: ''
    },
    {
      id: '36',
      affectedFunction: 'Product Supply',
      affectedSubFunction: 'PS-Manufacturing',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Are any new GLOBANs top level system numbers which need a Z07 or ZV36 classification in SAP?',
      justification: 'Statement of what new GLOBANs require Z07 or ZV36 classification or rationale why not applicable. Z07 SAP classification needs to be set up when releasing new injector system level GLOBANs in order for the Field Service Organization to create work orders. Z07 SAP classification is not applied to injector raw material, module, accessory (including Workstations) or SD GLOBANs. ZV36 is needed when a new workstation or top level system GLOBAN number is created. Only product lines that use a Work Station requre ZV36 classification. Service Operations Support teams are capable to create Z07 SAP classification through GLOBAN workflows. Create Winchill task to complete Z07 SAP classification for Global Service team'
    },
    {
      id: '37',
      affectedFunction: 'Product Supply',
      affectedSubFunction: 'PS-Manufacturing',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Is the Bill of Material Impacted resulting in changes/creation of an SAP BOM?',
      justification: 'Statement of any new/revised part numbers and confirmation of SAP update against design and manufacturing documents.'
    },
    {
      id: '38',
      affectedFunction: 'Product Supply',
      affectedSubFunction: 'PS-Manufacturing',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Impacts to Equipment Software D-0000610713',
      justification: ''
    },
    {
      id: '39',
      affectedFunction: 'Product Supply',
      affectedSubFunction: 'PS-Manufacturing',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Impacts to software license definition SharePoint site.',
      justification: ''
    },
    {
      id: '40',
      affectedFunction: 'Product Supply',
      affectedSubFunction: 'PS-EMO',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Does the change affect any Externally-Manufactured Parts? Are tools, tooling suppliers and CMO manufacturing sites impacted and notified?',
      justification: ''
    },
    {
      id: '41',
      affectedFunction: 'Quality',
      affectedSubFunction: 'Quality Lead',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'For new Part Object(s) created has Material Class been appropriately assigned?.',
      justification: 'Material Class and an associated Material Class Rational shall be assigned to new Part Object per D-0000737127 Supplier Material Qualification procedure.'
    },
    {
      id: '42',
      affectedFunction: 'Quality',
      affectedSubFunction: 'Safety Risk Management',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Would the change require any Risk Management File (RMF) updates?',
      justification: ''
    },
    {
      id: '43',
      affectedFunction: 'Quality',
      affectedSubFunction: 'Plant Quality',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Are internal Process Validations / Qualifications required? (Impacts to validated manufacturing processes per D-0000141493)',
      justification: ''
    },
    {
      id: '44',
      affectedFunction: 'Quality',
      affectedSubFunction: 'Plant Quality',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Are internal manufacturing quality controls required (QM Plans, Product ID & Traceability Plan, Process FMEA per D-0001049968)?',
      justification: ''
    },
    {
      id: '45',
      affectedFunction: 'Quality',
      affectedSubFunction: 'Plant Quality',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Is a BOMcheck update required for RoHS / REACH?',
      justification: 'Statement of what material declarations for RoHS and REACH are needed for new globans, material changes, or processing changes in BOMcheck.'
    },
    {
      id: '46',
      affectedFunction: 'Quality',
      affectedSubFunction: 'Supplier Quality',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Are Supplier Qualifications, Material Qualifications and/or FAIs required?',
      justification: ''
    },
    {
      id: '47',
      affectedFunction: 'Quality',
      affectedSubFunction: 'Supplier Quality',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Is there a new chemical or chemicals that have changed? If yes, the www.REACH.bayer.com website must be updated.',
      justification: ''
    },
    {
      id: '48',
      affectedFunction: 'Quality',
      affectedSubFunction: 'Sterility Assurance',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Does the change require an assessment for sterilization, microbiology or biocompatibility?',
      justification: 'Initial Assessment for Sterilization, Microbiology and Biocompatibility per D-0000611960'
    },
    {
      id: '49',
      affectedFunction: 'Medical/ Clinical',
      affectedSubFunction: 'Medical/Clinical',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: 'Provide / reference Clinical assessment for design change',
      justification: ''
    },
    {
      id: '50',
      affectedFunction: 'Commercial',
      affectedSubFunction: 'Commercial',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: '',
      justification: ''
    },
    {
      id: '51',
      affectedFunction: 'Marketing / Launch Managers',
      affectedSubFunction: 'Marketing / Launch Managers',
      affected: '',
      impact: '',
      ecaTeamMember: '',
      impactAnalysis: '',
      justification: ''
    }
  ]

  const [rows, setRows] = useState<ECARow[]>(changeData.productECAData?.rows || initialRows)

  const updateRow = (id: string, field: keyof ECARow, value: string) => {
    setRows(prev => prev.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ))
  }

  const handleContinue = () => {
    updateChangeData({
      productECAData: {
        affectedProducts,
        rows
      }
    })
    onNext()
  }

  // Group rows by Affected Function for merged row rendering
  const groupedRows: { [key: string]: ECARow[] } = {}
  rows.forEach(row => {
    if (!groupedRows[row.affectedFunction]) {
      groupedRows[row.affectedFunction] = []
    }
    groupedRows[row.affectedFunction].push(row)
  })

  // Further group by Sub-Function within each Function
  const getSubFunctionGroups = (functionRows: ECARow[]) => {
    const subGroups: { [key: string]: ECARow[] } = {}
    functionRows.forEach(row => {
      if (!subGroups[row.affectedSubFunction]) {
        subGroups[row.affectedSubFunction] = []
      }
      subGroups[row.affectedSubFunction].push(row)
    })
    return subGroups
  }

  const getStepNumber = () => {
    let step = 4
    if (changeData.qsrDetermination?.needsQSR) step++
    return step + 1 // +1 for Product Affected Items page
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold lmnt-theme-primary mb-2">Product ECA Assessment</h2>
        <p className="lmnt-theme-on-surface">Complete the Product Engineering Change Assessment (Step {getStepNumber()})</p>
      </div>

      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg border-l-4 lmnt-theme-secondary-border">
        <div className="flex items-start gap-3">
          <Package size={24} className="lmnt-theme-secondary mt-1" />
          <div>
            <h4 className="font-bold lmnt-theme-on-surface mb-2">Product ECA Instructions</h4>
            <p className="text-sm lmnt-theme-on-surface mb-3">
              This assessment evaluates the impact of the product change across all affected functions and sub-functions.
            </p>
            <ul className="text-sm lmnt-theme-on-surface list-disc list-inside space-y-1">
              <li>Review each Affected Function and Sub-Function</li>
              <li>Select "Yes" or "No" for whether each area is affected</li>
              <li>If affected, select impact level and assign an ECA team member</li>
              <li>Provide justification (if not affected) or implementation details (if affected)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Current Change Information */}
      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg">
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
        </div>
      </div>

      {/* Affected Products */}
      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg">
        <label className="block lmnt-theme-on-surface font-medium mb-2">
          Affected Products (Optional)
        </label>
        <textarea
          value={affectedProducts}
          onChange={(e) => setAffectedProducts(e.target.value)}
          rows={3}
          placeholder="List the affected products (end items) for this change..."
          className="w-full px-4 py-3 border lmnt-theme-primary-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 lmnt-theme-primary resize-none"
        />
        <p className="text-sm lmnt-theme-on-surface-variant mt-2">
          Identify all end products impacted by this change (optional - you can continue without filling this out)
        </p>
      </div>

      {/* ECA Assessment Table */}
      <div className="lmnt-theme-surface-variant-bg p-6 rounded-lg">
        <h3 className="font-bold lmnt-theme-on-surface mb-4">Product ECA Assessment Table</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full border lmnt-theme-primary-border text-sm">
            <thead className="lmnt-theme-primary-bg lmnt-theme-on-primary">
              <tr>
                <th className="px-3 py-3 text-left font-medium border lmnt-theme-on-primary-stroke-border">Affected Functions</th>
                <th className="px-3 py-3 text-left font-medium border lmnt-theme-on-primary-stroke-border">Affected Sub-Functions</th>
                <th className="px-3 py-3 text-left font-medium border lmnt-theme-on-primary-stroke-border">Affected?</th>
                <th className="px-3 py-3 text-left font-medium border lmnt-theme-on-primary-stroke-border">Impact (if affected)</th>
                <th className="px-3 py-3 text-left font-medium border lmnt-theme-on-primary-stroke-border">ECA Team Member (if affected)</th>
                <th className="px-3 py-3 text-left font-medium border lmnt-theme-on-primary-stroke-border">Impact Analysis</th>
                <th className="px-3 py-3 text-left font-medium border lmnt-theme-on-primary-stroke-border">Justification (if not affected) / Where to be implemented (if affected)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedRows).map(([functionName, functionRows]) => {
                const subFunctionGroups = getSubFunctionGroups(functionRows)
                let functionRowIndex = 0
                
                return Object.entries(subFunctionGroups).map(([subFunctionName, subRows]) => {
                  return subRows.map((row, subRowIndex) => {
                    const isFirstInFunction = functionRowIndex === 0 && subRowIndex === 0
                    const isFirstInSubFunction = subRowIndex === 0
                    const functionRowSpan = functionRows.length
                    const subFunctionRowSpan = subRows.length
                    
                    functionRowIndex++
                    
                    return (
                      <tr key={row.id} className="border-t lmnt-theme-divider-primary hover:lmnt-theme-surface-variant-bg">
                        {isFirstInFunction && (
                          <td rowSpan={functionRowSpan} className="px-3 py-2 border lmnt-theme-divider-primary font-medium lmnt-theme-on-surface align-top">
                            {functionName}
                          </td>
                        )}
                        {isFirstInSubFunction && (
                          <td rowSpan={subFunctionRowSpan} className="px-3 py-2 border lmnt-theme-divider-primary lmnt-theme-on-surface align-top">
                            {subFunctionName}
                          </td>
                        )}
                        <td className="px-3 py-2 border lmnt-theme-divider-primary">
                          <select
                            value={row.affected}
                            onChange={(e) => updateRow(row.id, 'affected', e.target.value)}
                            className="w-full px-2 py-1 border lmnt-theme-primary-border rounded text-sm"
                          >
                            <option value="">Select...</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </td>
                        <td className="px-3 py-2 border lmnt-theme-divider-primary">
                          {row.affected === 'yes' ? (
                            <select
                              value={row.impact}
                              onChange={(e) => updateRow(row.id, 'impact', e.target.value)}
                              className="w-full px-2 py-1 border lmnt-theme-primary-border rounded text-sm"
                            >
                              <option value="">Select...</option>
                              <option value="none">None</option>
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                            </select>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                        <td className="px-3 py-2 border lmnt-theme-divider-primary">
                          {row.affected === 'yes' ? (
                            <input
                              type="text"
                              value={row.ecaTeamMember}
                              onChange={(e) => updateRow(row.id, 'ecaTeamMember', e.target.value)}
                              placeholder="Team member name"
                              className="w-full px-2 py-1 border lmnt-theme-primary-border rounded text-sm"
                            />
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                        <td className="px-3 py-2 border lmnt-theme-divider-primary">
                          <div className="text-xs lmnt-theme-on-surface whitespace-pre-wrap max-w-xs">
                            {row.impactAnalysis}
                          </div>
                        </td>
                        <td className="px-3 py-2 border lmnt-theme-divider-primary">
                          <textarea
                            value={row.justification}
                            onChange={(e) => updateRow(row.id, 'justification', e.target.value)}
                            rows={2}
                            placeholder={row.affected === 'no' ? 'Provide justification...' : 'Where to be implemented...'}
                            className="w-full px-2 py-1 border lmnt-theme-primary-border rounded text-sm resize-none"
                          />
                        </td>
                      </tr>
                    )
                  })
                })
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Information Box */}
      <div className="lmnt-theme-background-bg p-6 rounded-lg border-l-4 lmnt-theme-secondary-border">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="lmnt-theme-secondary mt-0.5" />
          <div>
            <p className="text-sm lmnt-theme-on-surface">
              <strong>Note:</strong> This table contains all standard Product ECA assessment areas. Complete all applicable rows based on your change scope. The merged rows represent grouped functions and sub-functions for easier navigation. You can continue to the next page even if this assessment is not fully completed.
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
          className="lmnt-theme-primary-bg lmnt-theme-on-primary px-8 py-3 rounded-lg font-medium hover:opacity-90"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default ProductECA
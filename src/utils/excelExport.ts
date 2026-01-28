import * as XLSX from 'xlsx'

export const exportToExcel = (changeData: any) => {
  const workbook = XLSX.utils.book_new()

  // Tab 1: Instructions
  const instructionsData = [
    ['General ECA Instructions'],
    [''],
    ['The instructions on this tab are for guidance when filling out an ECA. Always reference D-0000916903 for ECA requirements and additional details.'],
    ['These instructions are for the Change Leader (CL) to follow with the help of the identified ECA team.'],
    [''],
    ['Steps:'],
    ['1. Using the information below, determine which ECA type is required based on the types of Resulting Objects impacted by the change.'],
    ['2. Complete the Scope of Change tab.'],
    ['3. Complete the Full vs. Fast Track tab.'],
    ['4. Complete the CRB-CIB tab (Full-Track changes only).'],
    ['5. Complete the applicable ECA tab(s).'],
    ['6. The Minimum Deliverables (CIP) tab is optional for all ECAs but is recommended to supplement the Product ECA.'],
    ['7. When the ECA is completed, delete this tab and any other unused ECA tabs.'],
    ['8. In Windchill: Upload the ECA to the ECR\'s Attachments section and complete the \'Analyze Change Request\' task for the ECR.'],
    [''],
    ['Reference Documents:'],
    ['• D-0000916903: ECA Requirements and Additional Details'],
    ['• D-0001048589: Object Types Reference']
  ]
  const instructionsWS = XLSX.utils.aoa_to_sheet(instructionsData)
  XLSX.utils.book_append_sheet(workbook, instructionsWS, 'Instructions')

  // Tab 2: Scope of Change
  const scopeData = [
    ['Scope of Change'],
    [''],
    ['ECR Number:', changeData.ecrNumber],
    ['Change Type:', changeData.changeType],
    ['Object Type:', changeData.objectType],
    ['Document Number:', changeData.documentNumber],
    ['Document Type:', changeData.documentType],
    ['Version:', changeData.documentVersion],
    ['State:', changeData.documentState],
    [''],
    ['Scope and Reason for Change:'],
    [changeData.scopeOfChange || ''],
    [''],
    ['Summary of Change:'],
    [changeData.changeSummary || '']
  ]
  const scopeWS = XLSX.utils.aoa_to_sheet(scopeData)
  XLSX.utils.book_append_sheet(workbook, scopeWS, 'Scope of Change')

  // Tab 3: Full vs Fast Track
  const trackData = [
    ['Full vs Fast Track'],
    [''],
    ['Routing Type:', changeData.trackType === 'full' ? 'Full Track' : 'Fast Track'],
    [''],
  ]
  
  if (changeData.trackType === 'full') {
    trackData.push(['CRB Members:'])
    trackData.push([changeData.crbMembers || ''])
  } else {
    trackData.push(['CRB review is not required for Fast Track changes.'])
  }
  
  const trackWS = XLSX.utils.aoa_to_sheet(trackData)
  XLSX.utils.book_append_sheet(workbook, trackWS, 'Full vs Fast Track')

  // Tab 4: CRB-CIB (only if Full Track)
  if (changeData.trackType === 'full') {
    const crbData = [
      ['CRB-CIB'],
      [''],
      ['Change Review Board Members:'],
      [changeData.crbMembers || ''],
      [''],
      ['Notes:'],
      ['This tab should be completed with detailed CRB member information and review requirements.']
    ]
    const crbWS = XLSX.utils.aoa_to_sheet(crbData)
    XLSX.utils.book_append_sheet(workbook, crbWS, 'CRB-CIB')
  }

  // Product ECA tabs (only if product change)
  if (changeData.changeType === 'product') {
    // Tab 5: Product ECA
    const productECAData = [
      ['Product ECA'],
      [''],
      ['Product Change Criteria:'],
      ['Includes Part Objects:', changeData.productTypeOptions?.includesPartObjects ? 'Yes' : 'No'],
      ['Includes Product Design Datasets:', changeData.productTypeOptions?.includesProductDesignDatasets ? 'Yes' : 'No'],
      ['Includes Protocol/Report:', changeData.productTypeOptions?.includesProtocolReport ? 'Yes' : 'No'],
      [''],
      ['Instructions:'],
      ['1. Export the "Structure" report (Children of the source)'],
      ['2. Export the "Where Used" report (where this source is used)'],
      ['3. Combine the exports into the Affected Items tab'],
      ['4. Complete the Impact Analysis tab']
    ]
    const productECAWS = XLSX.utils.aoa_to_sheet(productECAData)
    XLSX.utils.book_append_sheet(workbook, productECAWS, 'Product ECA')

    // Tab 6: Affected Items
    const affectedItemsHeaders = [
      ['Part Number', 'Description', 'Action Required', 'Cost', 'Resource', 'Time']
    ]
    const affectedItemsData = changeData.productData?.bomItems?.map((item: any) => [
      item.partNumber,
      item.description,
      item.action,
      item.cost,
      item.resource,
      item.time
    ]) || []
    
    const affectedItemsWS = XLSX.utils.aoa_to_sheet([
      ['Affected Items'],
      [''],
      ...affectedItemsHeaders,
      ...affectedItemsData
    ])
    XLSX.utils.book_append_sheet(workbook, affectedItemsWS, 'Affected Items')

    // Tab 7: Impact Analysis
    const impactAnalysisData = [
      ['Impact Analysis'],
      [''],
      ['Overall Impact Assessment:'],
      [changeData.productData?.impactAnalysis || ''],
      [''],
      ['Affected Products (End Items):'],
      ['List affected end items here...']
    ]
    const impactAnalysisWS = XLSX.utils.aoa_to_sheet(impactAnalysisData)
    XLSX.utils.book_append_sheet(workbook, impactAnalysisWS, 'Impact Analysis')
  }

  // Manufacturing/QSR ECA tabs (only if manufacturing change)
  if (changeData.changeType === 'manufacturing') {
    const mfgECAData = [
      ['Manufacturing/QSR ECA'],
      [''],
      ['Impacted Objects:', changeData.manufacturingData?.impactedObjects || ''],
      ['ECR Number:', changeData.ecrNumber || ''],
      [''],
      ['Team Members:'],
      ['Change Initiator:', changeData.manufacturingData?.changeInitiator || ''],
      ['Change Leader:', changeData.manufacturingData?.changeLeader || ''],
      ['Implementation Lead:', changeData.manufacturingData?.implementationLead || ''],
      ['SMEs:', changeData.manufacturingData?.smes || ''],
      [''],
      ['Impact Assessment:'],
      ['']
    ]

    // Add assessment questions and answers
    changeData.manufacturingData?.assessments?.forEach((assessment: any) => {
      mfgECAData.push([assessment.question])
      mfgECAData.push(['Answer:', assessment.answer])
      if (assessment.answer === 'no' && assessment.noReason) {
        mfgECAData.push(['Reason for No:', assessment.noReason])
      }
      if (assessment.justification) {
        mfgECAData.push(['Comment/Justification:', assessment.justification])
      }
      mfgECAData.push([''])
    })

    const mfgECAWS = XLSX.utils.aoa_to_sheet(mfgECAData)
    XLSX.utils.book_append_sheet(workbook, mfgECAWS, 'Manufacturing-QSR ECA')
  }

  // Tab: Minimum Deliverables (always included)
  const deliverablesData = [
    ['Minimum Deliverables (CIP)'],
    [''],
    ['This tab is optional but recommended to supplement the ECA.'],
    ['Use it for project organization or as an overflow document list.'],
    [''],
    ['Deliverable', 'Responsible', 'Due Date', 'Status'],
    ['', '', '', ''],
  ]
  const deliverablesWS = XLSX.utils.aoa_to_sheet(deliverablesData)
  XLSX.utils.book_append_sheet(workbook, deliverablesWS, 'Minimum Deliverables')

  // Generate filename
  const filename = `ECA_${changeData.ecrNumber || changeData.documentNumber || 'Draft'}_${new Date().toISOString().split('T')[0]}.xlsx`

  // Write file
  XLSX.writeFile(workbook, filename)
}
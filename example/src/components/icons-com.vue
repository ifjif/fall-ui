<template>
  <h2>图标</h2>
  <div>
    <fl-row v-for="icon in icons">
      <fl-col v-for="ic in icon" :span="4">
        <ul style="list-style: none;padding: 0;text-align: center;">
          <li>
            <fl-icon size="30">
              <component :is="ic"></component>
            </fl-icon>
          </li>
          <li>
            <span style="font-size:12px;">{{ ic }}</span>
          </li>
        </ul>
      </fl-col>
    </fl-row>
  </div>
</template>
<script setup>
const icons = [
  ['FlCheck', 'FlCheckCircle', 'FlCheckCircleFill', 'FlCheckSquare', 'FlCheckSquareFill', 'FlClose'],
  ['FlCloseCircle', 'FlCloseCircleFill', 'FlCloseSquare', 'FlCloseSquareFill', 'FlPlus', 'FlPlusCircle'],
  ['FlPlusCircleFill', 'FlPlusSquare', 'FlPlusSquareFill', 'FlMinus', 'FlMinusCircle', 'FlMinusCircleFill'],
  ['FlMinusSquare', 'FlMinusSquareFill', 'FlLeft', 'FlLeftCircle', 'FlLeftCircleFill', 'FlLeftSquare'],
  ['FlLeftSquareFill', 'FlRight', 'FlRightCircle', 'FlRightCircleFill', 'FlRightSquare', 'FlRightSquareFill'],
  ['FlDown', 'FlDownCircle', 'FlDownCircleFill', 'FlDownSquare', 'FlDownSquareFill', 'FlUp'],
  ['FlUpCircle', 'FlUpCircleFill', 'FlUpSquare', 'FlUpSquareFill', 'FlInfomation', 'FlInfoCircle'],
  ['FlInfoCircleFill', 'FlExclaimination', 'FlWarningCircle', 'FlWarningCircleFill', 'FlQuestion', 'FlQuestionCircle'],
  ['FlQuestionCircleFill', 'FlPause', 'FlTimeOut', 'FlPoweroffCircleFill', 'FlPlayCircle', 'FlPlayCircleFill'],
  ['FlPlaySquare', 'FlPlaySquareFill', 'FlStop', 'FlStopFill', 'FlEye', 'FlEyeFill'],
  ['FlEyeClose', 'FlEyeCloseFill', 'FlTimeCircle', 'FlTimeCircleFill', 'FlAudio', 'FlAudioFill'],
  ['FlVideo', 'FlVideoFill', 'FlCamera', 'FlCameraFill', 'FlHeart', 'FlHeartFill'],
  ['FlStar', 'FlStarFill', 'FlLike', 'FlLikeFill', 'FlUnlike', 'FlUnlikeFill'],
  ['FlLocation', 'FlLocationFill', 'FlNotification', 'FlNotificationFill', 'FlSound', 'FlSoundFill'],
  ['FlSetting', 'FlSettingFill', 'FlMessage', 'FlMessageFill', 'FlComment', 'FlMail'],
  ['FlMailFill', 'FlImage', 'FlImageFill'],
  ['FlEuro', 'FlCopyright', 'FlMeh', 'FlSearch', 'FlLoading'],
  ['FlSmile', 'FlTrademark', 'FlCode', 'FlCI', 'FlDollar', 'FlFrown'],
  ['FlEarth', 'FlYuan', 'FlPound'],
  ['FlSync', 'FlTransaction', 'FlUndo', 'FlRedo', 'FlReload', 'FlReloadTime'],
  ['FlDashboard', 'FlIssuesClose', 'FlPoweroff', 'FlLogout'],
  ['FlEdit', 'FlEditSquare', 'FlExport', 'FlImport', 'FlSave'],
  ['FlAppStore', 'FlLayout', 'FlControl', 'FlCodeLibrary', 'FlDetail'],
  ['FlProject', 'FlWallet', 'FlCalculator', 'FlInteraction', 'FlBorder', 'FlBorderOuter'],
  ['FlBorderTop', 'FlBorderBottom', 'FlBorderLeft', 'FlBorderRight', 'FlBorderInner', 'FlBorderVertical'],
  ['FlBorderHorizontal', 'FlRadiusBottomleft', 'FlRadiusBottomright', 'FlRadiusUpleft', 'FlRadiusUpright', 'FlRadiusSetting'],
  ['FlUser', 'FlAddUser', 'FlDeleteUser', 'FlTeam', 'FlAddTeam', 'FlDeleteTeam'],
  ['FlPieChart', 'FlAreaChart', 'FlLineChart', 'FlBarChart', 'FlPointMap', 'FlRadarChart'],
  ['FlHeadMap', 'FlContainer'],
  ['FlDatabase', 'FlServer', 'FlMobile', 'FlTablet', 'FlRedEnvelope', 'FlBook'],
  ['FlReconciliation', 'FlFile', 'FlFileAdd', 'FlFileException', 'FlFileSync', 'FlFileSearch'],
  ['FlSolution', 'FlFileProtect', 'FlFileExclamation', 'FlFileUnknown', 'FlFileExcel', 'FlFilePdf'],
  ['FlFileImage', 'FlFileMarkdown', 'FlFilePpt', 'FlFileWord', 'FlFileZip', 'FlFileText'],
  ['FlFileGif', 'FlFileCopy', 'FlSnippets', 'FlAudit', 'FlDiff', 'FlBatchFolding'],
  ['FlSecurityScan', 'FlPropertySafety', 'FlSafetyCertificate', 'FlInsurance', 'FlAlert', 'FlDelete'],
  ['FlHourglass', 'FlBlub', 'FlExperiment', 'FlBell', 'FlTrophy', 'FlRest'],
  ['FlUsb', 'FlSkin', 'FlHome', 'FlBlank', 'FlFilter', 'FlFunnelPlot'],
  ['FlUnlock', 'FlLock', 'FlCustomerservice', 'FlFlag'],
  ['FlMoneyCollect', 'FlMedicinebox', 'FlShop', 'FlRocket', 'FlShopping', 'FlFolder'],
  ['FlFolderOpen', 'FlFolderAdd', 'FlDeploymentUnit', 'FlAccountBook', 'FlContacts', 'FlCarryOut'],
  ['FlCalendarCheck', 'FlCalendar', 'FlScan', 'FlSelect', 'FlBoxPlot', 'FlBuild'],
  ['FlSliders', 'FlLaptop', 'FlBarcode', 'FlCluster', 'FlGateway'],
  ['FlCar', 'FlPrinter', 'FlRead', 'FlCloudServer', 'FlCloudUpload', 'FlCloud'],
  ['FlCloudDownload', 'FlCloudSync', 'FlQrcode', 'FlFund'],
  ['FlTable', 'FlIdCard', 'FlCreditCard'],
  ['FlBlock', 'FlError', 'FlGold', 'FlWifi', 'FlAttachment'],
  ['FlKey', 'FlApi', 'FlDisconnect', 'FlHighlight', 'FlMonitor', 'FlLink'],
  ['FlMan', 'FlWoman', 'FlPercentage', 'FlPushpin', 'FlPhone', 'FlShake'],
  ['FlTag', 'FlTags', 'FlWrench', 'FlScissor', 'FlMr', 'FlShare'],
  ['FlBranches', 'FlFork', 'FlShrink', 'FlArrawsalt', 'FlVerticalRight', 'FlVerticalLeft'],
  ['FlFullscreen', 'FlFullscreenExit', 'FlDoubleleft', 'FlDoubleright', 'FlArrowright',
    'FlArrowup'],
  ['FlArrowleft', 'FlArrowdown', 'FlUpload', 'FlDownload', 'FlColumnHeight', 'FlColumnWidth'],
  ['FlVerticalAlignBottom'],
  ['FlVerticalAlignMiddle', 'FlVerticalAlignTop', 'FlToTop', 'FlSortDescending',
    'FlSortAscending', 'FlFall'],
  ['FlSwap', 'FlStock', 'FlRise', 'FlIndent', 'FlOutdent', 'FlMenu'],
  ['FlUnorderedList', 'FlOrderedList', 'FlAlignRight', 'FlAlignCenter', 'FlAlignLeft', 'FlPicCenter'],
  ['FlPicRight', 'FlPicLeft', 'FlBold', 'FlFontColors', 'FlFontSize', 'FlLineHeight'],
  ['FlStrikethrough', 'FlUnderline', 'FlNumber', 'FlItalic', 'FlEllipsis', 'FlDash'],
  ['FlSmallDash', 'FlEnter', 'FlLine', 'FlRollback', 'FlBgColors', 'FlCrown'],
  ['FlDrag', 'FlDesktop', 'FlGift', 'FlFire', 'FlThunderbolt']
]

</script>

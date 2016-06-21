import voluntarioLogado from '../../db/db.ts'

var corRG='#E64A19'
var corAtendimento = '#2E7D32'
var corRGV = '#1A237E'

tag indicesParticipacaoView < div
  def render
    <self.mdl-card.mdl-shadow--2dp.mdl-cell.mdl-cell--12-col.mdl-grid>
      <div.mdl-card__title.mdl-card--expand.mdl-cell--12-col.mdl-grid>
        <div.mdl-cell.mdl-cell--4-col.mdl-cell--1-col-phone>
          <chartDonut size=200
            total=voluntarioLogado()['RG']['realizadas']
            slices=[{donutColor: corRG, textColor: 'black', value: voluntarioLogado()['RG']['presencas']}]>
        <div.mdl-cell.mdl-cell--4-col.mdl-cell--1-col-phone>
          <chartDonut
            size=200
            total=voluntarioLogado()['RG']['realizadas']
            slices=[{donutColor: corAtendimento, textColor: 'black', value: voluntarioLogado()['RG']['atendimentos']}]>
        <div.mdl-cell.mdl-cell--4-col.mdl-cell--1-col-phone>
          <chartDonut size=200
            total=voluntarioLogado()['RGV']['realizadas']
            slices=[
              {donutColor: corRGV, textColor: 'black', value: voluntarioLogado()['RGV']['presencas']}
            ]
          >
      <div.mdl-card__actions.mdl-card--border>
          <h6> "Índices de participação"
          <table.mdl-data-table.mdl-js-data-table.mdl-shadow--2dp>
          <tbody.indice-participacao>
            <tr>
              <td.mdl-data-table__cell--non-numeric >
                <div.quadro style="background-color: {corRG}">

              <td.mdl-data-table__cell--non-numeric >
                "Presenças nas reuniões de grupo"

              <td> voluntarioLogado()['RG']['presencas']
              <td.mdl-data-table__cell--non-numeric > "de"
              <td> voluntarioLogado()['RG']['realizadas']

            <tr>
              <td.mdl-data-table__cell--non-numeric >
                <div.quadro style="background-color: {corAtendimento}">

              <td.mdl-data-table__cell--non-numeric >
                "Atendimento de vivências"

              <td>
                voluntarioLogado()['RG']['atendimentos']
              <td.mdl-data-table__cell--non-numeric > "de"
              <td>
                voluntarioLogado()['RG']['realizadas']

            <tr>
              <td.mdl-data-table__cell--non-numeric >
                <div.quadro style="background-color: {corRGV}">

              <td.mdl-data-table__cell--non-numeric >
                "Presenças nas RGV's"

              <td>
                voluntarioLogado()['RGV']['presencas']
              <td.mdl-data-table__cell--non-numeric > "de"
              <td>
                voluntarioLogado()['RGV']['realizadas']

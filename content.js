function highlightRemoteApplicationRows() {
  // テーブル要素を取得
  const table = document.querySelector("table.note");

  if (table) {
    const rows = table.querySelectorAll("tbody tr"); // tbody内の行を取得

    rows.forEach((row) => {
      const selectionNoteCell = row.querySelector("td:nth-child(4)"); // 3番目のtdが"選択備考"
      // 選択備考がリモート勤務申請の場合のみチェックする
      if (
        selectionNoteCell &&
        selectionNoteCell.textContent.includes("リモート勤務申請")
      ) {
        const dateCell = row.querySelector("td:nth-child(3)"); // 3番目のtdが"日付"
        const ApplicationDateCell = row.querySelector("td:nth-child(7)"); // 7番目のtdが"申請日時"

        if (dateCell) {
          const targetDateText = dateCell.textContent.trim();
          const targetDay = new Date(targetDateText);

          // 申請対象日時の前日1900をセット
          targetDay.setDate(targetDay.getDate() - 1);
          targetDay.setHours(19, 0, 0, 0);

          const ApplicationDateText = ApplicationDateCell.textContent.trim();
          const ApplicationDateTime = new Date(ApplicationDateText);

          // "申請日時"が"日付"の前日1900以降の申請だったら色をつける
          if (ApplicationDateTime > targetDay) {
            row.style.backgroundColor = "#ffff99"; // 薄い黄色にハイライト
          }
        }
      }
    });
  } else {
    console.log("指定されたテーブルが見つかりませんでした。");
  }
}

// ページ読み込み完了後にハイライト処理を実行
window.addEventListener("load", highlightRemoteApplicationRows);

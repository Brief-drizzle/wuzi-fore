// 表单重置
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields();
  }
}

// 添加日期范围
export function addDateRange(params, dateRange, propName) {
  let search = params;
  dateRange = Array.isArray(dateRange) ? dateRange : [];
  if (typeof propName === "undefined") {
    search.beginTime = dateRange[0];
    search.endTime = dateRange[1];
  } else {
    search.params["begin" + propName] = dateRange[0];
    search.params["end" + propName] = dateRange[1];
  }

  return search;
}

//判断当前成果审核处于哪个阶段
export function resStep(resReview) {
  if (resReview.trail.result == 0) return "初级审核";
  if (resReview.formality.result == 0) return "形式审核";
  if (
    resReview.expert[0].result == 0 ||
    resReview.expert[1].result == 0 ||
    resReview.expert[2].result == 0
  )
    return "专家审核";
  if (resReview.finalReview.result == 0) return "终级审核";
}

//给成果添加isSet
export function addIsSet(resform) {
  if (resform.resPrices.length != 0) {
    for (let resPrice of resform.resPrices) {
      resPrice.isSet = true;
    }
  }
  if (resform.resWorkers.length != 0) {
    for (let resWorker of resform.resWorkers) {
      resWorker.isSet = true;
    }
  }
  return resform;
}

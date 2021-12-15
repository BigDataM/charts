import moment from "moment";

export const GroupDataByDate = (current, until, interval, data) => {
    const step = interval === "hour" ? "hours" : "days";
    const result = [];
    data = data.map((d) => {
      d.date = moment(d.date);
      return d;
    });
    while (current <= until) {
      let dataItem = data.filter((i) => current.isSame(i.date));
      result.push(
        dataItem.length > 0
          ? dataItem[0]
          : { date: current.clone(), count: null }
      );
      current.add(1, step);
    }
    return result.map((i) => {
      if (step === "days") {
        i.date = i.date.format("YYYY-MM-DD");
      } else {
        i.date = i.date.format("DD-hh:mm");
      }
      return i;
    });
}
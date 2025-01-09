import { Input, InputNumber } from "antd";
import { Computed } from "../render/Computed";

// 物料，根据json schema生成表单项，主要用于react组件的渲染
export const widgetsMap = {
  string: Input,
  number: InputNumber,
  computed: Computed
}

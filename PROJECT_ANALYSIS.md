# GitHub 项目分析

分析对象：[lpl969](https://github.com/lpl969)。采样日期：2026-10-23。GitHub 用户 API 显示公开仓库总数为 7，与仓库列表一致。覆盖公开 README、目录树及部分关键源码，未执行各项目训练，也未审阅每一行代码。

## 整体定位

最清晰的主线是“声学感知与多模态研究 + AI 应用工程”。4 个仓库集中于无人机声音分类、跟踪、三维定位、球谐表示和深度网络；其余 3 个仓库将兴趣延伸到智能体工作流、脑电信号分析及嵌入式系统。

作品集因此采用“理解信号，构建智能”的标题。其表达范围限定为可见项目内容，不宣称职位、学历、工作年限或独立原创所有底层实现。

## 全部项目

| 仓库 | 能力证据与重点 | 展示建议与边界 |
| --- | --- | --- |
| [audio-visual-tfnet](https://github.com/lpl969/audio-visual-tfnet) | 完整音视频网络、训练入口、STFT / 球谐投影、Conformer、低秩专家、交叉注意力、双曲特征 | 首页首个精选；README 记录合成数据验证，但没有真实数据完整训练证据，不展示未经核实的准确率 |
| [SHT-CTNet](https://github.com/lpl969/SHT-CTNet) | 球谐变换辅助声学无人机跟踪与分类，数据准备和 train / test / auto 模式 | 体现空间声学研究；不推断论文录用情况或个人贡献比例 |
| [agent](https://github.com/lpl969/agent) | paper_email 的 FastAPI + Vue 论文摘要流程，rag 的编排、检索、记忆与基础设施层 | 首页精选，展示工程跨度；2 个子项目按 1 个仓库计数，RAG 明确为脚手架 |
| [S2-MoENet](https://github.com/lpl969/S2-MoENet) | 音频分类及三维位置估计；MoE / Conformer / 球谐融合模块；独立训练与评估入口 | 展示专家建模路线；README 使用 SS-MoeNet 名称，建议后续统一命名 |
| [sht_mamba](https://github.com/lpl969/sht_mamba) | 球谐表示与 Mamba；训练 / 评估脚本、多种结构变体、CUDA 算子环境说明 | 展示状态空间模型探索；避免将仓库体积或变体数量当成原创工作量 |
| [eeg](https://github.com/lpl969/eeg) | CAR_CSD.py、P300 拼写器、ERP 可视化、线性分类；CAR / CSD / z-score 及 PyTorch 线性回归实现 | 展示信号处理方法；缺少顶层 README，不转载被试日志、预测文本或记录中的数据 |
| [fire-monitoring-system](https://github.com/lpl969/fire-monitoring-system) | YOLOv5 / PyQt5、STM32F103 / DHT11 / OLED、uni-app / OneNET | 展示软硬件跨度；明确三个模块未完整联通，未实机验证，并保留上游归属 |

## 为什么不用语言占比作能力评分

`agent` 的 GitHub JavaScript 统计包含前端构建缓存；`fire-monitoring-system` 的 C 代码量大量来自芯片外设库。语言字节数无法直接代表原创投入或熟练程度。网页采用技术标签与实现解读，不使用“技能百分比”或未经依据的熟练度条。

## 内容依据

- 每张卡片直接链接原始仓库。
- 详情提供 README 或关键脚本入口；agent 另附 RAG 说明。
- `eeg` 的解读来自 `CAR_CSD.py`、`functions/func_classifier.py` 与文件结构。
- UI 图形均为生成的架构概念图，非算法输出、真实轨迹或产品截图。
- 公开来源不等于适合再次展示：不复制个人路径、数据口令、日志、被试记录和联系方式。

## 后续最有价值的改进

1. 为 eeg 增加 README、依赖、匿名合成数据示例和可复现入口。
2. 为 agent 增加根目录总览，清理构建缓存，并明确骨架功能与已实现业务。
3. 统一 S2-MoENet / SS-MoeNet 名称，逐一核对研究仓库的文章标题和代码变体对应关系。
4. 研究项目提供可复现配置与结果出处后，再补充准确率或定位误差等量化结果。
5. 火灾监测项目完成串口桥接与硬件联调后，再演示端到端闭环。

以上是分析建议，本次未改动这些远程仓库。

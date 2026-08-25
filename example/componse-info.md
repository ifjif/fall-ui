1. FlDraw在fixedScreen下 其内容可以直接为FlScrollBar

2. fl-tabs中height:100%,和fl-tab-pane中height:100%，这时fl-tab-pane中fl-scrollbar y生效

        <fl-tabs style="height:100%;">
           <fl-tab-pane style="height:100%;">
             <fl-scrollbar>
             </fl-scrollbar>
           </fl-tab-pane>
        </fl-tabs>

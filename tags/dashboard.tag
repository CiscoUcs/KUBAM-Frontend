<dashboard>
    <div id="server-health">
        <div class="servergroup clearfloat" each={categories}>
            <h1 class="categoryHeader serverCat">{type}</h1>
            <servergroup-box onclick="route('servers/{group.id}')"
                             each="{group in groups}"
                             id={group.id}
                             name={group.name} 
                             green={group.green} 
                             yellow={group.yellow} 
                             red={group.red} 
                             gray={group.gray}
                             >
            </servergroup-box>
        </div>
    </div>
</dashboard>
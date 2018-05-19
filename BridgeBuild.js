/**
 * @version 1.0.0.0
 * @author UNITCOM PC
 * @copyright Copyright © UNITCOM PC 2018
 * @compiler Bridge.NET 16.8.2
 */
Bridge.assembly("BridgeBuild", function ($asm, globals) {
    "use strict";

    Bridge.define("BridgeBuild.App", {
        main: function Main () {
            //Console.WriteLine("Game Start");
            BridgeBuild.App.SetupGame(Bridge.ref(BridgeBuild.App, "gr"), Bridge.ref(BridgeBuild.App, "TextBoard"));
            BridgeBuild.App.colors = System.Array.init(20, null, System.String);
            for (var i = 0; i < BridgeBuild.App.colors.length; i = (i + 1) | 0) {
                //colors[i] = "#1f2026";
                BridgeBuild.App.colors[System.Array.index(i, BridgeBuild.App.colors)] = Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(i, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)];
            }
            //colors[Colors.Board] = "#705373";
            //colors[Colors.Hero]      = "#7ee5da";
            //colors[Colors.GridHero]  = "#2d4eb3";
            //colors[Colors.GridEnemy] = "#732e5c";
            //colors[Colors.Enemy] = "#e5c17e";

            //colors[Colors.inputKey] = "#c2cc52";
            //colors[Colors.WindowLabel] = "#705373";
            //colors[Colors.HeroTurn] = colors[Colors.Hero];
            //colors[Colors.EnemyTurn] = colors[Colors.Enemy];


            var style = document.createElement("style");
            style.innerHTML = "html,body {font-family: Courier; background-color:#1f2526; height: 100%;}\n #canvas-container {width: 100%; height: 100%; text-align:center; vertical-align: middle; } ";
            document.head.appendChild(style);
            BridgeBuild.App.buffer = 9;
            BridgeBuild.App.bufferOn = false;

            document.onkeypress = Bridge.fn.combine(document.onkeypress, function (a) {

                var unicode = a.keyCode;
                var ik = Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.NONE;
                switch (unicode) {
                    case 32: 
                        ik = Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.DONE;
                        break;
                    case 102: 
                        ik = Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.FIRE;
                        break;
                    case 103: 
                        ik = Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.NORMALSHOT;
                        break;
                    case 105: 
                        ik = Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.ICE;
                        break;
                    case 116: 
                        ik = Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.THUNDER;
                        break;
                    case 119: 
                    case 38: 
                        ik = Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.UP;
                        break;
                    case 97: 
                    case 37: 
                        ik = Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.LEFT;
                        break;
                    case 115: 
                    case 40: 
                        ik = Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.DOWN;
                        break;
                    case 39: 
                    case 100: 
                        ik = Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.RIGHT;
                        break;
                    case 114: 
                        ik = Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.REDO;
                        break;
                    default: 
                        break;
                }
                //buffer = a.CharCode;
                BridgeBuild.App.buffer = ik;
                BridgeBuild.App.bufferOn = true;
            });

            BridgeBuild.App.UpdateGame();

            // After building (Ctrl + Shift + B) this project, 
            // browse to the /bin/Debug or /bin/Release folder.

            // A new bridge/ folder has been created and
            // contains your projects JavaScript files. 

            // Open the bridge/index.html file in a browser by
            // Right-Click > Open With..., then choose a
            // web browser from the list

            // This application will then run in a browser.
        },
        statics: {
            fields: {
                buffer: 0,
                bufferOn: false,
                gr: null,
                TextBoard: null,
                colors: null
            },
            methods: {
                SetupGame: function (gr, TextBoard) {
                    var rnd = new System.Random.ctor();
                    Pidroh.ConsoleApp.Turnbased.RandomSupplier.Generate = function () {
                        return rnd.nextDouble();
                    };
                    gr.v = new Pidroh.ConsoleApp.Turnbased.GameMain();
                    TextBoard.v = gr.v.GetBoard();

                },
                UpdateGame: function () {
                    BridgeBuild.App.TextBoard = BridgeBuild.App.gr.GetBoard();
                    BridgeBuild.App.gr.Draw(0.033);
                    if (BridgeBuild.App.bufferOn) {
                        BridgeBuild.App.gr.Input = (BridgeBuild.App.buffer) & 65535;
                        BridgeBuild.App.bufferOn = false;
                    } else {
                        BridgeBuild.App.gr.Input = 0;
                    }
                    clear();
                    for (var j = 0; j < BridgeBuild.App.TextBoard.Height; j = (j + 1) | 0) {
                        for (var i = 0; i < BridgeBuild.App.TextBoard.Width; i = (i + 1) | 0) {
                            draw(i, j, BridgeBuild.App.colors[System.Array.index(BridgeBuild.App.TextBoard.TextColor.get([i, j]), BridgeBuild.App.colors)], BridgeBuild.App.colors[System.Array.index(BridgeBuild.App.TextBoard.BackColor.get([i, j]), BridgeBuild.App.colors)], "" + String.fromCharCode(BridgeBuild.App.TextBoard.CharAt(i, j)));
                            //sb.Append(TextBoard.CharAt(i, j));

                        }
                    }
                    //Console.Write("...");
                    //text.InnerHTML = sb.ToString();
                    window.setTimeout(BridgeBuild.App.UpdateGame, 33);
                }
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.AsyncTasks");

    Bridge.define("Pidroh.ConsoleApp.Turnbased.DelayedActions", {
        fields: {
            times: null,
            lists: null
        },
        ctors: {
            init: function () {
                this.times = new (System.Collections.Generic.List$1(System.Single)).ctor();
                this.lists = new (System.Collections.Generic.List$1(System.Collections.IList)).ctor();
            }
        },
        methods: {
            Update: function (delta) {
                for (var i = 0; i < this.times.Count; i = (i + 1) | 0) {
                    this.times.setItem(i, this.times.getItem(i)-delta);
                    if (this.times.getItem(i) <= 0) {
                        this.Execute(i);
                        this.EndTask(i);
                    }
                }
            },
            Add: function (time) {
                this.times.add(time);
            },
            IsDone: function () {
                return this.times.Count === 0;
            },
            EndTask: function (i) {
                var $t;
                this.times.removeAt(i);
                $t = Bridge.getEnumerator(this.lists);
                try {
                    while ($t.moveNext()) {
                        var l = $t.Current;
                        l.System$Collections$IList$removeAt(i);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }}
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.AsyncTrack");

    Bridge.define("Pidroh.ConsoleApp.Turnbased.BattleBasicConfig", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new Pidroh.ConsoleApp.Turnbased.BattleBasicConfig(); }
            }
        },
        fields: {
            nEnemies: 0,
            nTurns: 0
        },
        ctors: {
            $ctor1: function (nEnemies, nTurns) {
                this.$initialize();
                this.nEnemies = nEnemies;
                this.nTurns = nTurns;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([6484434679, this.nEnemies, this.nTurns]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Pidroh.ConsoleApp.Turnbased.BattleBasicConfig)) {
                    return false;
                }
                return Bridge.equals(this.nEnemies, o.nEnemies) && Bridge.equals(this.nTurns, o.nTurns);
            },
            $clone: function (to) {
                var s = to || new Pidroh.ConsoleApp.Turnbased.BattleBasicConfig();
                s.nEnemies = this.nEnemies;
                s.nTurns = this.nTurns;
                return s;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.ITextScreen", {
        $kind: "interface"
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.BattleRender.Colors", {
        $kind: "nested class",
        statics: {
            fields: {
                GridHero: 0,
                GridEnemy: 0,
                Hero: 0,
                Enemy: 0,
                HeroTurn: 0,
                EnemyTurn: 0,
                inputKey: 0,
                Board: 0,
                WindowLabel: 0,
                FireAura: 0,
                IceAura: 0,
                ThunderAura: 0,
                FireShot: 0,
                IceShot: 0,
                ThunderShot: 0
            },
            ctors: {
                init: function () {
                    this.GridHero = 1;
                    this.GridEnemy = 2;
                    this.Hero = 3;
                    this.Enemy = 4;
                    this.HeroTurn = 5;
                    this.EnemyTurn = 6;
                    this.inputKey = 7;
                    this.Board = 8;
                    this.WindowLabel = 9;
                    this.FireAura = 10;
                    this.IceAura = 11;
                    this.ThunderAura = 12;
                    this.FireShot = 13;
                    this.IceShot = 14;
                    this.ThunderShot = 15;
                }
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey", {
        $kind: "nested enum",
        statics: {
            fields: {
                NONE: 0,
                LEFT: 1,
                RIGHT: 2,
                DOWN: 3,
                UP: 4,
                FIRE: 5,
                REDO: 6,
                DONE: 7,
                ICE: 8,
                THUNDER: 9,
                NORMALSHOT: 10
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.BattleResult", {
        fields: {
            result: 0
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.ColorStuff", {
        statics: {
            fields: {
                GoodMain: null,
                neutralDark: null,
                neutralStrong: null,
                GoodSub: null,
                EvilMain: null,
                colors: null
            },
            ctors: {
                init: function () {
                    this.neutralDark = "#19013b";
                    this.neutralStrong = "#2c3e43";
                    this.colors = System.Array.init(20, null, System.String);
                },
                ctor: function () {
                    for (var i = 0; i < Pidroh.ConsoleApp.Turnbased.ColorStuff.colors.length; i = (i + 1) | 0) {
                        Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(i, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#131313";
                    }
                    //colors[Colors.Hero] = "#009c8d";
                    //const string heroSub = "#005f91";
                    //colors[Colors.HeroTurn] = heroSub;
                    //colors[Colors.Enemy] = "#ff0353";
                    //colors[Colors.GridHero] = heroSub;
                    //colors[BattleRender.Colors.GridEnemy] = "#8e0060";
                    //colors[BattleRender.Colors.EnemyTurn] = "#8e0060";
                    //colors[BattleRender.Colors.Board] = "#1e486e";
                    //colors[BattleRender.Colors.inputKey] = "#688690";
                    //colors[BattleRender.Colors.WindowLabel] = "#1e486e";
                    //colors[BattleRender.Colors.FireAura] = "#793100";
                    //colors[BattleRender.Colors.IceAura] = "#005590";
                    //colors[BattleRender.Colors.ThunderAura] = "#00583d";

                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Hero, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#8ad896";
                    var heroSub = "#4c6d50";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.HeroTurn, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = heroSub;
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Enemy, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#ff7694";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = heroSub;
                    var enemysub = "#a7464f";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridEnemy, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = enemysub;
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.EnemyTurn, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = enemysub;
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Board, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#1e486e";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.inputKey, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#688690";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#1e486e";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.FireAura, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#793100";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.IceAura, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#005590";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.ThunderAura, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#00583d";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.FireShot, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#f82b36";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.IceShot, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#007eff";
                    Pidroh.ConsoleApp.Turnbased.ColorStuff.colors[System.Array.index(Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.ThunderShot, Pidroh.ConsoleApp.Turnbased.ColorStuff.colors)] = "#a37c00";

                }
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.DebugExtra.DebugEx", {
        statics: {
            fields: {
                messages: null
            },
            ctors: {
                init: function () {
                    this.messages = new (System.Collections.Generic.List$1(System.String)).ctor();
                }
            },
            methods: {
                Log: function (v) {
                    Pidroh.ConsoleApp.Turnbased.DebugExtra.DebugEx.messages.add(v);
                },
                Show: function () {
                    var $t;
                    System.Console.Clear();
                    $t = Bridge.getEnumerator(Pidroh.ConsoleApp.Turnbased.DebugExtra.DebugEx.messages);
                    try {
                        while ($t.moveNext()) {
                            var item = $t.Current;
                            System.Console.WriteLine(item);

                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }prompt();
                }
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.Happs.Happ", {
        fields: {
            MainTag: null,
            TimeStamp: 0,
            attrs: null
        },
        ctors: {
            init: function () {
                this.attrs = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute)).ctor();
            },
            ctor: function (mainTag) {
                this.$initialize();
                this.MainTag = Bridge.toString(mainTag);
            }
        },
        methods: {
            AddAttribute: function (a) {
                this.attrs.add(a);
                return this;
            },
            GetAttribute_Int: function (index) {
                return Bridge.Int.clip32(this.attrs.getItem(index).Value);
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute", {
        $kind: "nested class",
        fields: {
            Value: 0,
            tags: null
        },
        ctors: {
            init: function () {
                this.tags = new Pidroh.ConsoleApp.Turnbased.Happs.TagHolder();
            }
        },
        methods: {
            SetValue: function (f) {
                this.Value = f;
                return this;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.Happs.HappHandler", {
        fields: {
            mainTag: null,
            Handle: null
        },
        ctors: {
            ctor: function (mainTag, handle) {
                this.$initialize();
                this.mainTag = Bridge.toString(mainTag);
                this.Handle = handle;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.Happs.HappManager", {
        fields: {
            CurrentTime: 0,
            Happs: null,
            handlers: null,
            latestHandled: 0
        },
        ctors: {
            init: function () {
                this.Happs = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.Happs.Happ)).ctor();
                this.handlers = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.Happs.HappHandler)).ctor();
                this.latestHandled = -1;
            }
        },
        methods: {
            AddHandler: function (hh) {
                this.handlers.add(hh);
            },
            TryHandle: function () {
                if (this.latestHandled !== this.CurrentTime) {
                    this.Handle();
                }
            },
            Handle: function () {
                var $t;
                this.latestHandled = this.CurrentTime;
                $t = Bridge.getEnumerator(this.handlers);
                try {
                    while ($t.moveNext()) {
                        var h = $t.Current;
                        for (var i = (this.Happs.Count - 1) | 0; i >= 0; i = (i - 1) | 0) {
                            //this check assumes happs are ordered by time stamp
                            //which they should be automatically
                            if (this.Happs.getItem(i).TimeStamp !== this.CurrentTime) {
                                Pidroh.ConsoleApp.Turnbased.DebugExtra.DebugEx.Log("Happening not equal to current time");
                                break;
                            }
                            if (Bridge.referenceEquals(this.Happs.getItem(i).MainTag, h.mainTag)) {
                                Pidroh.ConsoleApp.Turnbased.DebugExtra.DebugEx.Log("Happening handled");
                                h.Handle(this.Happs.getItem(i));
                            } else {
                                Pidroh.ConsoleApp.Turnbased.DebugExtra.DebugEx.Log("Happening tag is different");
                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }},
            Add: function (h) {
                h.TimeStamp = this.CurrentTime;
                this.Happs.add(h);
                return h;
            },
            Tick: function () {
                this.CurrentTime = (this.CurrentTime + 1) | 0;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.Happs.TagHolder", {
        fields: {
            Tags: null
        },
        ctors: {
            init: function () {
                this.Tags = new (System.Collections.Generic.List$1(System.Object)).ctor();
            }
        },
        methods: {
            HasTag: function (t) {
                return this.Tags.contains(t);
            },
            Add: function (v) {
                this.Tags.add(v);
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.Input", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new Pidroh.ConsoleApp.Turnbased.Input(); }
            }
        },
        fields: {
            type: 0,
            arg1: 0
        },
        ctors: {
            $ctor2: function (type, arg1) {
                this.$initialize();
                this.type = type;
                this.arg1 = arg1;
            },
            $ctor1: function (type, arg1) {
                this.$initialize();
                this.type = type;
                this.arg1 = System.Convert.toInt32(arg1);
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([1970302653, this.type, this.arg1]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Pidroh.ConsoleApp.Turnbased.Input)) {
                    return false;
                }
                return Bridge.equals(this.type, o.type) && Bridge.equals(this.arg1, o.arg1);
            },
            $clone: function (to) {
                var s = to || new Pidroh.ConsoleApp.Turnbased.Input();
                s.type = this.type;
                s.arg1 = this.arg1;
                return s;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.InputType", {
        $kind: "enum",
        statics: {
            fields: {
                Move: 0,
                MiscBattle: 1
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.MiscBattleInput", {
        $kind: "enum",
        statics: {
            fields: {
                Done: 0,
                Redo: 1
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.Point", {
        statics: {
            fields: {
                up: null,
                down: null,
                right: null,
                left: null
            },
            ctors: {
                init: function () {
                    this.up = new Pidroh.ConsoleApp.Turnbased.Point.$ctor1(0, 1);
                    this.down = new Pidroh.ConsoleApp.Turnbased.Point.$ctor1(0, -1);
                    this.right = new Pidroh.ConsoleApp.Turnbased.Point.$ctor1(1, 0);
                    this.left = new Pidroh.ConsoleApp.Turnbased.Point.$ctor1(-1, 0);
                }
            },
            methods: {
                op_Addition: function (p1, p2) {
                    p1.x = Pidroh.ConsoleApp.Turnbased.Value.op_Addition(p1.x, Pidroh.ConsoleApp.Turnbased.Value.op_Implicit$1(p2.x));
                    p1.y = Pidroh.ConsoleApp.Turnbased.Value.op_Addition(p1.y, Pidroh.ConsoleApp.Turnbased.Value.op_Implicit$1(p2.y));
                    return p1;
                },
                op_Subtraction: function (p1, p2) {
                    p1.x.Val -= Pidroh.ConsoleApp.Turnbased.Value.op_Implicit$1(p2.x);
                    p1.y.Val -= Pidroh.ConsoleApp.Turnbased.Value.op_Implicit$1(p2.y);
                    return p1;
                },
                op_Equality: function (c1, c2) {
                    var c2null = Bridge.referenceEquals(c2, null);
                    var c1null = Bridge.referenceEquals(c1, null);
                    if (c2null && c1null) {
                        return true;
                    }
                    if (c1null || c2null) {
                        return false;
                    }
                    return Pidroh.ConsoleApp.Turnbased.Value.op_Equality(c1.x, c2.x) && Pidroh.ConsoleApp.Turnbased.Value.op_Equality(c1.y, c2.y);
                },
                op_Inequality: function (c1, c2) {
                    var c2null = Bridge.referenceEquals(c2, null);
                    var c1null = Bridge.referenceEquals(c1, null);
                    if (c2null && c1null) {
                        return false;
                    }
                    if (c1null || c2null) {
                        return true;
                    }
                    return !(Pidroh.ConsoleApp.Turnbased.Value.op_Equality(c1.x, c2.x) && Pidroh.ConsoleApp.Turnbased.Value.op_Equality(c1.y, c2.y));
                }
            }
        },
        fields: {
            x: null,
            y: null
        },
        ctors: {
            init: function () {
                this.x = new Pidroh.ConsoleApp.Turnbased.Value();
                this.y = new Pidroh.ConsoleApp.Turnbased.Value();
            },
            $ctor1: function (x, y) {
                this.$initialize();
                this.x.Val = x;
                this.y.Val = y;
            },
            ctor: function () {
                Pidroh.ConsoleApp.Turnbased.Point.$ctor1.call(this, 0, 0);

            }
        },
        methods: {
            Set: function (x, y) {
                this.x.Val = x;
                this.y.Val = y;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.RandomSupplier", {
        statics: {
            fields: {
                Generate: null
            },
            methods: {
                Range: function (min, max) {
                    return Bridge.Int.clip32(Pidroh.ConsoleApp.Turnbased.RandomSupplier.Generate() * (((max - min) | 0)) + min);
                },
                RandomElement: function (T, array) {
                    return array[System.Array.index(Pidroh.ConsoleApp.Turnbased.RandomSupplier.Range(0, array.length), array)];
                }
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues", {
        statics: {
            methods: {
                RandomPosition: function (e) {
                    e.pos.x.Val = Pidroh.ConsoleApp.Turnbased.RandomSupplier.Range(0, 5);
                    e.pos.y.Val = Pidroh.ConsoleApp.Turnbased.RandomSupplier.Range(0, 2);
                }
            }
        },
        fields: {
            entities: null,
            battleState: null,
            happManager: null,
            movementMoves: null,
            enemyMoves: null,
            inputs: null,
            playerHand: null,
            attackDatas: null,
            timeToChooseMax: 0,
            timeToChoose: 0,
            battleResult: null,
            nEnemies: 0
        },
        ctors: {
            init: function () {
                this.entities = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattleEntity)).ctor();
                this.battleState = new Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattleState();
                this.happManager = new Pidroh.ConsoleApp.Turnbased.Happs.HappManager();
                this.movementMoves = new (System.Collections.Generic.Dictionary$2(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType,Pidroh.ConsoleApp.Turnbased.Point))();
                this.inputs = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.Input)).ctor();
                this.playerHand = new (System.Collections.Generic.List$1(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType)).ctor();
                this.attackDatas = System.Array.init([new Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.AttackMove.$ctor1(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.Element.Thunder, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.Thunder), new Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.AttackMove.$ctor1(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.Element.Fire, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.Fire), new Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.AttackMove.$ctor1(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.Element.None, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.NormalShot), new Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.AttackMove.$ctor1(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.Element.Ice, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.Ice)], Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.AttackMove);
                this.timeToChooseMax = 15.0;
                this.timeToChoose = -1;
                this.battleResult = new Pidroh.ConsoleApp.Turnbased.BattleResult();
            },
            ctor: function (mode) {
                this.$initialize();
                this.movementMoves.add(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.Point.up);
                this.movementMoves.add(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.Point.down);
                this.movementMoves.add(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.Point.left);
                this.movementMoves.add(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.Point.right);

                this.playerHand.clear();
                this.playerHand.add(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveRight);
                this.playerHand.add(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveLeft);
                this.playerHand.add(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveDown);
                this.playerHand.add(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveUp);

                if (mode === 0) {
                    this.playerHand.add(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.NormalShot);
                    this.enemyMoves = System.Array.init([Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.NormalShot], Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType);
                } else {
                    this.playerHand.add(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.Fire);
                    this.playerHand.add(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.Ice);
                    this.playerHand.add(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.Thunder);

                    this.enemyMoves = System.Array.init([Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.Fire, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.Ice, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.Thunder], Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType);
                }

                //playerHand.Add(MoveType.NormalShot);

            }
        },
        methods: {
            IsVictory: function () {
                return this.battleResult.result === 1;
            },
            BasicConfig: function (basicConfig) {
                this.battleState.turnsPerPhase.Val = basicConfig.nTurns;
                this.nEnemies = basicConfig.nEnemies;
            },
            Init: function () {

                var hero = new Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattleEntity();

                hero.pos.Set(1, 1);
                hero.minPos.Set(0, 0);
                hero.maxPos.Set(2, 2);
                hero.Type = Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.EntityType.hero;
                hero.life.Val = 2;

                this.entities.add(hero);

                for (var i = 0; i < this.nEnemies; i = (i + 1) | 0) {
                    var enemy = new Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattleEntity();
                    enemy.pos.Set(((3 + i) | 0), 1);
                    enemy.minPos.Set(3, 0);
                    enemy.maxPos.Set(5, 2);
                    enemy.life.Val = 2;
                    enemy.graphic = (1 + i) | 0;
                    enemy.Type = Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.EntityType.enemy;
                    this.entities.add(enemy);
                }

                {
                    //GameEntity pickup = new GameEntity();
                    //pickup.Type = EntityType.pickup;
                    //pickup.pos.Set(0, 2);
                    //pickup.life.Val = 2;
                    //pickup.graphic = 4;
                    //entities.Add(pickup);
                }
                //{
                //    BattleEntity panelEffect = new BattleEntity();
                //    panelEffect.Type = EntityType.paneleffect;
                //    panelEffect.pos.Set(0, 2);
                //    panelEffect.life.Val = 5;
                //    panelEffect.graphic = 5;
                //    panelEffect.randomPosition = true;
                //    panelEffect.drawLife = false;
                //    panelEffect.drawTurn = false;
                //    RandomPosition(panelEffect);
                //    entities.Add(panelEffect);
                //}

                //{
                //    BattleEntity panelEffect = new BattleEntity();
                //    panelEffect.Type = EntityType.paneleffect;
                //    panelEffect.pos.Set(0, 2);
                //    panelEffect.life.Val = 5;
                //    panelEffect.graphic = 5;
                //    panelEffect.randomPosition = true;
                //    panelEffect.drawLife = false;
                //    panelEffect.drawTurn = false;
                //    RandomPosition(panelEffect);
                //    entities.Add(panelEffect);
                //}

                this.Reset();
                this.ExecutePhase();
            },
            Reset: function () {
                for (var i = 0; i < this.entities.Count; i = (i + 1) | 0) {
                    this.entities.getItem(i).life.Val = 3;
                }
                this.ChangePhase(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattlePhase.EnemyMoveChoice);
                this.battleState.turn.Val = 0;
                this.battleState.actingEntity = 0;
                this.battleState.moveTick_Now.Val = 0;
                this.battleState.moveTick_Total.Val = 1;
                this.battleResult.result = 0;
            },
            IsOver: function () {
                return this.battleResult.result !== 0;
            },
            Tick: function () {
                var $t;
                this.FinishPreviousTick();
                var heroAlive = false;
                var enemyAlive = false;
                $t = Bridge.getEnumerator(this.entities);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        if (item.Type === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.EntityType.enemy) {
                            if (Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(item.life) > 0) {
                                enemyAlive = true;
                            }
                        }
                        if (item.Type === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.EntityType.hero) {
                            if (Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(item.life) > 0) {
                                heroAlive = true;
                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }if (!heroAlive) {
                    this.battleResult.result = 2;

                } else if (!enemyAlive) {
                    this.battleResult.result = 1;
                }
                if (this.battleResult.result === 0) {
                    this.happManager.Tick();
                    this.ExecutePhase();
                }

            },
            Update: function (delta) {
                if (this.timeToChoose > 0 && this.battleState.phase === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattlePhase.PickHands) {
                    this.timeToChoose -= delta;
                    if (this.timeToChoose <= 0) {
                        this.Tick();
                    }
                }


            },
            FinishPreviousTick: function () {
                var $t, $t1;
                var previousPhase = this.battleState.phase;
                switch (previousPhase) {
                    case Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattlePhase.EnemyMoveChoice: 
                        this.ChangePhase(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattlePhase.HandRecharge);
                        break;
                    case Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattlePhase.HandRecharge: 
                        this.ChangePhase(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattlePhase.PickHands);
                        break;
                    case Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattlePhase.PickHands: 
                        this.ChangePhase(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattlePhase.ExecuteMove);
                        break;
                    case Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattlePhase.ExecuteMove: 
                        if (Pidroh.ConsoleApp.Turnbased.Value.op_Implicit$1(this.battleState.moveTick_Now) >= Pidroh.ConsoleApp.Turnbased.Value.op_Subtraction(this.battleState.moveTick_Total, 1)) {
                            this.battleState.moveTick_Now.Val = 0;
                            this.battleState.moveTick_Total.Val = 1;
                            var noMoreUnitsToActThisTurn = true;
                            var i_initial = (this.battleState.actingEntity + 1) | 0;
                            if (i_initial < this.entities.Count) {
                                for (var i = i_initial; i < this.entities.Count; i = (i + 1) | 0) {
                                    if (this.entities.getItem(i).Alive) {
                                        this.battleState.actingEntity = i;
                                        noMoreUnitsToActThisTurn = false;
                                        break;
                                    }
                                }
                            }


                            if (noMoreUnitsToActThisTurn) {
                                if (Pidroh.ConsoleApp.Turnbased.Value.op_Implicit$1(this.battleState.turn) >= Pidroh.ConsoleApp.Turnbased.Value.op_Subtraction(this.battleState.turnsPerPhase, 1)) {
                                    this.ChangePhase(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattlePhase.EnemyMoveChoice);
                                    $t = Bridge.getEnumerator(this.entities);
                                    try {
                                        while ($t.moveNext()) {
                                            var e = $t.Current;
                                            if (e.randomPosition) {
                                                Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.RandomPosition(e);
                                            }
                                        }
                                    } finally {
                                        if (Bridge.is($t, System.IDisposable)) {
                                            $t.System$IDisposable$dispose();
                                        }
                                    }} else {
                                    this.battleState.actingEntity = 0;
                                    this.battleState.turn = Pidroh.ConsoleApp.Turnbased.Value.op_Addition(this.battleState.turn, 1);
                                }
                            }
                        } else {
                            $t1 = this.battleState.moveTick_Now;
                            $t1.Val += 1;
                        }
                        break;
                    default: 
                        break;
                }
            },
            ChangePhase: function (phase) {
                var $t, $t1;
                var previousPhase = this.battleState.phase;
                if (phase === previousPhase) {
                    return;
                }
                if (phase === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattlePhase.PickHands) {
                    this.timeToChoose = this.timeToChooseMax;
                }
                if (previousPhase === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattlePhase.ExecuteMove) {
                    this.battleState.turn.Val = 0;
                    this.battleState.actingEntity = 0;
                    this.battleState.moveTick_Now.Val = 0;
                    this.battleState.moveTick_Total.Val = 1;
                    $t = Bridge.getEnumerator(this.entities);
                    try {
                        while ($t.moveNext()) {
                            var e = $t.Current;
                            $t1 = Bridge.getEnumerator(e.moves);
                            try {
                                while ($t1.moveNext()) {
                                    var m = $t1.Current;
                                    if (Pidroh.ConsoleApp.Turnbased.Value.op_Inequality(m, null)) {
                                        m.Val = -1;
                                    }
                                }
                            } finally {
                                if (Bridge.is($t1, System.IDisposable)) {
                                    $t1.System$IDisposable$dispose();
                                }
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }}
                this.battleState.phase = phase;
            },
            ExecutePhase: function () {
                var $t;
                var phase = this.battleState.phase;
                switch (phase) {
                    case Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattlePhase.EnemyMoveChoice: 
                        this.EnemyGenerateMoves();
                        break;
                    case Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattlePhase.HandRecharge: 
                        break;
                    case Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattlePhase.PickHands: 
                        this.inputs.clear();
                        $t = Bridge.getEnumerator(this.playerHand);
                        try {
                            while ($t.moveNext()) {
                                var hi = $t.Current;
                                this.inputs.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor2(Pidroh.ConsoleApp.Turnbased.InputType.Move, hi));
                            }
                        } finally {
                            if (Bridge.is($t, System.IDisposable)) {
                                $t.System$IDisposable$dispose();
                            }
                        }this.inputs.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Bridge.box(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Redo, Pidroh.ConsoleApp.Turnbased.MiscBattleInput, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MiscBattleInput))));
                        this.inputs.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Bridge.box(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Done, Pidroh.ConsoleApp.Turnbased.MiscBattleInput, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MiscBattleInput))));
                        break;
                    case Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattlePhase.ExecuteMove: 
                        this.ExecuteMoves();
                        break;
                    default: 
                        break;
                }
            },
            InputDone: function (input) {
                var $t;
                if (input.type === Pidroh.ConsoleApp.Turnbased.InputType.Move) {
                    var arg1 = input.arg1;
                    if (this.playerHand.contains(arg1)) {
                        this.MoveChosen(arg1);
                    }
                }

                if (input.type === Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle) {
                    var misc = input.arg1;
                    if (misc === Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Redo) {
                        $t = Bridge.getEnumerator(this.entities);
                        try {
                            while ($t.moveNext()) {
                                var e = $t.Current;
                                if (e.Type === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.EntityType.hero) {
                                    for (var i = 0; i < e.moves.length; i = (i + 1) | 0) {
                                        if (Pidroh.ConsoleApp.Turnbased.Value.op_Equality(e.moves[System.Array.index(i, e.moves)], null)) {
                                            e.moves[System.Array.index(i, e.moves)] = new Pidroh.ConsoleApp.Turnbased.Value();
                                            e.moves[System.Array.index(i, e.moves)].Val = -1;
                                        }
                                        var value = e.moves[System.Array.index(i, e.moves)];

                                        if (value.Val === -1 || i === Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(this.battleState.turnsPerPhase)) {
                                            if (i > 0) {
                                                e.moves[System.Array.index(((i - 1) | 0), e.moves)].Val = -1;
                                            }
                                        }
                                    }
                                }
                            }
                        } finally {
                            if (Bridge.is($t, System.IDisposable)) {
                                $t.System$IDisposable$dispose();
                            }
                        }}
                    if (misc === Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Done) {
                        this.Tick();
                    }
                }
            },
            MoveChosen: function (moveType) {
                var $t;
                $t = Bridge.getEnumerator(this.entities);
                try {
                    while ($t.moveNext()) {
                        var e = $t.Current;
                        if (e.Type === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.EntityType.hero) {
                            for (var i = 0; i < e.moves.length; i = (i + 1) | 0) {
                                if (Pidroh.ConsoleApp.Turnbased.Value.op_Equality(e.moves[System.Array.index(i, e.moves)], null)) {
                                    e.moves[System.Array.index(i, e.moves)] = new Pidroh.ConsoleApp.Turnbased.Value();
                                    e.moves[System.Array.index(i, e.moves)].Val = -1;
                                }
                                var value = e.moves[System.Array.index(i, e.moves)];

                                if (value.Val === -1) {

                                    e.moves[System.Array.index(i, e.moves)].valAsEnum = Bridge.box(moveType, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType));
                                    break;
                                }
                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }},
            EnemyGenerateMoves: function () {
                var $t;
                $t = Bridge.getEnumerator(this.entities);
                try {
                    while ($t.moveNext()) {
                        var e = $t.Current;
                        if (e.Type === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.EntityType.enemy) {
                            for (var i = 0; i < e.moves.length; i = (i + 1) | 0) {
                                if (Pidroh.ConsoleApp.Turnbased.Value.op_Equality(e.moves[System.Array.index(i, e.moves)], null)) {
                                    e.moves[System.Array.index(i, e.moves)] = new Pidroh.ConsoleApp.Turnbased.Value();
                                }
                                //e.moves[i].Val = 0;
                                e.moves[System.Array.index(i, e.moves)].valAsEnum = Bridge.box(Pidroh.ConsoleApp.Turnbased.RandomSupplier.RandomElement(Bridge.global.Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, this.enemyMoves), Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType));

                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }},
            ExecuteMoves: function () {

                //Console.Write("bla" + battleState.turn.Val);
                //Console.Read();
                var attacker = this.entities.getItem(this.battleState.actingEntity);
                var turn = Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(this.battleState.turn);
                this.ExecuteMove(attacker, turn);
            },
            ExecuteMove: function (actor, turn) {
                var $t, $t1, $t2;
                this.battleState.moveTick_Total.Set(1); //default value

                var value = actor.moves[System.Array.index(turn, actor.moves)];
                if (Pidroh.ConsoleApp.Turnbased.Value.op_Inequality(value, null)) {
                    var mv = Bridge.Int.clip32(value.Val);


                    var isAttackMove = mv === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.NormalShot;
                    var attackElement = Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.Element.None;
                    $t = Bridge.getEnumerator(this.attackDatas);
                    try {
                        while ($t.moveNext()) {
                            var item = $t.Current.$clone();
                            if (item.moveType === mv) {
                                isAttackMove = true;
                                attackElement = item.element;
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }if (isAttackMove) {
                        var target = null;
                        var minDis = 10;
                        actor.element = attackElement;
                        $t1 = Bridge.getEnumerator(this.entities);
                        try {
                            while ($t1.moveNext()) {
                                var e2 = $t1.Current;

                                if (e2.Dead) {
                                    continue;
                                }
                                if (actor.Type !== e2.Type && e2.Type !== Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.EntityType.paneleffect && e2.Type !== Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.EntityType.pickup) {
                                    var sameHeight = Pidroh.ConsoleApp.Turnbased.Value.op_Equality(actor.pos.y, e2.pos.y);

                                    if (sameHeight) {
                                        var dis = Pidroh.ConsoleApp.Turnbased.Value.op_Subtraction(actor.pos.x, Pidroh.ConsoleApp.Turnbased.Value.op_Implicit$1(e2.pos.x));
                                        if (dis < 0) {
                                            dis *= -1;
                                        }
                                        if (dis < minDis) {
                                            minDis = dis;
                                            target = e2;
                                        }

                                    }
                                }
                            }
                        } finally {
                            if (Bridge.is($t1, System.IDisposable)) {
                                $t1.System$IDisposable$dispose();
                            }
                        }if (target != null) {
                            var attackDefense = actor.element === target.element && actor.element !== Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.Element.None;
                            if (attackDefense) {


                            }

                            {
                                if (Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(this.battleState.moveTick_Now) === 1) {
                                    if (!attackDefense) {
                                        var mul = this.CalculateAttackMultiplier(actor);
                                        mul *= this.CalculateDefenderMultiplier(target);
                                        if ((actor.element === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.Element.Fire && target.element === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.Element.Ice) || (actor.element === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.Element.Thunder && target.element === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.Element.Fire) || (actor.element === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.Element.Ice && target.element === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.Element.Thunder)) {
                                            mul *= 3;
                                        }


                                        target.life.Val -= 1 * mul;
                                        actor.damageMultiplier = 1;
                                        this.happManager.Add(new Pidroh.ConsoleApp.Turnbased.Happs.Happ(Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.HappTag.DamageTaken, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.HappTag, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.HappTag)))).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(this.entities.indexOf(target)));
                                    }
                                } else {
                                    this.happManager.Add(new Pidroh.ConsoleApp.Turnbased.Happs.Happ(Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.HappTag.AttackHit, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.HappTag, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.HappTag)))).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(this.entities.indexOf(target))).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(this.entities.indexOf(actor))).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(attackElement));


                                    this.battleState.moveTick_Total.Set(2);
                                }
                            }


                        } else {
                            this.battleState.moveTick_Total.Set(1);
                            this.happManager.Add(new Pidroh.ConsoleApp.Turnbased.Happs.Happ(Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.HappTag.AttackMiss, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.HappTag, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.HappTag)))).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(this.entities.indexOf(actor))).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(attackElement));
                        }
                    }

                    var p = { };
                    if (this.movementMoves.tryGetValue(mv, p)) {
                        actor.pos = Pidroh.ConsoleApp.Turnbased.Point.op_Addition(actor.pos, p.v);
                        var invalidMove = Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(actor.pos.x) < Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(actor.minPos.x) || Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(actor.pos.y) < Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(actor.minPos.y) || Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(actor.pos.y) > Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(actor.maxPos.y) || Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(actor.pos.x) > Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(actor.maxPos.x);
                        $t2 = Bridge.getEnumerator(this.entities);
                        try {
                            while ($t2.moveNext()) {
                                var e = $t2.Current;
                                if (!Bridge.referenceEquals(e, actor) && e.Alive) {
                                    if (Pidroh.ConsoleApp.Turnbased.Point.op_Equality(actor.pos, e.pos)) {
                                        invalidMove = true;
                                        if (e.Type === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.EntityType.pickup) {
                                            e.life.Val = 0;
                                            actor.damageMultiplier = 2;
                                            invalidMove = false;
                                        }
                                        if (e.Type === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.EntityType.paneleffect) {
                                            invalidMove = false;
                                        }
                                        if (invalidMove) {
                                            break;
                                        }


                                    }
                                }
                            }
                        } finally {
                            if (Bridge.is($t2, System.IDisposable)) {
                                $t2.System$IDisposable$dispose();
                            }
                        }if (invalidMove) {
                            //Console.WriteLine("Invalid move generate" + battleState.moveTick_Now.Val);
                            this.happManager.Add(new Pidroh.ConsoleApp.Turnbased.Happs.Happ(Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.HappTag.MovementFail, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.HappTag, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.HappTag)))).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(this.entities.indexOf(actor))).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(Pidroh.ConsoleApp.Turnbased.Value.op_Implicit$1(actor.pos.x))).AddAttribute(new Pidroh.ConsoleApp.Turnbased.Happs.Happ.Attribute().SetValue(Pidroh.ConsoleApp.Turnbased.Value.op_Implicit$1(actor.pos.y)));

                            this.battleState.moveTick_Total.Set(1);
                            actor.pos = Pidroh.ConsoleApp.Turnbased.Point.op_Subtraction(actor.pos, p.v);
                        }

                    }
                }
            },
            CalculateAttackMultiplier: function (actor) {
                var $t;
                var baseD = actor.damageMultiplier;
                $t = Bridge.getEnumerator(this.entities);
                try {
                    while ($t.moveNext()) {
                        var e = $t.Current;
                        if (!Bridge.referenceEquals(e, actor)) {
                            if (Pidroh.ConsoleApp.Turnbased.Point.op_Equality(e.pos, actor.pos)) {
                                if (e.Type === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.EntityType.paneleffect) {
                                    baseD *= 3;
                                }
                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }return baseD;
            },
            CalculateDefenderMultiplier: function (actor) {
                var $t;
                var baseD = 1;
                $t = Bridge.getEnumerator(this.entities);
                try {
                    while ($t.moveNext()) {
                        var e = $t.Current;
                        if (!Bridge.referenceEquals(e, actor)) {
                            if (Pidroh.ConsoleApp.Turnbased.Point.op_Equality(e.pos, actor.pos)) {
                                if (e.Type === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.EntityType.paneleffect) {
                                    baseD = Bridge.Int.mul(baseD, 3);
                                }
                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }return baseD;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.AttackMove", {
        $kind: "nested struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.AttackMove(); }
            }
        },
        fields: {
            element: 0,
            moveType: 0
        },
        ctors: {
            $ctor1: function (element, moveType) {
                this.$initialize();
                this.element = element;
                this.moveType = moveType;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([3502392602, this.element, this.moveType]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.AttackMove)) {
                    return false;
                }
                return Bridge.equals(this.element, o.element) && Bridge.equals(this.moveType, o.moveType);
            },
            $clone: function (to) {
                var s = to || new Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.AttackMove();
                s.element = this.element;
                s.moveType = this.moveType;
                return s;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattleEntity", {
        $kind: "nested class",
        fields: {
            life: null,
            active: null,
            pos: null,
            minPos: null,
            maxPos: null,
            value: null,
            moves: null,
            graphic: 0,
            damageMultiplier: 0,
            drawLife: false,
            drawTurn: false,
            randomPosition: false,
            element: 0,
            Type: 0
        },
        props: {
            PositionV2D: {
                get: function () {
                    return new Pidroh.TextRendering.Vector2D.$ctor2(Pidroh.ConsoleApp.Turnbased.Value.op_Implicit$1(this.pos.x), Pidroh.ConsoleApp.Turnbased.Value.op_Implicit$1(this.pos.y));
                }
            },
            Dead: {
                get: function () {
                    return Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(this.life) <= 0;
                }
            },
            Alive: {
                get: function () {
                    return !this.Dead;
                }
            }
        },
        ctors: {
            init: function () {
                this.life = new Pidroh.ConsoleApp.Turnbased.Value();
                this.pos = new Pidroh.ConsoleApp.Turnbased.Point.ctor();
                this.minPos = new Pidroh.ConsoleApp.Turnbased.Point.ctor();
                this.maxPos = new Pidroh.ConsoleApp.Turnbased.Point.ctor();
                this.moves = System.Array.init(10, null, Pidroh.ConsoleApp.Turnbased.Value);
                this.damageMultiplier = 1;
                this.drawLife = true;
                this.drawTurn = true;
                this.randomPosition = false;
                this.element = Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.Element.None;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattlePhase", {
        $kind: "nested enum",
        statics: {
            fields: {
                EnemyMoveChoice: 0,
                HandRecharge: 1,
                PickHands: 2,
                ExecuteMove: 3
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattleState", {
        $kind: "nested class",
        fields: {
            turn: null,
            turnsPerPhase: null,
            moveTick_Now: null,
            moveTick_Total: null,
            actingEntity: 0,
            phase: 0
        },
        ctors: {
            init: function () {
                this.turn = new Pidroh.ConsoleApp.Turnbased.Value();
                this.turnsPerPhase = new Pidroh.ConsoleApp.Turnbased.Value();
                this.moveTick_Now = new Pidroh.ConsoleApp.Turnbased.Value();
                this.moveTick_Total = new Pidroh.ConsoleApp.Turnbased.Value();
                this.actingEntity = 0;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.Element", {
        $kind: "nested enum",
        statics: {
            fields: {
                Fire: 0,
                Ice: 1,
                Thunder: 2,
                None: 3
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.EntityType", {
        $kind: "nested enum",
        statics: {
            fields: {
                hero: 0,
                enemy: 1,
                pickup: 2,
                paneleffect: 3
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.HappTag", {
        $kind: "nested enum",
        statics: {
            fields: {
                AttackHit: 0,
                AttackMiss: 1,
                DamageTaken: 2,
                MovementFail: 3
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType", {
        $kind: "nested enum",
        statics: {
            fields: {
                DoNothing: 0,
                MoveUp: 1,
                MoveDown: 2,
                MoveLeft: 3,
                MoveRight: 4,
                NormalShot: 5,
                Fire: 6,
                Ice: 7,
                Thunder: 8
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.Value", {
        statics: {
            methods: {
                op_Addition: function (c1, c2) {
                    c1.Val += c2;
                    return c1;
                },
                op_Subtraction: function (c1, c2) {
                    return c1.Val - c2;
                },
                op_Equality: function (c1, c2) {
                    var c2null = Bridge.referenceEquals(c2, null);
                    var c1null = Bridge.referenceEquals(c1, null);
                    if (c2null && c1null) {
                        return true;
                    }
                    if (c1null || c2null) {
                        return false;
                    }
                    return c1.Val === c2.Val;
                },
                op_Inequality: function (c1, c2) {
                    var c2null = Bridge.referenceEquals(c2, null);
                    var c1null = Bridge.referenceEquals(c1, null);
                    if (c2null && c1null) {
                        return false;
                    }
                    if (c1null || c2null) {
                        return true;
                    }
                    return c1.Val !== c2.Val;
                },
                op_Implicit$1: function (d) {
                    return d.Val;
                },
                op_Implicit: function (d) {
                    return Bridge.Int.clip32(d.Val);
                }
            }
        },
        fields: {
            Val: 0
        },
        props: {
            valAsEnum: {
                set: function (value) {
                    this.Val = System.Convert.toSingle(value);
                }
            }
        },
        methods: {
            Set: function (v) {
                this.Val = v;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.TextAnimation", {
        fields: {
            length: null,
            progress: null,
            targets: null,
            lists: null
        },
        ctors: {
            init: function () {
                this.length = new (System.Collections.Generic.List$1(System.Single)).ctor();
                this.progress = new (System.Collections.Generic.List$1(System.Single)).ctor();
                this.targets = new (System.Collections.Generic.List$1(System.Int32)).ctor();
                this.lists = new (System.Collections.Generic.List$1(System.Collections.IList)).ctor();
            }
        },
        methods: {
            RegisterLists: function () {
                this.lists.add(this.length);
                this.lists.add(this.progress);
                this.lists.add(this.targets);
                this.RequestRegisterLists();
            },
            Update: function (delta) {
                for (var i = 0; i < this.progress.Count; i = (i + 1) | 0) {
                    this.progress.setItem(i, this.progress.getItem(i)+delta);
                    if (this.progress.getItem(i) >= this.length.getItem(i)) {
                        this.EndTask(i);
                    } else {
                        //Execute(i, new BaseData(length[i],progress[i], targets[i]));
                    }
                }
            },
            Add: function (bd) {
                this.progress.add(bd.progress);
                this.targets.add(bd.target);
                this.length.add(bd.length);
            },
            IsDone: function () {
                var $t;
                $t = Bridge.getEnumerator(this.lists);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        if (System.Array.getCount(item) !== this.progress.Count) {
                            var s = null;
                            s.trim();
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }return this.progress.Count === 0;
            },
            EndTask: function (i) {
                var $t;
                $t = Bridge.getEnumerator(this.lists);
                try {
                    while ($t.moveNext()) {
                        var l = $t.Current;

                        l.System$Collections$IList$removeAt(i);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }},
            RegisterList: function (mainData) {
                this.lists.add(mainData);
            },
            Modify$1: function (a) {
                for (var i = 0; i < this.progress.Count; i = (i + 1) | 0) {
                    if (a.id === this.targets.getItem(i)) {
                        this.Modify(a, i, this.progress.getItem(i), this.length.getItem(i));
                        a.animating = true;
                    }
                }
            },
            Modify: function (entity, index, progress, length) { }
        }
    });

    Bridge.define("Pidroh.TextRendering.TextAnimation.BaseData", {
        $kind: "nested struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new Pidroh.TextRendering.TextAnimation.BaseData(); }
            }
        },
        fields: {
            length: 0,
            progress: 0,
            target: 0
        },
        ctors: {
            $ctor1: function (length, progress, target) {
                this.$initialize();
                this.length = length;
                this.progress = progress;
                this.target = target;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([3337077382, this.length, this.progress, this.target]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Pidroh.TextRendering.TextAnimation.BaseData)) {
                    return false;
                }
                return Bridge.equals(this.length, o.length) && Bridge.equals(this.progress, o.progress) && Bridge.equals(this.target, o.target);
            },
            $clone: function (to) {
                var s = to || new Pidroh.TextRendering.TextAnimation.BaseData();
                s.length = this.length;
                s.progress = this.progress;
                s.target = this.target;
                return s;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.TextBoard", {
        statics: {
            fields: {
                NOCHANGECHAR: 0,
                INVISIBLECHAR: 0,
                NOCHANGECOLOR: 0,
                INVISIBLECOLOR: 0
            },
            ctors: {
                init: function () {
                    this.NOCHANGECHAR = 1;
                    this.INVISIBLECHAR = 2;
                    this.NOCHANGECOLOR = -2;
                    this.INVISIBLECOLOR = -1;
                }
            }
        },
        fields: {
            chars: null,
            TextColor: null,
            BackColor: null,
            cursorX: 0,
            cursorY: 0,
            Position: null,
            Width: 0,
            Height: 0
        },
        props: {
            CursorX: {
                get: function () {
                    return this.cursorX;
                },
                set: function (value) {
                    this.cursorX = value;
                }
            },
            CursorY: {
                get: function () {
                    return this.cursorY;
                },
                set: function (value) {
                    this.cursorY = value;
                }
            }
        },
        ctors: {
            init: function () {
                this.Position = new Pidroh.TextRendering.Vector2D();
                this.cursorX = 0;
                this.cursorY = 0;
            },
            ctor: function (width, height) {
                this.$initialize();
                //SetMaxSize(width, height);
                this.Resize(width, height);
            }
        },
        methods: {
            DrawOnCenter: function (message, color, xOff, yOff, alignString) {
                if (xOff === void 0) { xOff = 0; }
                if (yOff === void 0) { yOff = 0; }
                if (alignString === void 0) { alignString = true; }
                var x = (Bridge.Int.div((this.Width), 2)) | 0;
                if (alignString) {
                    x = (x - (((Bridge.Int.div(message.length, 2)) | 0))) | 0;
                }
                var y = (Bridge.Int.div(this.Height, 2)) | 0;
                this.Draw$1(message, ((x + xOff) | 0), ((y + yOff) | 0), color);
            },
            SetMaxSize: function (width, height) {
                this.chars = System.Array.create(0, null, System.Char, width, height);
                this.TextColor = System.Array.create(0, null, System.Int32, width, height);
                this.BackColor = System.Array.create(0, null, System.Int32, width, height);
            },
            Reset: function () {
                this.DrawRepeated(32, 0, 0, this.Width, this.Height, 0, 0);
            },
            ResetInvisible: function () {
                this.DrawRepeated(Pidroh.TextRendering.TextBoard.INVISIBLECHAR, 0, 0, this.Width, this.Height, Pidroh.TextRendering.TextBoard.INVISIBLECOLOR, Pidroh.TextRendering.TextBoard.INVISIBLECOLOR);
            },
            Insert: function (secondBoard) {
                for (var i = 0; i < secondBoard.Width; i = (i + 1) | 0) {
                    for (var j = 0; j < secondBoard.Height; j = (j + 1) | 0) {
                        var x = (Bridge.Int.clip32(secondBoard.Position.X) + i) | 0;
                        var y = (Bridge.Int.clip32(secondBoard.Position.Y) + j) | 0;
                        if (secondBoard.chars.get([i, j]) !== Pidroh.TextRendering.TextBoard.INVISIBLECHAR) {
                            this.chars.set([x, y], secondBoard.chars.get([i, j]));
                        }
                        if (secondBoard.TextColor.get([i, j]) !== Pidroh.TextRendering.TextBoard.INVISIBLECOLOR) {
                            this.TextColor.set([x, y], secondBoard.TextColor.get([i, j]));
                        }
                        if (secondBoard.BackColor.get([i, j]) !== Pidroh.TextRendering.TextBoard.INVISIBLECOLOR) {
                            this.BackColor.set([x, y], secondBoard.BackColor.get([i, j]));
                        }
                    }
                }
            },
            DrawOneDigit: function (i, x, y, color) {
                if (color === void 0) { color = -2; }
                var c = (((i + 48) | 0)) & 65535;
                this.DrawChar$1(c, x, y, color);
            },
            Set: function (origin) {
                this.Position = origin.Position.$clone();
                for (var i = 0; i < this.Width; i = (i + 1) | 0) {
                    for (var j = 0; j < this.Height; j = (j + 1) | 0) {
                        this.chars.set([i, j], origin.chars.get([i, j]));
                        this.BackColor.set([i, j], origin.BackColor.get([i, j]));
                        this.TextColor.set([i, j], origin.TextColor.get([i, j]));
                    }
                }
            },
            Resize: function (w, h) {
                if (this.chars == null || w > System.Array.getLength(this.chars, 0) || h > System.Array.getLength(this.chars, 1)) {
                    this.SetMaxSize(w, h);
                }
                this.Width = w;
                this.Height = h;

            },
            CharAt: function (i, j) {
                return this.chars.get([i, j]);
            },
            SetCursorAt: function (x, y) {
                this.cursorX = x;
                this.cursorY = y;
            },
            Draw_Cursor$2: function (v) {
                var $t;
                $t = Bridge.getEnumerator(v);
                try {
                    while ($t.moveNext()) {
                        var c = $t.Current;
                        this.Draw_Cursor(c);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }},
            Draw_Cursor$3: function (v, color) {
                var $t;
                $t = Bridge.getEnumerator(v);
                try {
                    while ($t.moveNext()) {
                        var c = $t.Current;
                        this.Draw_Cursor$1(c, color);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }},
            Draw_Cursor: function (c) {

                this.DrawChar(c, this.cursorX, this.cursorY);
                this.AdvanceCursor();
            },
            Draw_Cursor$1: function (c, color) {

                this.DrawChar$1(c, this.cursorX, this.cursorY, color);
                this.AdvanceCursor();
            },
            DrawOneDigit_Cursor: function (i) {
                this.Draw_Cursor(((((i + 48) | 0)) & 65535));
            },
            AdvanceCursor: function () {
                this.cursorX = (this.cursorX + 1) | 0;
                if (this.cursorX >= this.Width) {
                    this.cursorX = 0;
                    this.cursorY = (this.cursorY + 1) | 0;
                }
            },
            CursorNewLine: function (x) {
                this.cursorY = (this.cursorY + 1) | 0;
                this.cursorX = x;
            },
            DrawChar: function (v, x, y) {
                if (v !== Pidroh.TextRendering.TextBoard.NOCHANGECHAR) {
                    this.chars.set([x, y], v);
                }
            },
            DrawChar$1: function (v, x, y, color, backColor) {
                if (backColor === void 0) { backColor = -2; }

                this.DrawChar(v, x, y);
                this.SetColor(color, x, y);
                this.SetBackColor(backColor, x, y);
            },
            SetAll: function (text, textColor, backColor) {
                this.DrawRepeated(text, 0, 0, this.Width, this.Height, textColor, backColor);
            },
            DrawWithGrid: function (text, x, y, gridColor, textColor) {
                var width = text.length;
                this.DrawGrid(x, y, ((width + 2) | 0), 3, gridColor);
                this.Draw$1(text, ((x + 1) | 0), ((y + 1) | 0), textColor);
            },
            Draw$1: function (v, x, y, color, backColor) {
                if (backColor === void 0) { backColor = -2; }
                for (var i = 0; i < v.length; i = (i + 1) | 0) {
                    this.DrawChar$1(v.charCodeAt(i), ((x + i) | 0), y, color, backColor);
                }
            },
            Draw: function (v, x, y, color, backColor) {
                if (backColor === void 0) { backColor = -2; }
                for (var i = 0; i < System.Linq.Enumerable.from(v).count(); i = (i + 1) | 0) {
                    this.DrawChar$1(System.Linq.Enumerable.from(v).elementAt(i), ((x + i) | 0), y, color, backColor);
                }
            },
            Draw$2: function (v, x2, y2, input) {
                throw new System.NotImplementedException();
            },
            DrawGrid: function (x, y, width, height, color) {

                this.DrawRepeated(124, x, y, 1, height, color);
                this.DrawRepeated(124, ((((x + width) | 0) - 1) | 0), y, 1, height, color);
                this.DrawRepeated(45, x, y, width, 1, color);
                this.DrawRepeated(45, x, ((((y + height) | 0) - 1) | 0), width, 1, color);
            },
            DrawGrid$1: function (v1, v2, v3, v4, board) {
                throw new System.NotImplementedException();
            },
            DrawRepeated: function (c, x, y, width, height, color, backColor) {
                if (backColor === void 0) { backColor = -2; }
                for (var i = x; i < ((x + width) | 0); i = (i + 1) | 0) {
                    for (var j = y; j < ((y + height) | 0); j = (j + 1) | 0) {
                        this.DrawChar$1(c, i, j, color);

                        this.SetBackColor(backColor, i, j);
                    }
                }
            },
            SetColor: function (color, x, y) {
                if (color !== Pidroh.TextRendering.TextBoard.NOCHANGECOLOR) {
                    this.TextColor.set([x, y], color);
                }
            },
            SetBackColor: function (color, x, y) {
                if (color !== Pidroh.TextRendering.TextBoard.NOCHANGECOLOR) {
                    this.BackColor.set([x, y], color);
                }
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.TextEntity", {
        fields: {
            id: 0,
            origin: null,
            animation: null,
            freeIfIdle: false,
            animating: false
        },
        ctors: {
            init: function () {
                this.freeIfIdle = false;
            }
        },
        methods: {
            AnimBase: function (length) {
                return new Pidroh.TextRendering.TextAnimation.BaseData.$ctor1(length, 0, this.id);
            },
            ResetAnimation: function () {
                this.animating = false;
                this.animation.Set(this.origin);
            },
            ResetFull: function () {
                this.origin.ResetInvisible();
            },
            SetSize: function (w, h) {
                if (this.origin == null) {
                    this.origin = new Pidroh.TextRendering.TextBoard(w, h);
                    this.animation = new Pidroh.TextRendering.TextBoard(w, h);
                }
                this.origin.Resize(w, h);
                this.animation.Resize(w, h);

            }
        }
    });

    Bridge.define("Pidroh.TextRendering.TextWorld", {
        fields: {
            activeAgents: null,
            freeBoards: null,
            animations: null,
            mainBoard: null,
            latestId: 0
        },
        ctors: {
            init: function () {
                this.activeAgents = new (System.Collections.Generic.List$1(Pidroh.TextRendering.TextEntity)).ctor();
                this.freeBoards = new (System.Collections.Generic.List$1(Pidroh.TextRendering.TextEntity)).ctor();
                this.animations = new (System.Collections.Generic.List$1(Pidroh.TextRendering.TextAnimation)).ctor();
                this.latestId = -1;
            }
        },
        methods: {
            AddAnimation: function (T, ta) {
                this.animations.add(ta);
                ta.RegisterLists();
                return ta;
            },
            Init: function (width, height) {
                this.mainBoard = new Pidroh.TextRendering.TextBoard(width, height);

            },
            Draw: function () {
                this.mainBoard.Reset();
                this.DrawChildren();
            },
            DrawChildren: function () {
                var $t;
                for (var i = 0; i < this.activeAgents.Count; i = (i + 1) | 0) {
                    this.activeAgents.getItem(i).ResetAnimation();
                    $t = Bridge.getEnumerator(this.animations);
                    try {
                        while ($t.moveNext()) {
                            var anim = $t.Current;
                            anim.Modify$1(this.activeAgents.getItem(i));
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }if (this.activeAgents.getItem(i).freeIfIdle && !this.activeAgents.getItem(i).animating) {
                        this.freeBoards.add(this.activeAgents.getItem(i));
                        this.activeAgents.remove(this.activeAgents.getItem(i));
                        i = (i - 1) | 0;
                    } else {
                        this.mainBoard.Insert(this.activeAgents.getItem(i).animation);
                    }

                }
            },
            GetFreeEntity: function (w, h) {
                var te;
                if (this.freeBoards.Count > 0) {
                    te = this.freeBoards.getItem(((this.freeBoards.Count - 1) | 0));
                    this.freeBoards.removeAt(((this.freeBoards.Count - 1) | 0));
                } else {
                    te = new Pidroh.TextRendering.TextEntity();
                    te.id = ((this.latestId = (this.latestId + 1) | 0));

                }

                this.activeAgents.add(te);
                te.freeIfIdle = false;
                te.SetSize(w, h);
                te.ResetFull();
                return te;
            },
            GetTempEntity: function (w, h) {
                var te = this.GetFreeEntity(w, h);
                te.freeIfIdle = true;
                return te;
            },
            AdvanceTime: function (v) {
                var $t;
                $t = Bridge.getEnumerator(this.animations);
                try {
                    while ($t.moveNext()) {
                        var anim = $t.Current;
                        anim.Update(v);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }},
            IsDone: function () {
                var $t;
                $t = Bridge.getEnumerator(this.animations);
                try {
                    while ($t.moveNext()) {
                        var anim = $t.Current;
                        if (!anim.IsDone()) {
                            return false;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }return true;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.Vector2D", {
        inherits: function () { return [System.IEquatable$1(Pidroh.TextRendering.Vector2D)]; },
        $kind: "struct",
        statics: {
            fields: {
                zeroVector: null,
                unitVector: null,
                unitXVector: null,
                unitYVector: null
            },
            props: {
                Zero: {
                    get: function () {
                        return Pidroh.TextRendering.Vector2D.zeroVector.$clone();
                    }
                },
                One: {
                    get: function () {
                        return Pidroh.TextRendering.Vector2D.unitVector.$clone();
                    }
                },
                UnitX: {
                    get: function () {
                        return Pidroh.TextRendering.Vector2D.unitXVector.$clone();
                    }
                },
                UnitY: {
                    get: function () {
                        return Pidroh.TextRendering.Vector2D.unitYVector.$clone();
                    }
                }
            },
            ctors: {
                init: function () {
                    this.zeroVector = new Pidroh.TextRendering.Vector2D();
                    this.unitVector = new Pidroh.TextRendering.Vector2D();
                    this.unitXVector = new Pidroh.TextRendering.Vector2D();
                    this.unitYVector = new Pidroh.TextRendering.Vector2D();
                    this.zeroVector = new Pidroh.TextRendering.Vector2D.$ctor2(0.0, 0.0);
                    this.unitVector = new Pidroh.TextRendering.Vector2D.$ctor2(1.0, 1.0);
                    this.unitXVector = new Pidroh.TextRendering.Vector2D.$ctor2(1.0, 0.0);
                    this.unitYVector = new Pidroh.TextRendering.Vector2D.$ctor2(0.0, 1.0);
                }
            },
            methods: {
                InterpolateRounded: function (startPosition, endPosition, ratio) {
                    return (Pidroh.TextRendering.Vector2D.op_Addition(Pidroh.TextRendering.Vector2D.op_Multiply$1(startPosition.$clone(), (1 - ratio)), Pidroh.TextRendering.Vector2D.op_Multiply$1(endPosition.$clone(), ratio))).Round();
                },
                Add: function (value1, value2) {
                    value1.X += value2.X;
                    value1.Y += value2.Y;
                    return value1.$clone();
                },
                Add$1: function (value1, value2, result) {
                    result.v.X = value1.v.X + value2.v.X;
                    result.v.Y = value1.v.Y + value2.v.Y;
                },
                Distance: function (value1, value2) {
                    var v1 = value1.X - value2.X, v2 = value1.Y - value2.Y;
                    return Math.sqrt((v1 * v1) + (v2 * v2));
                },
                Distance$1: function (value1, value2, result) {
                    var v1 = value1.v.X - value2.v.X, v2 = value1.v.Y - value2.v.Y;
                    result.v = Math.sqrt((v1 * v1) + (v2 * v2));
                },
                DistanceSquared: function (value1, value2) {
                    var v1 = value1.X - value2.X, v2 = value1.Y - value2.Y;
                    return (v1 * v1) + (v2 * v2);
                },
                DistanceSquared$1: function (value1, value2, result) {
                    var v1 = value1.v.X - value2.v.X, v2 = value1.v.Y - value2.v.Y;
                    result.v = (v1 * v1) + (v2 * v2);
                },
                Divide: function (value1, value2) {
                    value1.X /= value2.X;
                    value1.Y /= value2.Y;
                    return value1.$clone();
                },
                Divide$2: function (value1, value2, result) {
                    result.v.X = value1.v.X / value2.v.X;
                    result.v.Y = value1.v.Y / value2.v.Y;
                },
                Divide$1: function (value1, divider) {
                    var factor = 1 / divider;
                    value1.X *= factor;
                    value1.Y *= factor;
                    return value1.$clone();
                },
                Divide$3: function (value1, divider, result) {
                    var factor = 1 / divider;
                    result.v.X = value1.v.X * factor;
                    result.v.Y = value1.v.Y * factor;
                },
                Dot: function (value1, value2) {
                    return (value1.X * value2.X) + (value1.Y * value2.Y);
                },
                Dot$1: function (value1, value2, result) {
                    result.v = (value1.v.X * value2.v.X) + (value1.v.Y * value2.v.Y);
                },
                Reflect: function (vector, normal) {
                    var result = new Pidroh.TextRendering.Vector2D();
                    var val = 2.0 * ((vector.X * normal.X) + (vector.Y * normal.Y));
                    result.X = vector.X - (normal.X * val);
                    result.Y = vector.Y - (normal.Y * val);
                    return result.$clone();
                },
                Reflect$1: function (vector, normal, result) {
                    var val = 2.0 * ((vector.v.X * normal.v.X) + (vector.v.Y * normal.v.Y));
                    result.v.X = vector.v.X - (normal.v.X * val);
                    result.v.Y = vector.v.Y - (normal.v.Y * val);
                },
                Max: function (value1, value2) {
                    return new Pidroh.TextRendering.Vector2D.$ctor2(value1.X > value2.X ? value1.X : value2.X, value1.Y > value2.Y ? value1.Y : value2.Y);
                },
                Max$1: function (value1, value2, result) {
                    result.v.X = value1.v.X > value2.v.X ? value1.v.X : value2.v.X;
                    result.v.Y = value1.v.Y > value2.v.Y ? value1.v.Y : value2.v.Y;
                },
                Min: function (value1, value2) {
                    return new Pidroh.TextRendering.Vector2D.$ctor2(value1.X < value2.X ? value1.X : value2.X, value1.Y < value2.Y ? value1.Y : value2.Y);
                },
                Min$1: function (value1, value2, result) {
                    result.v.X = value1.v.X < value2.v.X ? value1.v.X : value2.v.X;
                    result.v.Y = value1.v.Y < value2.v.Y ? value1.v.Y : value2.v.Y;
                },
                Multiply: function (value1, value2) {
                    value1.X *= value2.X;
                    value1.Y *= value2.Y;
                    return value1.$clone();
                },
                Multiply$1: function (value1, scaleFactor) {
                    value1.X *= scaleFactor;
                    value1.Y *= scaleFactor;
                    return value1.$clone();
                },
                Multiply$3: function (value1, scaleFactor, result) {
                    result.v.X = value1.v.X * scaleFactor;
                    result.v.Y = value1.v.Y * scaleFactor;
                },
                Multiply$2: function (value1, value2, result) {
                    result.v.X = value1.v.X * value2.v.X;
                    result.v.Y = value1.v.Y * value2.v.Y;
                },
                Negate: function (value) {
                    value.X = -value.X;
                    value.Y = -value.Y;
                    return value.$clone();
                },
                Negate$1: function (value, result) {
                    result.v.X = -value.v.X;
                    result.v.Y = -value.v.Y;
                },
                Normalize: function (value) {
                    var val = 1.0 / Math.sqrt((value.X * value.X) + (value.Y * value.Y));
                    value.X *= val;
                    value.Y *= val;
                    return value.$clone();
                },
                Normalize$1: function (value, result) {
                    var val = 1.0 / Math.sqrt((value.v.X * value.v.X) + (value.v.Y * value.v.Y));
                    result.v.X = value.v.X * val;
                    result.v.Y = value.v.Y * val;
                },
                Subtract: function (value1, value2) {
                    value1.X -= value2.X;
                    value1.Y -= value2.Y;
                    return value1.$clone();
                },
                Subtract$1: function (value1, value2, result) {
                    result.v.X = value1.v.X - value2.v.X;
                    result.v.Y = value1.v.Y - value2.v.Y;
                },
                op_UnaryNegation: function (value) {
                    value.X = -value.X;
                    value.Y = -value.Y;
                    return value.$clone();
                },
                op_Equality: function (value1, value2) {
                    return value1.X === value2.X && value1.Y === value2.Y;
                },
                op_Inequality: function (value1, value2) {
                    return value1.X !== value2.X || value1.Y !== value2.Y;
                },
                op_Addition: function (value1, value2) {
                    value1.X += value2.X;
                    value1.Y += value2.Y;
                    return value1.$clone();
                },
                op_Subtraction: function (value1, value2) {
                    value1.X -= value2.X;
                    value1.Y -= value2.Y;
                    return value1.$clone();
                },
                op_Multiply: function (value1, value2) {
                    value1.X *= value2.X;
                    value1.Y *= value2.Y;
                    return value1.$clone();
                },
                op_Multiply$1: function (value, scaleFactor) {
                    value.X *= scaleFactor;
                    value.Y *= scaleFactor;
                    return value.$clone();
                },
                op_Multiply$2: function (scaleFactor, value) {
                    value.X *= scaleFactor;
                    value.Y *= scaleFactor;
                    return value.$clone();
                },
                op_Division: function (value1, value2) {
                    value1.X /= value2.X;
                    value1.Y /= value2.Y;
                    return value1.$clone();
                },
                op_Division$1: function (value1, divider) {
                    var factor = 1 / divider;
                    value1.X *= factor;
                    value1.Y *= factor;
                    return value1.$clone();
                },
                getDefaultValue: function () { return new Pidroh.TextRendering.Vector2D(); }
            }
        },
        fields: {
            X: 0,
            Y: 0
        },
        alias: ["equalsT", "System$IEquatable$1$Pidroh$TextRendering$Vector2D$equalsT"],
        ctors: {
            $ctor2: function (x, y) {
                this.$initialize();
                this.X = x;
                this.Y = y;
            },
            $ctor1: function (value) {
                this.$initialize();
                this.X = value;
                this.Y = value;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            Round: function () {
                return new Pidroh.TextRendering.Vector2D.$ctor2(Bridge.Math.round(this.X, 0, 6), Bridge.Math.round(this.Y, 0, 6));
            },
            equals: function (obj) {
                if (Bridge.is(obj, Pidroh.TextRendering.Vector2D)) {
                    return this.equalsT(this);
                }

                return false;
            },
            equalsT: function (other) {
                return (this.X === other.X) && (this.Y === other.Y);
            },
            getHashCode: function () {
                return ((System.Single.getHashCode(this.X) + System.Single.getHashCode(this.Y)) | 0);
            },
            Length: function () {
                return Math.sqrt((this.X * this.X) + (this.Y * this.Y));
            },
            LengthSquared: function () {
                return (this.X * this.X) + (this.Y * this.Y);
            },
            Normalize: function () {
                var val = 1.0 / Math.sqrt((this.X * this.X) + (this.Y * this.Y));
                this.X *= val;
                this.Y *= val;
            },
            toString: function () {
                var currentCulture = System.Globalization.CultureInfo.getCurrentCulture();
                return System.String.formatProvider.apply(System.String, [currentCulture, "{{X:{0} Y:{1}}}"].concat(System.Array.init([System.Single.format(this.X, "G", currentCulture), System.Single.format(this.Y, "G", currentCulture)], System.Object)));
            },
            $clone: function (to) {
                var s = to || new Pidroh.TextRendering.Vector2D();
                s.X = this.X;
                s.Y = this.Y;
                return s;
            }
        }
    });

    Bridge.define("Pidroh.TurnBased.TextRendering.ScreenUtils");

    Bridge.define("Pidroh.ConsoleApp.Turnbased.AsyncTaskSetter$1", function (T) { return {
        inherits: [Pidroh.ConsoleApp.Turnbased.DelayedActions],
        fields: {
            ToValue: null,
            setters: null
        },
        ctors: {
            init: function () {
                this.ToValue = new (System.Collections.Generic.List$1(T)).ctor();
                this.setters = new (System.Collections.Generic.List$1(Function)).ctor();
            }
        },
        methods: {
            Add$1: function (e, setter, time) {
                this.ToValue.add(e);
                this.setters.add(setter);
                this.Add(time);
            },
            Execute: function (i) {
                this.setters.getItem(i)(this.ToValue.getItem(i));
                this.ToValue.removeAt(i);
                this.setters.removeAt(i);

            }
        }
    }; });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.BattleRender", {
        inherits: [Pidroh.ConsoleApp.Turnbased.ITextScreen],
        statics: {
            methods: {
                ElementToAuraColor: function (element) {
                    var bc = Pidroh.TextRendering.TextBoard.INVISIBLECOLOR;
                    if (element === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.Element.Fire) {
                        bc = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.FireAura;
                    }
                    if (element === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.Element.Ice) {
                        bc = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.IceAura;
                    }
                    if (element === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.Element.Thunder) {
                        bc = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.ThunderAura;
                    }

                    return bc;
                },
                ElementToProjColor: function (element) {
                    var bc = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.inputKey;
                    if (element === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.Element.Fire) {
                        bc = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.FireShot;
                    }
                    if (element === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.Element.Ice) {
                        bc = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.IceAura;
                    }
                    if (element === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.Element.Thunder) {
                        bc = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.ThunderAura;
                    }

                    return bc;
                }
            }
        },
        fields: {
            turnBaseTry: null,
            posAnim: null,
            textWorld: null,
            TextBoard: null,
            input: 0,
            moveChars: null,
            moveDescriptions: null,
            miscDescriptions: null,
            moveButtons: null,
            moveKeys: null,
            debugOn: false,
            gridScale: 0,
            gridOffsetx: 0,
            gridOffsety: 0,
            battlerEntities: null,
            entitiesChars: null
        },
        props: {
            Input: {
                get: function () {
                    return this.input;
                },
                set: function (value) {
                    this.input = value; //Console.WriteLine(value);
                }
            }
        },
        alias: [
            "Input", "Pidroh$ConsoleApp$Turnbased$ITextScreen$Input",
            "Draw", "Pidroh$ConsoleApp$Turnbased$ITextScreen$Draw",
            "GetBoard", "Pidroh$ConsoleApp$Turnbased$ITextScreen$GetBoard"
        ],
        ctors: {
            init: function () {
                this.moveDescriptions = new (System.Collections.Generic.Dictionary$2(System.Object,System.String))();
                this.miscDescriptions = function (_o1) {
                        _o1.add(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Done, "Done");
                        _o1.add(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Redo, "Redo");
                        return _o1;
                    }(new (System.Collections.Generic.Dictionary$2(Pidroh.ConsoleApp.Turnbased.MiscBattleInput,System.String))());
                this.debugOn = true;
            },
            ctor: function (battleLogic) {
                var $t;
                this.$initialize();

                var entityTexts = System.Array.init([
                    "@", 
                    "&", 
                    "%", 
                    "$", 
                    "X2", 
                    "X3"
                ], System.String);
                this.entitiesChars = System.Array.init(entityTexts.length, null, System.Array.type(System.Char));
                for (var i = 0; i < entityTexts.length; i = (i + 1) | 0) {
                    this.entitiesChars[System.Array.index(i, this.entitiesChars)] = ($t = entityTexts[System.Array.index(i, entityTexts)], System.String.toCharArray($t, 0, $t.length));
                }

                this.turnBaseTry = battleLogic;

                this.textWorld = new Pidroh.TextRendering.TextWorld();
                this.posAnim = this.textWorld.AddAnimation(Bridge.global.Pidroh.TextRendering.PositionAnimation, new Pidroh.TextRendering.PositionAnimation());
                this.textWorld.Init(70, 25);
                this.TextBoard = this.textWorld.mainBoard;
                //TextBoard = new TextBoard(70, 25);

                //var posAnim = textWorld.AddAnimation(new PositionAnimation());
                var blinkAnim = this.textWorld.AddAnimation(Bridge.global.Pidroh.TextRendering.BlinkAnim, new Pidroh.TextRendering.BlinkAnim());

                this.battlerEntities = System.Array.init(this.turnBaseTry.entities.Count, null, Pidroh.TextRendering.TextEntity);
                for (var i1 = 0; i1 < this.battlerEntities.length; i1 = (i1 + 1) | 0) {
                    this.battlerEntities[System.Array.index(i1, this.battlerEntities)] = this.textWorld.GetFreeEntity(2, 2);
                }

                this.turnBaseTry.happManager.AddHandler(new Pidroh.ConsoleApp.Turnbased.Happs.HappHandler(Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.HappTag.AttackHit, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.HappTag, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.HappTag)), Bridge.fn.bind(this, function (h) {
                    var attacker = this.turnBaseTry.entities.getItem(h.GetAttribute_Int(1));
                    var defender = this.turnBaseTry.entities.getItem(h.GetAttribute_Int(0));
                    var element = h.GetAttribute_Int(2);
                    var fe = this.GetProjTextEntity(element);

                    var pos = attacker.PositionV2D.$clone();
                    var pos2 = defender.PositionV2D.$clone();
                    var xDis = Math.abs(pos.X - pos2.X);
                    var time = xDis * 0.1;

                    this.posAnim.Add$1(fe.AnimBase(time), new Pidroh.TextRendering.PositionAnimation.PositionData.$ctor1(this.BattleEntityToScreenPosition(attacker.PositionV2D.$clone()), this.BattleEntityToScreenPosition(defender.PositionV2D.$clone())));
                })));

                this.turnBaseTry.happManager.AddHandler(new Pidroh.ConsoleApp.Turnbased.Happs.HappHandler(Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.HappTag.DamageTaken, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.HappTag, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.HappTag)), Bridge.fn.bind(this, function (h) {
                    var defender = this.turnBaseTry.entities.getItem(h.GetAttribute_Int(0));
                    var fe = this.textWorld.GetTempEntity(1, 1);
                    fe.origin.DrawChar(Pidroh.TextRendering.TextBoard.NOCHANGECHAR, 0, 0);
                    fe.origin.Position = this.BattleEntityToScreenPosition(defender.PositionV2D.$clone());
                    blinkAnim.Add$1(fe.AnimBase(0.5), Pidroh.TextRendering.BlinkAnim.BlinkData.Char(32, 0.1));
                })));

                this.turnBaseTry.happManager.AddHandler(new Pidroh.ConsoleApp.Turnbased.Happs.HappHandler(Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.HappTag.AttackMiss, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.HappTag, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.HappTag)), Bridge.fn.bind(this, function (h) {

                    var attacker = this.turnBaseTry.entities.getItem(h.GetAttribute_Int(0));
                    var element = h.GetAttribute_Int(1);
                    var fe = this.GetProjTextEntity(element);
                    var pos = attacker.PositionV2D.$clone();
                    var pos2 = pos.$clone();
                    if (attacker.Type === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.EntityType.enemy) {
                        pos2.X = -1;
                    } else {
                        pos2.X = 6;
                    }
                    var xDis = Math.abs(pos.X - pos2.X);
                    var time = xDis * 0.1;
                    this.posAnim.Add$1(fe.AnimBase(time), new Pidroh.TextRendering.PositionAnimation.PositionData.$ctor1(this.BattleEntityToScreenPosition(pos.$clone()), this.BattleEntityToScreenPosition(pos2.$clone())));
                })));

                this.turnBaseTry.happManager.AddHandler(new Pidroh.ConsoleApp.Turnbased.Happs.HappHandler(Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.HappTag.MovementFail, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.HappTag, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.HappTag)), Bridge.fn.bind(this, function (h) {
                    var eId = h.GetAttribute_Int(0);
                    var mover = this.turnBaseTry.entities.getItem(eId);
                    var x = h.GetAttribute_Int(1);
                    var y = h.GetAttribute_Int(2);
                    var pos = mover.PositionV2D.$clone();
                    var pos2 = new Pidroh.TextRendering.Vector2D.$ctor2(x, y);
                    var posF = Pidroh.TextRendering.Vector2D.op_Division$1((Pidroh.TextRendering.Vector2D.op_Addition(pos.$clone(), pos2.$clone())), 2);

                    var fe = this.battlerEntities[System.Array.index(eId, this.battlerEntities)];
                    //Console.WriteLine("Move fail");
                    this.posAnim.Add$1(fe.AnimBase(0.2), new Pidroh.TextRendering.PositionAnimation.PositionData.$ctor1(this.BattleEntityToScreenPosition(mover.PositionV2D.$clone()), this.BattleEntityToScreenPosition(posF.$clone())));
                })));

                this.moveChars = function (_o2) {
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.Fire, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType)), "F");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.Ice, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType)), "I");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.Thunder, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType)), "T");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.NormalShot, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType)), "G");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType)), ">");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType)), "^");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType)), "v");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType)), "<");
                        _o2.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.DoNothing, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType)), " ");
                        return _o2;
                    }(new (System.Collections.Generic.Dictionary$2(System.Object,System.String))());

                this.moveDescriptions = function (_o3) {
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.Ice, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType)), "Ice Shot");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.Fire, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType)), "Fire Shot");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.Thunder, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType)), "Thunder Shot");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.NormalShot, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType)), "Gun");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType)), ">");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType)), "^");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType)), "v");
                        _o3.add(Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType)), "<");
                        return _o3;
                    }(new (System.Collections.Generic.Dictionary$2(System.Object,System.String))());

                this.moveButtons = function (_o4) {
                        _o4.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.NormalShot, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType))), "g");
                        _o4.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.Fire, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType))), "f");
                        _o4.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.Ice, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType))), "i");
                        _o4.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.Thunder, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType))), "t");
                        _o4.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType))), "d");
                        _o4.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType))), "w");
                        _o4.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType))), "s");
                        _o4.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType))), "a");
                        _o4.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Bridge.box(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Done, Pidroh.ConsoleApp.Turnbased.MiscBattleInput, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MiscBattleInput))), "Space");
                        _o4.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Bridge.box(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Redo, Pidroh.ConsoleApp.Turnbased.MiscBattleInput, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MiscBattleInput))), "r");
                        return _o4;
                    }(new (System.Collections.Generic.Dictionary$2(Pidroh.ConsoleApp.Turnbased.Input,System.String))());

                this.moveKeys = function (_o5) {
                        _o5.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.Thunder, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType))), Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.THUNDER);
                        _o5.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.Ice, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType))), Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.ICE);
                        _o5.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.Fire, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType))), Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.FIRE);
                        _o5.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.NormalShot, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType))), Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.NORMALSHOT);
                        _o5.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveRight, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType))), Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.RIGHT);
                        _o5.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveUp, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType))), Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.UP);
                        _o5.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveDown, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType))), Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.DOWN);
                        _o5.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.Move, Bridge.box(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType.MoveLeft, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType))), Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.LEFT);
                        _o5.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Bridge.box(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Done, Pidroh.ConsoleApp.Turnbased.MiscBattleInput, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MiscBattleInput))), Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.DONE);
                        _o5.add(new Pidroh.ConsoleApp.Turnbased.Input.$ctor1(Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle, Bridge.box(Pidroh.ConsoleApp.Turnbased.MiscBattleInput.Redo, Pidroh.ConsoleApp.Turnbased.MiscBattleInput, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.MiscBattleInput))), Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.REDO);
                        return _o5;
                    }(new (System.Collections.Generic.Dictionary$2(Pidroh.ConsoleApp.Turnbased.Input,Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey))());

                //Console.ReadLine();
            }
        },
        methods: {
            GetProjTextEntity: function (element) {
                var fe = this.textWorld.GetTempEntity(1, 1);
                fe.origin.DrawChar(Pidroh.TextRendering.TextBoard.INVISIBLECHAR, 0, 0);
                var elementColor = Pidroh.ConsoleApp.Turnbased.BattleRender.ElementToProjColor(element);
                fe.origin.SetBackColor(elementColor, 0, 0);
                return fe;
            },
            Draw: function (delta) {
                var $t;

                var input = this.Input;
                //if (input != InputKey.NONE) Console.WriteLine(input);
                //int inputNumber = input - '0';
                //if (debugOn && input == 'k')
                //{
                //    DebugExtra.DebugEx.Show();
                //}
                if (this.textWorld.IsDone()) {
                    switch (this.turnBaseTry.battleState.phase) {
                        case Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattlePhase.EnemyMoveChoice: 
                            this.turnBaseTry.Tick();
                            break;
                        case Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattlePhase.HandRecharge: 
                            this.turnBaseTry.Tick();
                            break;
                        case Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattlePhase.PickHands: 
                            $t = Bridge.getEnumerator(this.moveKeys);
                            try {
                                while ($t.moveNext()) {
                                    var item = $t.Current;
                                    if (item.value === input) {

                                        this.turnBaseTry.InputDone(item.key);
                                    }
                                }
                            } finally {
                                if (Bridge.is($t, System.IDisposable)) {
                                    $t.System$IDisposable$dispose();
                                }
                            }break;
                        case Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattlePhase.ExecuteMove: 
                            //System.Threading.Thread.Sleep(300);
                            this.turnBaseTry.Tick();
                            break;
                        default: 
                            break;
                    }
                }

                this.DrawGraphics(delta);

            },
            DrawGraphics: function (delta) {
                this.turnBaseTry.Update(delta);
                //clear grid
                this.TextBoard.Reset();

                this.gridScale = 4;
                this.gridOffsetx = 2;
                this.gridOffsety = 1;
                var enemyGridOffX = Bridge.Int.mul(this.gridScale, 3);
                var drawDot = false;
                for (var i = 0; i < Bridge.Int.mul(3, this.gridScale); i = (i + 1) | 0) {
                    for (var j = 0; j < Bridge.Int.mul(3, this.gridScale); j = (j + 1) | 0) {
                        if (drawDot) {
                            this.TextBoard.DrawChar$1(46, ((this.gridOffsetx + i) | 0), ((this.gridOffsety + j) | 0), Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero);
                            this.TextBoard.DrawChar$1(46, ((((this.gridOffsetx + i) | 0) + enemyGridOffX) | 0), ((this.gridOffsety + j) | 0), Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridEnemy);
                        }
                        if (i % this.gridScale === 0 && j % this.gridScale === 0) {

                            this.TextBoard.DrawGrid(((((i + this.gridOffsetx) | 0) + enemyGridOffX) | 0), ((j + this.gridOffsety) | 0), ((this.gridScale + 1) | 0), ((this.gridScale + 1) | 0), Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridEnemy);
                            this.TextBoard.DrawGrid(((i + this.gridOffsetx) | 0), ((j + this.gridOffsety) | 0), ((this.gridScale + 1) | 0), ((this.gridScale + 1) | 0), Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero);
                        }
                    }
                }
                //for (int i = 0; i < 6; i++)
                //{
                //    for (int j = 0; j < 3; j++)
                //    {
                //        TextBoard.DrawChar(
                //            ' ',
                //            i * scale + scale / 2,
                //            2 * scale - j * scale + scale / 2);
                //    }
                //}
                // DrawMove entity
                for (var i1 = 0; i1 < this.turnBaseTry.entities.Count; i1 = (i1 + 1) | 0) {

                    var gameEntity = this.turnBaseTry.entities.getItem(i1);

                    var ec = this.GetChar(gameEntity);
                    if (gameEntity.Dead) {
                        for (var j1 = 0; j1 < ec.length; j1 = (j1 + 1) | 0) {
                            ec[System.Array.index(j1, ec)] = Pidroh.TextRendering.TextBoard.INVISIBLECHAR;
                        }
                    }
                    var pos = gameEntity.PositionV2D.$clone();
                    var screenPos = this.BattleEntityToScreenPosition(pos.$clone());
                    if (gameEntity.Type === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.EntityType.paneleffect) {
                        screenPos.Y = screenPos.Y + 1;
                        screenPos.X = screenPos.X - 1;
                    }
                    //battlerEntities[i].origin.Position = screenPos;
                    if (Pidroh.TextRendering.Vector2D.op_Inequality(this.battlerEntities[System.Array.index(i1, this.battlerEntities)].origin.Position.$clone(), screenPos.$clone()) && this.textWorld.IsDone()) {
                        this.posAnim.Add$1(this.battlerEntities[System.Array.index(i1, this.battlerEntities)].AnimBase(0.15), new Pidroh.TextRendering.PositionAnimation.PositionData.$ctor1(this.battlerEntities[System.Array.index(i1, this.battlerEntities)].origin.Position.$clone(), screenPos.$clone(), true));
                    }

                    var c = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Hero;
                    if (gameEntity.Type === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.EntityType.enemy) {
                        c = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Enemy;
                    }
                    if (gameEntity.Type === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.EntityType.pickup) {
                        c = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.inputKey;
                    }
                    if (gameEntity.Dead) {
                        c = Pidroh.TextRendering.TextBoard.INVISIBLECOLOR;
                    }
                    var bc = Pidroh.TextRendering.TextBoard.INVISIBLECOLOR;

                    if (gameEntity.Alive) {
                        var element = gameEntity.element;
                        bc = Pidroh.ConsoleApp.Turnbased.BattleRender.ElementToAuraColor(element);

                    }
                    this.battlerEntities[System.Array.index(i1, this.battlerEntities)].origin.Draw(ec, 0, 0, c, bc);

                    //battlerEntities[i].origin.SetColor(c, 0, 0);



                    //TextBoard.DrawChar(
                    //    ec,
                    //    x1,
                    //    y1);
                }


                var textBoardHeight = Bridge.Int.mul(3, this.gridScale);

                {
                    var y = 2;
                    var x = (Bridge.Int.mul(6, this.gridScale) + 26) | 0;

                    if (this.turnBaseTry.battleState.phase === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattlePhase.PickHands) {
                        this.DrawControls(y, x);
                        if (this.turnBaseTry.timeToChoose > 0) {
                            var ratio = this.turnBaseTry.timeToChoose / this.turnBaseTry.timeToChooseMax;
                            this.TextBoard.DrawRepeated(32, x, ((y + 16) | 0), Bridge.Int.clip32(ratio * 15), 1, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Board, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero);
                        }
                    } else {
                        this.TextBoard.DrawRepeated(32, ((x - 1) | 0), ((y - 1) | 0), 15, 15, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Board);
                    }
                }

                var turnOrderX = (Bridge.Int.mul(6, this.gridScale) + 10) | 0;
                var turnOrderY = 2;

                this.DrawTurnOrder(turnOrderX, turnOrderY);
                this.DrawLife(3, 16);


                this.TextBoard.CursorNewLine(1);
                this.TextBoard.CursorNewLine(1);
                //textBoard.Draw_Cursor(turnBaseTry.battleState.phase.ToString());

                this.textWorld.DrawChildren();
                this.textWorld.AdvanceTime(delta);
                if (this.textWorld.IsDone()) {
                    this.turnBaseTry.happManager.TryHandle();
                }
            },
            BattleEntityToScreenPosition: function (pos) {
                var x = pos.X;
                var y = pos.Y;
                var screenPos = new Pidroh.TextRendering.Vector2D.$ctor2(x * this.gridScale + ((Bridge.Int.div(this.gridScale, 2)) | 0) + this.gridOffsetx, Bridge.Int.mul(2, this.gridScale) - y * this.gridScale + ((Bridge.Int.div(this.gridScale, 2)) | 0) + this.gridOffsety);
                return screenPos.$clone();
            },
            DrawControls: function (y, x) {
                this.TextBoard.DrawGrid(((x - 2) | 0), ((y - 1) | 0), 20, 15, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Board);
                this.TextBoard.SetCursorAt(x, y);
                this.TextBoard.Draw_Cursor$3("Controls", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel);

                for (var i = 0; i < this.turnBaseTry.inputs.Count; i = (i + 1) | 0) {
                    var x2 = (x + 1) | 0;
                    var y2 = (((y + 2) | 0) + i) | 0;
                    var input = this.turnBaseTry.inputs.getItem(i);
                    var buttonName = { };
                    if (this.moveButtons.tryGetValue(input, buttonName)) {
                    } else {
                        buttonName.v = "UN";
                    }

                    var lengthBname = buttonName.v.length;

                    this.TextBoard.DrawChar$1(91, ((x2 - 1) | 0), y2, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.HeroTurn);
                    this.TextBoard.DrawChar$1(93, ((x2 + lengthBname) | 0), y2, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.HeroTurn);

                    //TurnBaseTryValues.MoveType move = turnBaseTry.playerHand[i];

                    this.TextBoard.Draw$1(buttonName.v, x2, y2, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.inputKey);
                    var description = { v : "" };
                    if (input.type === Pidroh.ConsoleApp.Turnbased.InputType.Move) {
                        var m = input.arg1;
                        this.moveDescriptions.tryGetValue(Bridge.box(m, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType)), description);
                        if (description.v == null) {
                            description.v = System.Enum.toString(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, m);
                        }

                    }
                    if (input.type === Pidroh.ConsoleApp.Turnbased.InputType.MiscBattle) {
                        var arg1 = input.arg1;
                        description.v = this.miscDescriptions.get(arg1);
                    }
                    this.TextBoard.Draw$1(description.v, ((((x2 + 2) | 0) + lengthBname) | 0), y2, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.HeroTurn);
                    //var c = moveChars[move];
                    //DrawMove(move, Colors.HeroTurn);
                    //TextBoard.Draw(c, x2 + 3, y2, Colors.HeroTurn);
                    //TextBoard.DrawWithGrid(c+"", x2, y + 2, Colors.HeroTurn);
                }
            },
            DrawLife: function (turnOrderX, turnOrderY) {
                this.TextBoard.DrawGrid(((turnOrderX - 1) | 0), ((turnOrderY - 1) | 0), 20, 9, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel);
                this.TextBoard.SetCursorAt(((turnOrderX + 1) | 0), turnOrderY);
                this.TextBoard.Draw_Cursor$3("Life", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel);
                this.TextBoard.SetCursorAt(((turnOrderX + 8) | 0), turnOrderY);
                this.TextBoard.Draw_Cursor$3("Element", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel);
                var index = -1; //using this because not all units get drawn
                for (var i = 0; i < this.turnBaseTry.entities.Count; i = (i + 1) | 0) {
                    index = (index + 1) | 0;
                    var e = this.turnBaseTry.entities.getItem(index);
                    if (!e.drawLife) {
                        index = (index - 1) | 0;
                        continue;
                    }
                    if (!e.Dead) {
                        var color = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.HeroTurn;
                        if (e.Type === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.EntityType.enemy) {
                            color = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.EnemyTurn;
                        }
                        //TextBoard.DrawOneDigit_Cursor((int)e.life.Val);
                        var xOff = (turnOrderX + 1) | 0;
                        var yOff = (((turnOrderY + 2) | 0) + index) | 0;
                        this.TextBoard.Draw(this.GetChar(e), xOff, yOff, color);
                        //TextBoard.DrawChar(GetChar(e), xOff, turnOrderY + 2, color);
                        this.TextBoard.DrawOneDigit(Bridge.Int.clip32(e.life.Val), ((xOff + 3) | 0), yOff, color);
                        var element = "";
                        switch (e.element) {
                            case Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.Element.Fire: 
                                element = "Fire";
                                break;
                            case Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.Element.Ice: 
                                element = "Ice";
                                break;
                            case Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.Element.Thunder: 
                                element = "Thunder";
                                break;
                            case Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.Element.None: 
                                break;
                            default: 
                                break;
                        }
                        var eColor = Pidroh.ConsoleApp.Turnbased.BattleRender.ElementToAuraColor(e.element);

                        this.TextBoard.Draw$1(element, ((xOff + 7) | 0), yOff, eColor);
                    }

                    //TextBoard.DrawOneDigit_Cursor((int)e.life.Val);

                    //TextBoard.CursorNewLine(x: 1);
                }
            },
            DrawTurnOrder: function (turnOrderX, turnOrderY) {
                var turnsPerPhase = this.turnBaseTry.battleState.turnsPerPhase;
                this.TextBoard.DrawGrid(((turnOrderX - 1) | 0), ((turnOrderY - 1) | 0), 14, ((6 + Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(turnsPerPhase)) | 0), Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Board);
                this.TextBoard.SetCursorAt(turnOrderX, turnOrderY);
                this.TextBoard.Draw_Cursor$3("Turn Order", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.WindowLabel);

                for (var i = 0; i < this.turnBaseTry.entities.Count; i = (i + 1) | 0) {
                    var e = this.turnBaseTry.entities.getItem(i);
                    if (!e.drawTurn) {
                        continue;
                    }
                    if (!e.Dead) {
                        var color = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.HeroTurn;
                        if (e.Type === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.EntityType.enemy) {
                            color = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.EnemyTurn;
                        }

                        //TextBoard.DrawOneDigit_Cursor((int)e.life.Val);
                        var xOff = (((turnOrderX + 1) | 0) + Bridge.Int.mul(i, 3)) | 0;
                        this.TextBoard.Draw(this.GetChar(e), xOff, ((turnOrderY + 2) | 0), color);
                        this.TextBoard.SetCursorAt(xOff, ((turnOrderY + 3) | 0));

                        for (var i2 = 0; i2 < Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(turnsPerPhase); i2 = (i2 + 1) | 0) {
                            var color2 = color;
                            if (i === this.turnBaseTry.battleState.actingEntity && i2 === Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(this.turnBaseTry.battleState.turn) && this.turnBaseTry.battleState.phase === Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.BattlePhase.ExecuteMove) {
                                color2 = Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Hero;
                            }

                            if (i2 < Pidroh.ConsoleApp.Turnbased.Value.op_Implicit(turnsPerPhase) && Pidroh.ConsoleApp.Turnbased.Value.op_Inequality(e.moves[System.Array.index(i2, e.moves)], null)) {
                                var c = this.GetCharOfMove(e, i2);
                                this.TextBoard.Draw_Cursor$3(c, color2);

                                //TextBoard.Draw_Cursor(' ');
                            } else {
                                this.TextBoard.Draw_Cursor$1(32, color);
                            }
                            this.TextBoard.CursorNewLine(xOff);
                        }
                    }


                    //TextBoard.CursorNewLine(x: 1);
                }
            },
            GetCharOfMove: function (e, i2) {


                var val = e.moves[System.Array.index(i2, e.moves)].Val;
                if (val >= 0) {
                    return this.moveChars.get(Bridge.box(Bridge.Int.clip32(val), Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType)));
                } else {
                    return " ";
                }
            },
            GetChar: function (gameEntity) {
                return this.entitiesChars[System.Array.index(gameEntity.graphic, this.entitiesChars)];
                //char ec = '@';
                //if (gameEntity.Type == TurnBaseTryValues.EntityType.enemy)
                //{
                //    if(gameEntity.graphic == 1)
                //        ec = '&';
                //    if (gameEntity.graphic == 2)
                //        ec = '%';
                //    if (gameEntity.graphic == 3)
                //        ec = '$';
                //}

                //return ec;
            },
            DrawMove$1: function (move, color) {
                if (move.Val >= 0) {
                    var m = Bridge.Int.clip32(move.Val);
                    this.DrawMove(m, color);
                } else {
                    this.TextBoard.Draw_Cursor(32);
                }

            },
            DrawMove: function (move, color) {
                var c = this.moveChars.get(Bridge.box(move, Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType, System.Enum.toStringFn(Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues.MoveType)));
                this.TextBoard.Draw_Cursor$3(c, color);
            },
            GetBoard: function () {
                return this.TextBoard;
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.GameMain", {
        inherits: [Pidroh.ConsoleApp.Turnbased.ITextScreen],
        fields: {
            battleLogic: null,
            battleRender: null,
            modeSelectionScreen: null,
            mainDraw: null,
            resultScreen: null,
            difficulty: 0,
            enemyAmount: null,
            turnAmount: null
        },
        props: {
            Input: {
                get: function () {
                    return 99;
                },
                set: function (value) {
                    this.mainDraw.Pidroh$ConsoleApp$Turnbased$ITextScreen$Input = value;
                }
            }
        },
        alias: [
            "Input", "Pidroh$ConsoleApp$Turnbased$ITextScreen$Input",
            "Draw", "Pidroh$ConsoleApp$Turnbased$ITextScreen$Draw",
            "GetBoard", "Pidroh$ConsoleApp$Turnbased$ITextScreen$GetBoard"
        ],
        ctors: {
            init: function () {
                this.enemyAmount = System.Array.init([1, 1, 2, 1, 2, 3, 2, 3, 1, 2, 3, 3], System.Int32);
                this.turnAmount = System.Array.init([2, 4, 2, 6, 4, 2, 6, 4, 8, 8, 6, 8], System.Int32);
            },
            ctor: function () {
                this.$initialize();
                this.modeSelectionScreen = new Pidroh.TurnBased.TextRendering.ModeSelectionScreen();
                this.Reset();
                this.mainDraw = this.modeSelectionScreen;
                //Reset();
            }
        },
        methods: {
            Reset: function () {
                var mode = this.modeSelectionScreen.mode;
                var timeAttack = this.modeSelectionScreen.timeAttack;

                this.battleLogic = new Pidroh.ConsoleApp.Turnbased.TurnBaseTryValues(mode);
                var d = this.difficulty;
                //d = 200;
                if (d >= this.enemyAmount.length) {
                    d = (this.enemyAmount.length - 1) | 0;
                }

                var nEnemies = this.enemyAmount[System.Array.index(d, this.enemyAmount)];
                this.battleLogic.BasicConfig(new Pidroh.ConsoleApp.Turnbased.BattleBasicConfig.$ctor1(nEnemies, this.turnAmount[System.Array.index(d, this.turnAmount)]));
                var timeToChoose = -1;
                if (timeAttack) {
                    timeToChoose = (5.0 * this.turnAmount[System.Array.index(d, this.turnAmount)]) * nEnemies;
                }
                this.battleLogic.timeToChooseMax = timeToChoose;
                this.battleLogic.Init();
                this.battleRender = new Pidroh.ConsoleApp.Turnbased.BattleRender(this.battleLogic);
                this.mainDraw = this.battleRender;
                this.resultScreen = new Pidroh.ConsoleApp.Turnbased.ResultScreen();
                this.resultScreen.battleResult = this.battleLogic.battleResult;

            },
            Draw: function (f) {
                this.mainDraw.Pidroh$ConsoleApp$Turnbased$ITextScreen$Draw(f);
                if (Bridge.referenceEquals(this.mainDraw, this.battleRender)) {
                    if (this.battleLogic.IsOver()) {
                        if (this.battleLogic.IsVictory()) {
                            this.difficulty = (this.difficulty + 1) | 0;
                        }
                        this.resultScreen.Enter();
                        this.mainDraw = this.resultScreen;
                    }
                }
                if (Bridge.referenceEquals(this.mainDraw, this.resultScreen)) {
                    if (this.resultScreen.wannaLeave === 1) {
                        this.Reset();
                    }
                }
                if (Bridge.referenceEquals(this.mainDraw, this.modeSelectionScreen)) {
                    if (this.modeSelectionScreen.wannaLeave === 1) {
                        this.Reset();
                    }
                }

            },
            GetBoard: function () {
                return this.mainDraw.Pidroh$ConsoleApp$Turnbased$ITextScreen$GetBoard();
            }
        }
    });

    Bridge.define("Pidroh.ConsoleApp.Turnbased.ResultScreen", {
        inherits: [Pidroh.ConsoleApp.Turnbased.ITextScreen],
        fields: {
            textWorld: null,
            youWin: null,
            youLose: null,
            battleResult: null,
            wannaLeave: 0,
            Input: 0
        },
        alias: [
            "Input", "Pidroh$ConsoleApp$Turnbased$ITextScreen$Input",
            "Draw", "Pidroh$ConsoleApp$Turnbased$ITextScreen$Draw",
            "GetBoard", "Pidroh$ConsoleApp$Turnbased$ITextScreen$GetBoard"
        ],
        ctors: {
            init: function () {
                this.youWin = "You Win";
                this.youLose = "You lose";
            },
            ctor: function () {
                this.$initialize();
                this.textWorld = new Pidroh.TextRendering.TextWorld();
                this.textWorld.Init(70, 25);
            }
        },
        methods: {
            Enter: function () {
                this.wannaLeave = 0;
            },
            Draw: function (f) {
                if (this.Input > 0) {
                    this.wannaLeave = 1;
                }
                var message = this.youWin;
                if (this.battleResult.result === 2) {
                    message = this.youLose;
                }
                this.textWorld.mainBoard.DrawOnCenter(message, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.Board);
            },
            GetBoard: function () {
                return this.textWorld.mainBoard;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.TextAnimation$1", function (T) { return {
        inherits: [Pidroh.TextRendering.TextAnimation],
        fields: {
            mainData: null
        },
        ctors: {
            init: function () {
                this.mainData = new (System.Collections.Generic.List$1(T)).ctor();
            }
        },
        methods: {
            RequestRegisterLists: function () {
                this.RegisterList(this.mainData);
            },
            Add$1: function (baseData, mainD) {
                this.Add(baseData);
                this.mainData.add(mainD);
            },
            Modify: function (entity, index, progress, length) {
                this.Modify$2(entity, this.mainData.getItem(index), progress, length);
            },
            Modify$2: function (entity, mainData, progress, length) { }
        }
    }; });

    Bridge.define("Pidroh.TurnBased.TextRendering.ModeSelectionScreen", {
        inherits: [Pidroh.ConsoleApp.Turnbased.ITextScreen],
        fields: {
            textWorld: null,
            youWin: null,
            youLose: null,
            selection: 0,
            battleResult: null,
            wannaLeave: 0,
            mode: 0,
            timeAttack: false,
            screenStage: 0,
            Input: 0
        },
        alias: [
            "Input", "Pidroh$ConsoleApp$Turnbased$ITextScreen$Input",
            "Draw", "Pidroh$ConsoleApp$Turnbased$ITextScreen$Draw",
            "GetBoard", "Pidroh$ConsoleApp$Turnbased$ITextScreen$GetBoard"
        ],
        ctors: {
            init: function () {
                this.youWin = "You Win";
                this.youLose = "You lose";
                this.timeAttack = false;
            },
            ctor: function () {
                this.$initialize();
                this.textWorld = new Pidroh.TextRendering.TextWorld();
                this.textWorld.Init(70, 25);
            }
        },
        methods: {
            Enter: function () {
                this.wannaLeave = 0;
            },
            Draw: function (f) {
                this.textWorld.mainBoard.Reset();
                var ik = this.Input;
                this.mode = -1;
                this.textWorld.mainBoard.Draw$1("ProgBattle Prototype v0.2", 1, 1, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero);
                this.textWorld.mainBoard.Draw$1("A game by Pidroh", 1, 2, Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero);
                if (this.screenStage === 0) {
                    switch (ik) {
                        case Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.LEFT: 
                            this.screenStage = 1;
                            this.timeAttack = false;
                            break;
                        case Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.RIGHT: 
                            this.screenStage = 1;
                            this.timeAttack = true;
                            break;
                        case Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.DOWN: 
                            this.timeAttack = true;
                            this.mode = 0;
                            break;
                        case Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.UP: 
                            this.mode = 0;
                            this.timeAttack = false;
                            break;
                        default: 
                            break;
                    }
                    this.textWorld.mainBoard.DrawOnCenter("[w] Vanilla", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero, 0, 4, false);
                    this.textWorld.mainBoard.DrawOnCenter("[a] Elemental", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero, 0, 5, false);
                    this.textWorld.mainBoard.DrawOnCenter("[s] Vanilla Time Attack", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero, 0, 6, false);
                    this.textWorld.mainBoard.DrawOnCenter("[d] Elemental Time Attack", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero, 0, 7, false);
                }
                if (this.screenStage === 1) {
                    if (ik === Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.UP) {
                        this.mode = 1;

                    }
                    if (ik === Pidroh.ConsoleApp.Turnbased.BattleRender.InputKey.DOWN) {
                        this.screenStage = 0;
                    }
                    this.textWorld.mainBoard.DrawOnCenter("Elemental Mode", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero, 0, -5, true);
                    this.textWorld.mainBoard.DrawOnCenter("Fire beats Ice, Ice beats Thunder, Thunder beats fire", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero, 0, -2, true);
                    this.textWorld.mainBoard.DrawOnCenter("Same element = no damage", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero, 0, 0, true);
                    this.textWorld.mainBoard.DrawOnCenter("It is best to have had some experience with vanilla mode", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero, 0, 1, true);
                    this.textWorld.mainBoard.DrawOnCenter("[w] Start Elemental Mode", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero, 0, 4, false);
                    this.textWorld.mainBoard.DrawOnCenter("[s] Go back", Pidroh.ConsoleApp.Turnbased.BattleRender.Colors.GridHero, 0, 5, false);
                }


                if (this.mode >= 0) {
                    this.wannaLeave = 1;
                }




                //string message = youWin;
                //if (battleResult.result == 2) message = youLose;
                //textWorld.mainBoard.DrawOnCenter(message, Colors.Board);
            },
            GetBoard: function () {
                return this.textWorld.mainBoard;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.BlinkAnim.BlinkData", {
        $kind: "nested struct",
        statics: {
            methods: {
                BackColor: function (backColor, blinkDuration) {
                    return new Pidroh.TextRendering.BlinkAnim.BlinkData.$ctor1(Pidroh.TextRendering.TextBoard.NOCHANGECHAR, backColor, Pidroh.TextRendering.TextBoard.NOCHANGECOLOR, blinkDuration, blinkDuration);
                },
                Char: function (c, blinkDuration) {
                    return new Pidroh.TextRendering.BlinkAnim.BlinkData.$ctor1(c, Pidroh.TextRendering.TextBoard.NOCHANGECOLOR, Pidroh.TextRendering.TextBoard.NOCHANGECOLOR, blinkDuration, blinkDuration);
                },
                getDefaultValue: function () { return new Pidroh.TextRendering.BlinkAnim.BlinkData(); }
            }
        },
        fields: {
            text: 0,
            backColor: 0,
            textColor: 0,
            blinkActiveTime: 0,
            blinkInactive: 0
        },
        ctors: {
            $ctor1: function (text, backColor, textColor, blinkActiveTime, blinkInactive) {
                this.$initialize();
                this.text = text;
                this.backColor = backColor;
                this.textColor = textColor;
                this.blinkActiveTime = blinkActiveTime;
                this.blinkInactive = blinkInactive;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([3804934414, this.text, this.backColor, this.textColor, this.blinkActiveTime, this.blinkInactive]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Pidroh.TextRendering.BlinkAnim.BlinkData)) {
                    return false;
                }
                return Bridge.equals(this.text, o.text) && Bridge.equals(this.backColor, o.backColor) && Bridge.equals(this.textColor, o.textColor) && Bridge.equals(this.blinkActiveTime, o.blinkActiveTime) && Bridge.equals(this.blinkInactive, o.blinkInactive);
            },
            $clone: function (to) {
                var s = to || new Pidroh.TextRendering.BlinkAnim.BlinkData();
                s.text = this.text;
                s.backColor = this.backColor;
                s.textColor = this.textColor;
                s.blinkActiveTime = this.blinkActiveTime;
                s.blinkInactive = this.blinkInactive;
                return s;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.CharByCharAnimation.CharByCharData", {
        $kind: "nested class",
        fields: {
            charStart: 0,
            charEnd: 0
        },
        ctors: {
            ctor: function (charStart, charEnd) {
                this.$initialize();
                this.charStart = charStart;
                this.charEnd = charEnd;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.PositionAnimation.PositionData", {
        $kind: "nested struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new Pidroh.TextRendering.PositionAnimation.PositionData(); }
            }
        },
        fields: {
            permanent: false,
            startPosition: null,
            endPosition: null
        },
        ctors: {
            init: function () {
                this.startPosition = new Pidroh.TextRendering.Vector2D();
                this.endPosition = new Pidroh.TextRendering.Vector2D();
            },
            $ctor1: function (startPosition, endPosition, perm) {
                if (perm === void 0) { perm = false; }

                this.$initialize();
                this.startPosition = startPosition.$clone();
                this.endPosition = endPosition.$clone();
                this.permanent = perm;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([5256985096, this.permanent, this.startPosition, this.endPosition]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Pidroh.TextRendering.PositionAnimation.PositionData)) {
                    return false;
                }
                return Bridge.equals(this.permanent, o.permanent) && Bridge.equals(this.startPosition, o.startPosition) && Bridge.equals(this.endPosition, o.endPosition);
            },
            $clone: function (to) {
                var s = to || new Pidroh.TextRendering.PositionAnimation.PositionData();
                s.permanent = this.permanent;
                s.startPosition = this.startPosition.$clone();
                s.endPosition = this.endPosition.$clone();
                return s;
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.BlinkAnim", {
        inherits: [Pidroh.TextRendering.TextAnimation$1(Pidroh.TextRendering.BlinkAnim.BlinkData)],
        methods: {
            Modify$2: function (entity, mainData, progress, length) {
                Pidroh.TextRendering.TextAnimation$1(Pidroh.TextRendering.BlinkAnim.BlinkData).prototype.Modify$2.call(this, entity, mainData, progress, length);
                var aux = progress;
                var blink = true;
                while (true) {
                    if (blink) {
                        aux -= mainData.blinkActiveTime;
                    } else {
                        aux -= mainData.blinkInactive;
                    }
                    if (aux < 0) {
                        break;
                    } else {
                        blink = !blink;
                    }
                }
                if (!blink) {
                    entity.animation.SetAll(mainData.text, mainData.textColor, mainData.backColor);
                }
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.CharByCharAnimation", {
        inherits: [Pidroh.TextRendering.TextAnimation$1(Pidroh.TextRendering.CharByCharAnimation.CharByCharData)],
        methods: {
            Modify$2: function (entity, mainData, progress, length) {
                Pidroh.TextRendering.TextAnimation$1(Pidroh.TextRendering.CharByCharAnimation.CharByCharData).prototype.Modify$2.call(this, entity, mainData, progress, length);
                var ratio = progress / length;
                var lengthText = (mainData.charEnd - mainData.charStart) | 0;
                for (var i = mainData.charStart; i < mainData.charEnd; i = (i + 1) | 0) {
                    var offseted = i;
                    var line = 0;
                    var tb = entity.animation;
                    while (offseted >= tb.Width) {
                        line = (line + 1) | 0;
                        offseted = (offseted - tb.Width) | 0;
                    }
                    if (i > ((lengthText * ratio) + mainData.charStart)) {
                        tb.DrawChar(32, offseted, line);
                        //tb.Draw("" + i, 6, 5, 1);

                    }
                }
            }
        }
    });

    Bridge.define("Pidroh.TextRendering.PositionAnimation", {
        inherits: [Pidroh.TextRendering.TextAnimation$1(Pidroh.TextRendering.PositionAnimation.PositionData)],
        methods: {
            Modify$2: function (entity, mainData, progress, length) {
                Pidroh.TextRendering.TextAnimation$1(Pidroh.TextRendering.PositionAnimation.PositionData).prototype.Modify$2.call(this, entity, mainData, progress, length);
                var target = entity.animation;
                if (mainData.permanent) {
                    target = entity.origin;
                }
                target.Position = Pidroh.TextRendering.Vector2D.InterpolateRounded(mainData.startPosition.$clone(), mainData.endPosition.$clone(), progress / length);

            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2VCdWlsZC5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9Bc3luY1Rhc2tzLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvVHVybkJhc2VkVHJ5VmFsdWVzLmNzIiwiLi4vVHVybkJhc2VkVGV4dFJlbmRlcmluZy9Db2xvclN0dWZmLmNzIiwiLi4vVHVybkJhc2VkTG9naWMvRGVidWdFeHRyYS9EZWJ1Z0V4LmNzIiwiLi4vVHVybkJhc2VkTG9naWMvSGFwcHMvSGFwcC5jcyIsIi4uL1R1cm5CYXNlZExvZ2ljL1JhbmRvbVN1cHBsaWVyLmNzIiwiLi4vVGV4dFJlbmRlcmluZ0xvZ2ljL1RleHRXb3JsZC5jcyIsIi4uL1RleHRSZW5kZXJpbmdMb2dpYy9UZXh0Qm9hcmQuY3MiLCIuLi9CYXNlVXRpbHMvVmVjdG9yMkQuY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL0JhdHRsZVJlbmRlci5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvR2FtZU1haW4uY3MiLCIuLi9UdXJuQmFzZWRUZXh0UmVuZGVyaW5nL1Jlc3VsdFNjcmVlbi5jcyIsIi4uL1R1cm5CYXNlZFRleHRSZW5kZXJpbmcvTW9kZVNlbGVjdGlvblNjcmVlbi5jcyIsIi4uL1RleHRSZW5kZXJpbmdMb2dpYy9CbGlua0FuaW1hdGlvbi5jcyIsIi4uL1RleHRSZW5kZXJpbmdMb2dpYy9DaGFyQnlDaGFyQW5pbWF0aW9uLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7WUFzQ1lBLHFDQUFjQSxtQ0FBUUE7WUFDdEJBLHlCQUFTQTtZQUNUQSxLQUFLQSxXQUFXQSxJQUFJQSwrQkFBZUE7O2dCQUcvQkEsMENBQU9BLEdBQVBBLDJCQUFZQSxpRUFBa0JBLEdBQWxCQTs7Ozs7Ozs7Ozs7Ozs7WUFjaEJBLFlBQVlBO1lBQ1pBLGtCQUFrQkE7WUFDbEJBLDBCQUEwQkE7WUFDMUJBO1lBQ0FBOztZQUVBQSw2REFBdUJBLFVBQUNBOztnQkFFcEJBLGNBQWNBO2dCQUNkQSxTQUF1REE7Z0JBQ3ZEQSxRQUFRQTtvQkFFSkE7d0JBQ0tBLEtBQUtBO3dCQUNOQTtvQkFDSkE7d0JBQ0lBLEtBQUtBO3dCQUNMQTtvQkFDSkE7d0JBQ0lBLEtBQUtBO3dCQUNMQTtvQkFDSkE7d0JBQ0lBLEtBQUtBO3dCQUNMQTtvQkFDSkE7d0JBQ0lBLEtBQUtBO3dCQUNMQTtvQkFDSkE7b0JBQ0FBO3dCQUNJQSxLQUFLQTt3QkFDTEE7b0JBQ0pBO29CQUNBQTt3QkFDSUEsS0FBS0E7d0JBQ0xBO29CQUNKQTtvQkFDQUE7d0JBQ0lBLEtBQUtBO3dCQUNMQTtvQkFDSkE7b0JBQ0FBO3dCQUNJQSxLQUFLQTt3QkFDTEE7b0JBQ0pBO3dCQUNJQSxLQUFLQTt3QkFDTEE7b0JBR0pBO3dCQUNJQTs7O2dCQUdSQSx5QkFBU0EsQUFBS0E7Z0JBQ2RBOzs7WUFHSkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FDQTVGMEJBLElBQWlCQTtvQkFFM0NBLFVBQWFBLElBQUlBO29CQUNqQkEsc0RBQTBCQTt3QkFFdEJBLE9BQU9BLEFBQU9BOztvQkFFbEJBLE9BQUtBLElBQUlBO29CQUNUQSxjQUFZQTs7OztvQkFxR1pBLDRCQUFZQTtvQkFDWkE7b0JBQ0FBLElBQUlBO3dCQUVBQSwyQkFBV0EsQ0FBTUE7d0JBQ2pCQTs7d0JBSUFBLDJCQUFXQTs7b0JBRWZBO29CQUNBQSxLQUFLQSxXQUFXQSxJQUFJQSxrQ0FBa0JBO3dCQUVsQ0EsS0FBS0EsV0FBV0EsSUFBSUEsaUNBQWlCQTs0QkFFakNBLEtBQW9CQSxHQUFHQSxHQUFFQSwwQ0FBT0EseUNBQW9CQSxHQUFFQSxLQUE3QkEsMEJBQWtDQSwwQ0FBT0EseUNBQW9CQSxHQUFFQSxLQUE3QkEsMEJBQWtDQSx5QkFBR0EsaUNBQWlCQSxHQUFHQTs7Ozs7OztvQkFPNUhBLGtCQUFrQkEsQUFBdUJBOzs7Ozs7Ozs7Ozs7Ozs7NkJDckl6QkEsS0FBSUE7NkJBQ0pBLEtBQUlBOzs7OzhCQUVMQTtnQkFFZkEsS0FBS0EsV0FBV0EsSUFBSUEsa0JBQWFBO29CQUU3QkEsbUJBQU1BLEdBQU5BLG1CQUFNQSxHQUFNQTtvQkFDWkEsSUFBSUEsbUJBQU1BO3dCQUVOQSxhQUFRQTt3QkFDUkEsYUFBUUE7Ozs7MkJBT0ZBO2dCQUVkQSxlQUFVQTs7O2dCQUtWQSxPQUFPQTs7K0JBR1dBOztnQkFFbEJBLG9CQUFlQTtnQkFDZkEsMEJBQWtCQTs7Ozt3QkFFZEEsb0NBQVdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJDMnpCTUEsVUFBY0E7O2dCQUVuQ0EsZ0JBQWdCQTtnQkFDaEJBLGNBQWNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NDdDJCY0E7OztvQkFJNUJBLEtBQUtBLFdBQVdBLElBQUlBLHNEQUFlQTt3QkFFL0JBLGlFQUFPQSxHQUFQQTs7Ozs7Ozs7Ozs7Ozs7OztvQkFnQkpBLGlFQUFPQSxzREFBUEE7b0JBQ0FBO29CQUNBQSxpRUFBT0EsMERBQVBBLGtEQUFtRUE7b0JBQ25FQSxpRUFBT0EsdURBQVBBO29CQUNBQSxpRUFBT0EsMERBQVBBLGtEQUFtRUE7b0JBQ25FQTtvQkFDQUEsaUVBQU9BLDJEQUFQQSxrREFBb0VBO29CQUNwRUEsaUVBQU9BLDJEQUFQQSxrREFBb0VBO29CQUNwRUEsaUVBQU9BLHVEQUFQQTtvQkFDQUEsaUVBQU9BLDBEQUFQQTtvQkFDQUEsaUVBQU9BLDZEQUFQQTtvQkFDQUEsaUVBQU9BLDBEQUFQQTtvQkFDQUEsaUVBQU9BLHlEQUFQQTtvQkFDQUEsaUVBQU9BLDZEQUFQQTtvQkFDQUEsaUVBQU9BLDBEQUFQQTtvQkFDQUEsaUVBQU9BLHlEQUFQQTtvQkFDQUEsaUVBQU9BLDZEQUFQQTs7Ozs7Ozs7Ozs7Ozs7b0NDNUMyQkEsS0FBSUE7Ozs7K0JBRVpBO29CQUVuQkEsNERBQWFBOzs7O29CQUtiQTtvQkFDQUEsMEJBQXFCQTs7Ozs0QkFFakJBLHlCQUFrQkE7Ozs7Ozs7cUJBR3RCQTs7Ozs7Ozs7Ozs7Ozs7NkJDb0RvQkEsS0FBSUE7OzRCQUVoQkE7O2dCQUVSQSxlQUFVQTs7OztvQ0FjV0E7Z0JBRXJCQSxlQUFVQTtnQkFDVkEsT0FBT0E7O3dDQUdtQkE7Z0JBRTFCQSxPQUFPQSxrQkFBS0EsbUJBQU1BOzs7Ozs7Ozs7Ozs7OzRCQVhNQSxJQUFJQTs7OztnQ0FMRkE7Z0JBRXRCQSxhQUFRQTtnQkFDUkEsT0FBT0E7Ozs7Ozs7Ozs7OzRCQXNCSUEsU0FBZ0JBOztnQkFFL0JBLGVBQWVBO2dCQUNmQSxjQUFTQTs7Ozs7Ozs7Ozs7Ozs7NkJBcEdNQSxLQUFJQTtnQ0FDTUEsS0FBSUE7cUNBQ2JBOzs7O2tDQUVHQTtnQkFFbkJBLGtCQUFhQTs7O2dCQUtiQSxJQUFHQSx1QkFBaUJBO29CQUNoQkE7Ozs7O2dCQUtKQSxxQkFBZ0JBO2dCQUNoQkEsMEJBQWtCQTs7Ozt3QkFFZEEsS0FBS0EsUUFBUUEsNEJBQWlCQSxRQUFRQTs7OzRCQUlsQ0EsSUFBSUEsbUJBQU1BLGlCQUFnQkE7Z0NBRXRCQTtnQ0FDQUE7OzRCQUVKQSxJQUFJQSwwQ0FBTUEsWUFBY0E7Z0NBRXBCQTtnQ0FDQUEsU0FBU0EsbUJBQU1BOztnQ0FJZkE7Ozs7Ozs7OzsyQkFNQUE7Z0JBRVpBLGNBQWNBO2dCQUNkQSxlQUFVQTtnQkFDVkEsT0FBT0E7OztnQkFLUEE7Ozs7Ozs7Ozs7OzRCQW9FdUNBLEtBQUlBOzs7OzhCQVg1QkE7Z0JBRWZBLE9BQU9BLG1CQUFjQTs7MkJBR1BBO2dCQUVkQSxjQUFTQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJINnZCQUEsTUFBZ0JBOztnQkFFekJBLFlBQVlBO2dCQUNaQSxZQUFZQTs7OEJBR0hBLE1BQWdCQTs7Z0JBRXpCQSxZQUFZQTtnQkFDWkEsWUFBWUEsdUJBQWdCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJBaktFQSxJQUFJQTtnQ0FDRkEsSUFBSUEsNENBQVNBO2lDQUNaQSxJQUFJQTtnQ0FDTEEsSUFBSUEseUNBQU1BOzs7O3VDQWtCZkEsSUFBVUE7b0JBRXJDQSwyREFBUUE7b0JBQ1JBLDJEQUFRQTtvQkFDUkEsT0FBT0E7OzBDQUVvQkEsSUFBVUE7b0JBRXJDQSxZQUFZQTtvQkFDWkEsWUFBWUE7b0JBQ1pBLE9BQU9BOzt1Q0FTb0JBLElBQVVBO29CQUVyQ0EsYUFBY0EsdUJBQXVCQSxJQUFJQTtvQkFDekNBLGFBQWNBLHVCQUF1QkEsSUFBSUE7b0JBQ3pDQSxJQUFJQSxVQUFVQTt3QkFDVkE7O29CQUNKQSxJQUFJQSxVQUFVQTt3QkFFVkE7O29CQUVKQSxPQUFPQSxvREFBUUEsU0FBUUEsb0RBQVFBOzt5Q0FHSkEsSUFBVUE7b0JBRXJDQSxhQUFjQSx1QkFBdUJBLElBQUlBO29CQUN6Q0EsYUFBY0EsdUJBQXVCQSxJQUFJQTtvQkFDekNBLElBQUlBLFVBQVVBO3dCQUNWQTs7b0JBQ0pBLElBQUlBLFVBQVVBO3dCQUVWQTs7b0JBRUpBLE9BQU9BLENBQUNBLENBQUNBLG9EQUFRQSxTQUFRQSxvREFBUUE7Ozs7Ozs7Ozs7eUJBMURwQkEsSUFBSUE7eUJBQ0pBLElBQUlBOzs4QkFFUkEsR0FBT0E7O2dCQUVoQkEsYUFBYUE7Z0JBQ2JBLGFBQWFBOzs7Ozs7OzsyQkF1QkRBLEdBQU9BO2dCQUVuQkEsYUFBYUE7Z0JBQ2JBLGFBQWFBOzs7Ozs7Ozs7OztpQ0k5dkJPQSxLQUFTQTtvQkFDN0JBLE9BQU9BLGtCQUFNQSxBQUFDQSx3REFBYUEsQ0FBQ0EsUUFBSUEsYUFBS0E7O3lDQUdYQSxHQUFHQTtvQkFFN0JBLE9BQU9BLHlCQUFNQSxvREFBU0EsZUFBZkE7Ozs7Ozs7OzswQ0o0UXdCQTtvQkFFL0JBLGNBQWNBO29CQUNkQSxjQUFjQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBblJtQkEsS0FBSUE7bUNBQ1JBLElBQUlBO21DQUNKQSxJQUFJQTtxQ0FDT0EsS0FBSUE7OEJBR3BCQSxLQUFJQTtrQ0FDR0EsS0FBSUE7bUNBQ0xBLG1CQUM5QkEsSUFBSUEsZ0VBQVdBLCtEQUFpQkEsaUVBQ2hDQSxJQUFJQSxnRUFBV0EsNERBQWNBLDhEQUM3QkEsSUFBSUEsZ0VBQVdBLDREQUFjQSxvRUFDN0JBLElBQUlBLGdFQUFXQSwyREFBYUE7O29DQUdKQTtvQ0FFT0EsSUFBSUE7OzRCQUdkQTs7Z0JBRXJCQSx1QkFBa0JBLCtEQUFpQkE7Z0JBQ25DQSx1QkFBa0JBLGlFQUFtQkE7Z0JBQ3JDQSx1QkFBa0JBLGlFQUFtQkE7Z0JBQ3JDQSx1QkFBa0JBLGtFQUFvQkE7O2dCQUV0Q0E7Z0JBQ0FBLG9CQUFlQTtnQkFDZkEsb0JBQWVBO2dCQUNmQSxvQkFBZUE7Z0JBQ2ZBLG9CQUFlQTs7Z0JBRWZBLElBQUlBO29CQUVBQSxvQkFBZUE7b0JBQ2ZBLGtCQUFhQSxtQkFDVEEsK0RBQ0FBLGlFQUNBQSxpRUFDQUEsa0VBQ0FBOztvQkFLSkEsb0JBQWVBO29CQUNmQSxvQkFBZUE7b0JBQ2ZBLG9CQUFlQTs7b0JBRWZBLGtCQUFhQSxtQkFDVEEsaUVBQ0FBLGlFQUNBQSwrREFDQUEsa0VBQ0FBLDZEQUNBQSw0REFDQUE7Ozs7Ozs7OztnQkFVUkEsT0FBT0E7O21DQUdhQTtnQkFFcEJBLHFDQUFnQ0E7Z0JBQ2hDQSxnQkFBV0E7Ozs7Z0JBTVhBLFdBQW9CQSxJQUFJQTs7Z0JBRXhCQTtnQkFDQUE7Z0JBQ0FBO2dCQUNBQSxZQUFZQTtnQkFDWkE7O2dCQUVBQSxrQkFBYUE7O2dCQUViQSxLQUFLQSxXQUFXQSxJQUFJQSxlQUFVQTtvQkFFMUJBLFlBQXFCQSxJQUFJQTtvQkFDekJBLGNBQWNBLE1BQUlBO29CQUNsQkE7b0JBQ0FBO29CQUNBQTtvQkFDQUEsZ0JBQWdCQSxLQUFJQTtvQkFDcEJBLGFBQWFBO29CQUNiQSxrQkFBYUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBcUNqQkE7Z0JBQ0FBOzs7Z0JBS0FBLEtBQUtBLFdBQVdBLElBQUlBLHFCQUFnQkE7b0JBRWhDQSxzQkFBU0E7O2dCQUViQSxpQkFBWUE7Z0JBQ1pBO2dCQUNBQTtnQkFDQUE7Z0JBQ0FBO2dCQUNBQTs7O2dCQUtBQSxPQUFPQTs7OztnQkFLUEE7Z0JBQ0FBO2dCQUNBQTtnQkFDQUEsMEJBQXFCQTs7Ozt3QkFFakJBLElBQUlBLGNBQWFBOzRCQUViQSxJQUFJQTtnQ0FDQUE7Ozt3QkFFUkEsSUFBSUEsY0FBYUE7NEJBRWJBLElBQUlBO2dDQUNBQTs7Ozs7Ozs7aUJBR1pBLElBQUlBLENBQUNBO29CQUVEQTs7dUJBR0NBLElBQUlBLENBQUNBO29CQUVOQTs7Z0JBRUpBLElBQUlBO29CQUVBQTtvQkFDQUE7Ozs7OEJBS1dBO2dCQUVmQSxJQUFJQSx5QkFBb0JBLDJCQUFxQkE7b0JBRXpDQSxxQkFBZ0JBO29CQUNoQkEsSUFBSUE7d0JBRUFBOzs7Ozs7OztnQkFTUkEsb0JBQTRCQTtnQkFDNUJBLFFBQVFBO29CQUVKQSxLQUFLQTt3QkFDREEsaUJBQVlBO3dCQUNaQTtvQkFDSkEsS0FBS0E7d0JBQ0RBLGlCQUFZQTt3QkFDWkE7b0JBQ0pBLEtBQUtBO3dCQUNEQSxpQkFBWUE7d0JBQ1pBO29CQUNKQSxLQUFLQTt3QkFDREEsSUFBSUEsa0ZBQTRCQTs0QkFFNUJBOzRCQUNBQTs0QkFDQUE7NEJBQ0FBLGdCQUFnQkE7NEJBQ2hCQSxJQUFJQSxZQUFZQTtnQ0FFWkEsS0FBS0EsUUFBUUEsV0FBV0EsSUFBSUEscUJBQWdCQTtvQ0FFeENBLElBQUlBLHNCQUFTQTt3Q0FFVEEsZ0NBQTJCQTt3Q0FDM0JBO3dDQUNBQTs7Ozs7OzRCQU1aQSxJQUFJQTtnQ0FFQUEsSUFBSUEsMEVBQW9CQTtvQ0FFcEJBLGlCQUFZQTtvQ0FDWkEsMEJBQWtCQTs7Ozs0Q0FFZEEsSUFBSUE7Z0RBRUFBLDZEQUFlQTs7Ozs7Ozs7b0NBTXZCQTtvQ0FDQUEsd0JBQW1CQTs7Ozs0QkFNM0JBOzs7d0JBRUpBO29CQUNKQTt3QkFDSUE7OzttQ0FVYUE7O2dCQUVyQkEsb0JBQTRCQTtnQkFDNUJBLElBQUlBLFVBQVNBO29CQUFlQTs7Z0JBQzVCQSxJQUFJQSxVQUFTQTtvQkFFVEEsb0JBQWVBOztnQkFFbkJBLElBQUlBLGtCQUFpQkE7b0JBRWpCQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUEsMEJBQWtCQTs7Ozs0QkFFZEEsMkJBQWtCQTs7OztvQ0FFZEEsSUFBSUEsbURBQUtBO3dDQUNMQSxRQUFRQTs7Ozs7Ozs7Ozs7Ozs7Z0JBSXhCQSx5QkFBb0JBOzs7O2dCQUtwQkEsWUFBWUE7Z0JBQ1pBLFFBQVFBO29CQUVKQSxLQUFLQTt3QkFDREE7d0JBQ0FBO29CQUNKQSxLQUFLQTt3QkFDREE7b0JBQ0pBLEtBQUtBO3dCQUNEQTt3QkFDQUEsMEJBQW1CQTs7OztnQ0FFZkEsZ0JBQVdBLElBQUlBLHlDQUFnQkEsNENBQWdCQSxBQUFLQTs7Ozs7O3lCQUV4REEsZ0JBQVdBLElBQUlBLHlDQUFnQkEsa0RBQXNCQTt3QkFDckRBLGdCQUFXQSxJQUFJQSx5Q0FBZ0JBLGtEQUFzQkE7d0JBQ3JEQTtvQkFDSkEsS0FBS0E7d0JBQ0RBO3dCQUNBQTtvQkFDSkE7d0JBQ0lBOzs7aUNBVVVBOztnQkFFbEJBLElBQUlBLGVBQWNBO29CQUVkQSxXQUFnQkEsQUFBVUE7b0JBQzFCQSxJQUFHQSx5QkFBb0JBO3dCQUNuQkEsZ0JBQVdBOzs7O2dCQUduQkEsSUFBSUEsZUFBY0E7b0JBRWRBLFdBQXVCQSxBQUFpQkE7b0JBQ3hDQSxJQUFJQSxTQUFRQTt3QkFFUkEsMEJBQWtCQTs7OztnQ0FFZEEsSUFBSUEsV0FBVUE7b0NBRVZBLEtBQUtBLFdBQVdBLElBQUlBLGdCQUFnQkE7d0NBRWhDQSxJQUFJQSx5RUFBUUEsR0FBUkEsV0FBY0E7NENBRWRBLDJCQUFRQSxHQUFSQSxZQUFhQSxJQUFJQTs0Q0FDakJBLDJCQUFRQSxHQUFSQSxnQkFBaUJBOzt3Q0FFckJBLFlBQWNBLDJCQUFRQSxHQUFSQTs7d0NBRWRBLElBQUlBLGNBQWFBLE1BQU1BLE1BQUtBOzRDQUV4QkEsSUFBSUE7Z0RBRUFBLDJCQUFRQSxlQUFSQSxnQkFBcUJBOzs7Ozs7Ozs7OztvQkFPN0NBLElBQUlBLFNBQVFBO3dCQUVSQTs7OztrQ0FLV0E7O2dCQUVuQkEsMEJBQWtCQTs7Ozt3QkFFZEEsSUFBSUEsV0FBVUE7NEJBRVZBLEtBQUtBLFdBQVdBLElBQUlBLGdCQUFnQkE7Z0NBRWhDQSxJQUFJQSx5RUFBUUEsR0FBUkEsV0FBY0E7b0NBRWRBLDJCQUFRQSxHQUFSQSxZQUFhQSxJQUFJQTtvQ0FDakJBLDJCQUFRQSxHQUFSQSxnQkFBaUJBOztnQ0FFckJBLFlBQWNBLDJCQUFRQSxHQUFSQTs7Z0NBRWRBLElBQUlBLGNBQWFBOztvQ0FHYkEsMkJBQVFBLEdBQVJBLHNCQUF1QkE7b0NBQ3ZCQTs7Ozs7Ozs7Ozs7O2dCQVNoQkEsMEJBQWtCQTs7Ozt3QkFFZEEsSUFBSUEsV0FBVUE7NEJBRVZBLEtBQUtBLFdBQVdBLElBQUlBLGdCQUFnQkE7Z0NBRWhDQSxJQUFJQSx5RUFBUUEsR0FBUkEsV0FBY0E7b0NBRWRBLDJCQUFRQSxHQUFSQSxZQUFhQSxJQUFJQTs7O2dDQUdyQkEsMkJBQVFBLEdBQVJBLHNCQUF1QkEsMElBQTZGQTs7Ozs7Ozs7Ozs7Ozs7Z0JBWWhJQSxlQUF3QkEsc0JBQVNBO2dCQUNqQ0EsV0FBV0E7Z0JBQ1hBLGlCQUFZQSxVQUFVQTs7bUNBR0ZBLE9BQW9CQTs7Z0JBRXhDQTs7Z0JBRUFBLFlBQWNBLCtCQUFZQSxNQUFaQTtnQkFDZEEsSUFBSUEsdURBQVNBO29CQUVUQSxTQUFTQSxrQkFBVUE7OztvQkFJbkJBLG1CQUFvQkEsT0FBTUE7b0JBQzFCQSxvQkFBb0JBO29CQUNwQkEsMEJBQXFCQTs7Ozs0QkFFakJBLElBQUlBLGtCQUFpQkE7Z0NBRWpCQTtnQ0FDQUEsZ0JBQWdCQTs7Ozs7OztxQkFHeEJBLElBQUlBO3dCQUVBQSxhQUFzQkE7d0JBQ3RCQTt3QkFDQUEsZ0JBQWdCQTt3QkFDaEJBLDJCQUFtQkE7Ozs7O2dDQUdmQSxJQUFJQTtvQ0FBU0E7O2dDQUNiQSxJQUFJQSxlQUFjQSxXQUNYQSxZQUFXQSx3RUFDWEEsWUFBV0E7b0NBRWRBLGlCQUFrQkEsMkRBQWVBOztvQ0FFakNBLElBQUlBO3dDQUVBQSxVQUFZQSw4REFBY0E7d0NBQzFCQSxJQUFJQTs0Q0FBU0EsT0FBT0E7O3dDQUNwQkEsSUFBSUEsTUFBTUE7NENBRU5BLFNBQVNBOzRDQUNUQSxTQUFTQTs7Ozs7Ozs7Ozt5QkFNekJBLElBQUlBLFVBQVVBOzRCQUVWQSxvQkFBcUJBLGtCQUFpQkEsa0JBQWtCQSxrQkFBaUJBOzRCQUN6RUEsSUFBSUE7Ozs7OztnQ0FRQUEsSUFBSUE7b0NBRUFBLElBQUlBLENBQUNBO3dDQUVEQSxVQUFVQSwrQkFBMEJBO3dDQUNwQ0EsT0FBT0EsaUNBQTRCQTt3Q0FDbkNBLElBQUlBLENBQUNBLGtCQUFpQkEsOERBQWdCQSxtQkFBa0JBLDhEQUNqREEsQ0FBQ0Esa0JBQWlCQSxpRUFBbUJBLG1CQUFrQkEsK0RBQ3ZEQSxDQUFDQSxrQkFBaUJBLDZEQUFlQSxtQkFBa0JBOzRDQUV0REE7Ozs7d0NBSUpBLG1CQUFtQkEsSUFBSUE7d0NBQ3ZCQTt3Q0FDQUEscUJBQ0tBLElBQUlBLHVDQUFLQSxtT0FDQUEsSUFBSUEsNERBQTBCQSxzQkFBaUJBOzs7b0NBTWpFQSxxQkFDS0EsSUFBSUEsdUNBQUtBLGlPQUNBQSxJQUFJQSw0REFBMEJBLHNCQUFpQkEsdUJBQy9DQSxJQUFJQSw0REFBMEJBLHNCQUFpQkEsc0JBQy9DQSxJQUFJQSw0REFBMEJBLEFBQUtBOzs7b0NBR2pEQTs7Ozs7OzRCQVNSQTs0QkFDQUEscUJBQ1NBLElBQUlBLHVDQUFLQSxrT0FDQUEsSUFBSUEsNERBQTBCQSxzQkFBaUJBLHNCQUFzQkEsSUFBSUEsNERBQTBCQSxBQUFLQTs7OztvQkFNbElBO29CQUNBQSxJQUFJQSwrQkFBMEJBLElBQVFBO3dCQUVsQ0EscUVBQWFBO3dCQUNiQSxrQkFDSUEsNkRBQWNBLGlFQUNYQSw2REFBY0EsaUVBQ2RBLDZEQUFjQSxpRUFDZEEsNkRBQWNBO3dCQUNyQkEsMkJBQWtCQTs7OztnQ0FFZEEsSUFBSUEsMkJBQUtBLFVBQVNBO29DQUVkQSxJQUFJQSx5REFBYUE7d0NBRWJBO3dDQUNBQSxJQUFJQSxXQUFVQTs0Q0FFVkE7NENBQ0FBOzRDQUNBQTs7d0NBRUpBLElBQUlBLFdBQVVBOzRDQUVWQTs7d0NBRUpBLElBQUlBOzRDQUFhQTs7Ozs7Ozs7Ozs7eUJBTTdCQSxJQUFJQTs7NEJBR0FBLHFCQUNTQSxJQUFJQSx1Q0FBS0Esb09BQ0FBLElBQUlBLDREQUEwQkEsc0JBQWlCQSxzQkFDL0NBLElBQUlBLDREQUEwQkEsNEVBQzlCQSxJQUFJQSw0REFBMEJBOzs0QkFFaERBOzRCQUNBQSx3RUFBYUE7Ozs7OztpREFRV0E7O2dCQUVwQ0EsWUFBWUE7Z0JBQ1pBLDBCQUFrQkE7Ozs7d0JBRWRBLElBQUlBLDJCQUFLQTs0QkFFTEEsSUFBSUEscURBQVNBO2dDQUVUQSxJQUFJQSxXQUFVQTtvQ0FFVkE7Ozs7Ozs7OztpQkFLaEJBLE9BQU9BOzttREFJK0JBOztnQkFFdENBO2dCQUNBQSwwQkFBa0JBOzs7O3dCQUVkQSxJQUFJQSwyQkFBS0E7NEJBRUxBLElBQUlBLHFEQUFTQTtnQ0FFVEEsSUFBSUEsV0FBVUE7b0NBRVZBOzs7Ozs7Ozs7aUJBS2hCQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJBd0RXQSxTQUFpQkE7O2dCQUUvQkEsZUFBZUE7Z0JBQ2ZBLGdCQUFnQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQTdCZ0JBLE9BQU9BLElBQUlBLHFDQUFTQSw2REFBT0E7Ozs7O29CQUV0Q0EsT0FBT0E7Ozs7O29CQUVOQSxPQUFPQSxDQUFDQTs7Ozs7OzRCQW5CZEEsSUFBSUE7MkJBRUxBLElBQUlBOzhCQUNEQSxJQUFJQTs4QkFDSkEsSUFBSUE7NkJBRUhBOzs7OzsrQkFNRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQXRCTEEsSUFBSUE7cUNBQ0tBLElBQUlBO29DQUNMQSxJQUFJQTtzQ0FDRkEsSUFBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VDQXFLUEEsSUFBVUE7b0JBRXJDQSxVQUFVQTtvQkFDVkEsT0FBT0E7OzBDQUdvQkEsSUFBVUE7b0JBRXJDQSxPQUFPQSxTQUFTQTs7dUNBR1dBLElBQVVBO29CQUVyQ0EsYUFBY0EsdUJBQXVCQSxJQUFJQTtvQkFDekNBLGFBQWNBLHVCQUF1QkEsSUFBSUE7b0JBQ3pDQSxJQUFJQSxVQUFVQTt3QkFDVkE7O29CQUNKQSxJQUFJQSxVQUFVQTt3QkFFVkE7O29CQUVKQSxPQUFPQSxXQUFVQTs7eUNBR1VBLElBQVVBO29CQUVyQ0EsYUFBY0EsdUJBQXVCQSxJQUFJQTtvQkFDekNBLGFBQWNBLHVCQUF1QkEsSUFBSUE7b0JBQ3pDQSxJQUFJQSxVQUFVQTt3QkFDVkE7O29CQUNKQSxJQUFJQSxVQUFVQTt3QkFFVkE7O29CQUVKQSxPQUFPQSxXQUFVQTs7eUNBR2lCQTtvQkFFbENBLE9BQU9BOzt1Q0FHeUJBO29CQUVoQ0EsT0FBT0Esa0JBQUtBOzs7Ozs7Ozs7O29CQW5EY0EsV0FBTUEsd0JBQWlCQTs7Ozs7MkJBRW5DQTtnQkFFZEEsV0FBTUE7Ozs7Ozs7Ozs7Ozs7OzhCS3ZsQldBLEtBQUlBO2dDQUNGQSxLQUFJQTsrQkFDUEEsS0FBSUE7NkJBQ0pBLEtBQUlBOzs7OztnQkFJcEJBLGVBQVVBO2dCQUNWQSxlQUFVQTtnQkFDVkEsZUFBVUE7Z0JBQ1ZBOzs4QkFLZUE7Z0JBRWZBLEtBQUtBLFdBQVdBLElBQUlBLHFCQUFnQkE7b0JBRWhDQSxzQkFBU0EsR0FBVEEsc0JBQVNBLEdBQU1BO29CQUNmQSxJQUFJQSxzQkFBU0EsTUFBTUEsb0JBQU9BO3dCQUV0QkEsYUFBUUE7Ozs7OzsyQkFXRkE7Z0JBRWRBLGtCQUFhQTtnQkFDYkEsaUJBQVlBO2dCQUNaQSxnQkFBV0E7Ozs7Z0JBS1hBLDBCQUFxQkE7Ozs7d0JBRWpCQSxJQUFJQSxnQ0FBY0E7NEJBRWRBLFFBQVdBOzRCQUNYQTs7Ozs7OztpQkFHUkEsT0FBT0E7OytCQUdXQTs7Z0JBRWxCQSwwQkFBa0JBOzs7Ozt3QkFHZEEsb0NBQVdBOzs7Ozs7O29DQUlRQTtnQkFFdkJBLGVBQVVBOztnQ0FHT0E7Z0JBRWpCQSxLQUFLQSxXQUFXQSxJQUFJQSxxQkFBZ0JBO29CQUVoQ0EsSUFBSUEsU0FBUUEscUJBQVFBO3dCQUVoQkEsWUFBT0EsR0FBR0EsR0FBR0Esc0JBQVNBLElBQUlBLG9CQUFPQTt3QkFDakNBOzs7OzhCQUtlQSxRQUFtQkEsT0FBV0EsVUFBZ0JBOzs7Ozs7Ozs7Ozs7Ozs7Ozs4QkF0RnJEQSxRQUFjQSxVQUFnQkE7O2dCQUUxQ0EsY0FBY0E7Z0JBQ2RBLGdCQUFnQkE7Z0JBQ2hCQSxjQUFjQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3Q0M3TVdBO3lDQUNDQTt5Q0FDREE7MENBQ0NBOzs7Ozs7Ozs7Ozs7Ozs7OztvQkFpRXhCQSxPQUFPQTs7O29CQUdUQSxlQUFVQTs7Ozs7b0JBR1NBLE9BQU9BOzs7b0JBRzFCQSxlQUFVQTs7Ozs7Ozs7Ozs0QkFoRURBLE9BQVdBOzs7Z0JBR3hCQSxZQUFPQSxPQUFPQTs7OztvQ0FHT0EsU0FBZ0JBLE9BQVdBLE1BQWNBLE1BQWNBOzs7O2dCQUU1RUEsUUFBUUEsaUJBQUNBO2dCQUNUQSxJQUFJQTtvQkFBYUEsU0FBS0E7O2dCQUN0QkEsUUFBUUE7Z0JBQ1JBLFlBQUtBLFNBQVNBLE1BQUlBLFlBQU1BLE1BQUlBLFlBQU1BOztrQ0FHZEEsT0FBV0E7Z0JBRS9CQSxhQUFRQSwwQ0FBU0EsT0FBT0E7Z0JBQ3hCQSxpQkFBWUEsMkNBQVFBLE9BQU9BO2dCQUMzQkEsaUJBQVlBLDJDQUFRQSxPQUFPQTs7O2dCQUszQkEsNEJBQXdCQSxZQUFPQTs7O2dCQUsvQkEsa0JBQWFBLG9EQUFxQkEsWUFBT0EsYUFBUUEsK0NBQWdCQTs7OEJBTWxEQTtnQkFFZkEsS0FBS0EsV0FBV0EsSUFBSUEsbUJBQW1CQTtvQkFFbkNBLEtBQUtBLFdBQVdBLElBQUlBLG9CQUFvQkE7d0JBRXBDQSxRQUFRQSxtQkFBS0EsMEJBQXlCQTt3QkFDdENBLFFBQVFBLG1CQUFLQSwwQkFBeUJBO3dCQUN0Q0EsSUFBSUEsdUJBQWtCQSxHQUFHQSxRQUFNQTs0QkFDM0JBLGdCQUFNQSxHQUFHQSxJQUFLQSx1QkFBa0JBLEdBQUdBOzt3QkFDdkNBLElBQUlBLDJCQUFzQkEsR0FBR0EsUUFBTUE7NEJBQy9CQSxvQkFBVUEsR0FBR0EsSUFBS0EsMkJBQXNCQSxHQUFHQTs7d0JBQy9DQSxJQUFJQSwyQkFBc0JBLEdBQUdBLFFBQU1BOzRCQUMvQkEsb0JBQVVBLEdBQUdBLElBQUtBLDJCQUFzQkEsR0FBR0E7Ozs7O29DQXFCbENBLEdBQU9BLEdBQU9BLEdBQU9BOztnQkFFMUNBLFFBQVNBLENBQU1BLEFBQUNBO2dCQUNoQkEsZ0JBQVNBLEdBQUdBLEdBQUdBLEdBQUdBOzsyQkFHSkE7Z0JBRWRBLGdCQUFnQkE7Z0JBQ2hCQSxLQUFLQSxXQUFXQSxJQUFJQSxZQUFPQTtvQkFFdkJBLEtBQUtBLFdBQVdBLElBQUlBLGFBQVFBO3dCQUV4QkEsZ0JBQVdBLEdBQUdBLElBQUtBLGtCQUFhQSxHQUFHQTt3QkFDbkNBLG9CQUFlQSxHQUFHQSxJQUFLQSxzQkFBaUJBLEdBQUdBO3dCQUMzQ0Esb0JBQWVBLEdBQUdBLElBQUtBLHNCQUFpQkEsR0FBR0E7Ozs7OEJBS2xDQSxHQUFPQTtnQkFFeEJBLElBQUlBLGNBQVNBLFFBQVFBLElBQUlBLHlDQUFzQkEsSUFBSUE7b0JBRS9DQSxnQkFBV0EsR0FBR0E7O2dCQUVsQkEsYUFBUUE7Z0JBQ1JBLGNBQVNBOzs7OEJBSU1BLEdBQU9BO2dCQUV0QkEsT0FBT0EsZ0JBQU1BLEdBQUdBOzttQ0FHSUEsR0FBT0E7Z0JBRTNCQSxlQUFVQTtnQkFDVkEsZUFBVUE7O3FDQUdVQTs7Z0JBRXBCQSwwQkFBa0JBOzs7O3dCQUVkQSxpQkFBWUE7Ozs7Ozs7cUNBSUlBLEdBQVVBOztnQkFFOUJBLDBCQUFrQkE7Ozs7d0JBRWRBLG1CQUFZQSxHQUFHQTs7Ozs7OzttQ0FTQ0E7O2dCQUdwQkEsY0FBU0EsR0FBR0EsY0FBU0E7Z0JBQ3JCQTs7cUNBR29CQSxHQUFRQTs7Z0JBRzVCQSxnQkFBU0EsR0FBR0EsY0FBU0EsY0FBU0E7Z0JBQzlCQTs7MkNBaEI0QkE7Z0JBRTVCQSxpQkFBWUEsRUFBTUEsQUFBQ0E7OztnQkFtQm5CQTtnQkFDQUEsSUFBSUEsZ0JBQVdBO29CQUVYQTtvQkFDQUE7OztxQ0FJa0JBO2dCQUV0QkE7Z0JBQ0FBLGVBQVVBOztnQ0FHT0EsR0FBUUEsR0FBT0E7Z0JBRWhDQSxJQUFJQSxNQUFLQTtvQkFDTEEsZ0JBQU1BLEdBQUdBLElBQUtBOzs7a0NBR0RBLEdBQVFBLEdBQU9BLEdBQU9BLE9BQVdBOzs7Z0JBR2xEQSxjQUFTQSxHQUFHQSxHQUFHQTtnQkFDZkEsY0FBU0EsT0FBT0EsR0FBR0E7Z0JBQ25CQSxrQkFBYUEsV0FBV0EsR0FBR0E7OzhCQUdWQSxNQUFXQSxXQUFlQTtnQkFFM0NBLGtCQUFhQSxZQUFZQSxZQUFPQSxhQUFRQSxXQUFXQTs7b0NBRzlCQSxNQUFhQSxHQUFPQSxHQUFPQSxXQUFlQTtnQkFFL0RBLFlBQVlBO2dCQUNaQSxjQUFTQSxHQUFHQSxHQUFHQSxzQkFBY0E7Z0JBQzdCQSxZQUFLQSxNQUFNQSxlQUFPQSxlQUFPQTs7OEJBR1pBLEdBQVVBLEdBQU9BLEdBQU9BLE9BQVdBOztnQkFFaERBLEtBQUtBLFdBQVdBLElBQUlBLFVBQVVBO29CQUUxQkEsZ0JBQVNBLGFBQUVBLElBQUlBLE1BQUlBLFNBQUdBLEdBQUdBLE9BQU9BOzs7NEJBSXZCQSxHQUFxQkEsR0FBT0EsR0FBT0EsT0FBV0E7O2dCQUUzREEsS0FBS0EsV0FBV0EsSUFBSUEsNEJBQW1DQSxZQUFJQTtvQkFFdkRBLGdCQUFTQSw0QkFBdUNBLGFBQUVBLElBQUlBLE1BQUlBLFNBQUdBLEdBQUdBLE9BQU9BOzs7OEJBd0M5REEsR0FBVUEsSUFBUUEsSUFBUUE7Z0JBRXZDQSxNQUFNQSxJQUFJQTs7Z0NBdENPQSxHQUFPQSxHQUFPQSxPQUFXQSxRQUFZQTs7Z0JBR3REQSx1QkFBa0JBLEdBQUdBLE1BQU1BLFFBQVFBO2dCQUNuQ0EsdUJBQWtCQSxRQUFJQSx1QkFBV0EsTUFBTUEsUUFBUUE7Z0JBQy9DQSxzQkFBa0JBLEdBQUdBLEdBQUdBLFVBQVVBO2dCQUNsQ0Esc0JBQWtCQSxHQUFHQSxRQUFJQSx3QkFBWUEsVUFBVUE7O2tDQW1DOUJBLElBQVFBLElBQVFBLElBQVFBLElBQVFBO2dCQUVqREEsTUFBTUEsSUFBSUE7O29DQWxDV0EsR0FBUUEsR0FBT0EsR0FBT0EsT0FBV0EsUUFBWUEsT0FBV0E7O2dCQUU3RUEsS0FBS0EsUUFBUUEsR0FBR0EsSUFBSUEsTUFBSUEsYUFBT0E7b0JBRTNCQSxLQUFLQSxRQUFRQSxHQUFHQSxJQUFJQSxNQUFJQSxjQUFRQTt3QkFFNUJBLGdCQUFTQSxHQUFHQSxHQUFHQSxHQUFHQTs7d0JBRWxCQSxrQkFBYUEsV0FBV0EsR0FBR0E7Ozs7Z0NBS2xCQSxPQUFXQSxHQUFPQTtnQkFFbkNBLElBQUlBLFVBQVNBO29CQUNUQSxvQkFBVUEsR0FBR0EsSUFBS0E7OztvQ0FHREEsT0FBV0EsR0FBT0E7Z0JBRXZDQSxJQUFJQSxVQUFTQTtvQkFFVEEsb0JBQVVBLEdBQUdBLElBQUtBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQ0RoSmFBO2dCQUVuQ0EsT0FBT0EsSUFBSUEsbURBQXVCQSxXQUFXQTs7O2dCQUs3Q0E7Z0JBQ0FBLG1CQUFjQTs7O2dCQUtkQTs7K0JBR2tCQSxHQUFPQTtnQkFFekJBLElBQUlBLGVBQVVBO29CQUVWQSxjQUFTQSxJQUFJQSwrQkFBVUEsR0FBR0E7b0JBQzFCQSxpQkFBWUEsSUFBSUEsK0JBQVVBLEdBQUdBOztnQkFFakNBLG1CQUFjQSxHQUFHQTtnQkFDakJBLHNCQUFpQkEsR0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7b0NBL0hRQSxLQUFJQTtrQ0FDTkEsS0FBSUE7a0NBQ0RBLEtBQUlBO2dDQUV0QkE7Ozs7b0NBRU9BLEdBQUdBO2dCQUVyQkEsb0JBQWVBO2dCQUNmQTtnQkFDQUEsT0FBT0E7OzRCQUdNQSxPQUFXQTtnQkFFeEJBLGlCQUFZQSxJQUFJQSwrQkFBVUEsT0FBT0E7Ozs7Z0JBTWpDQTtnQkFDQUE7Ozs7Z0JBS0FBLEtBQUtBLFdBQVdBLElBQUlBLHlCQUFvQkE7b0JBRXBDQSwwQkFBYUE7b0JBQ2JBLDBCQUFxQkE7Ozs7NEJBRWpCQSxjQUFZQSwwQkFBYUE7Ozs7OztxQkFFN0JBLElBQUlBLDBCQUFhQSxpQkFBaUJBLENBQUNBLDBCQUFhQTt3QkFFNUNBLG9CQUFlQSwwQkFBYUE7d0JBQzVCQSx5QkFBb0JBLDBCQUFhQTt3QkFDakNBOzt3QkFJQUEsc0JBQWlCQSwwQkFBYUE7Ozs7O3FDQU1WQSxHQUFPQTtnQkFFbkNBO2dCQUNBQSxJQUFJQTtvQkFFQUEsS0FBS0Esd0JBQVdBO29CQUNoQkEseUJBQW9CQTs7b0JBSXBCQSxLQUFLQSxJQUFJQTtvQkFDVEEsUUFBVUE7Ozs7Z0JBSWRBLHNCQUFpQkE7Z0JBQ2pCQTtnQkFDQUEsV0FBV0EsR0FBR0E7Z0JBQ2RBO2dCQUNBQSxPQUFPQTs7cUNBR3FCQSxHQUFPQTtnQkFFbkNBLFNBQVNBLG1CQUFjQSxHQUFHQTtnQkFDMUJBO2dCQUNBQSxPQUFPQTs7bUNBR2FBOztnQkFFcEJBLDBCQUFxQkE7Ozs7d0JBRWpCQSxZQUFZQTs7Ozs7Ozs7O2dCQU1oQkEsMEJBQXFCQTs7Ozt3QkFFakJBLElBQUlBLENBQUNBOzRCQUFlQTs7Ozs7OztpQkFFeEJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JFbEVNQSxPQUFPQTs7Ozs7d0JBS1BBLE9BQU9BOzs7Ozt3QkFLUEEsT0FBT0E7Ozs7O3dCQUtQQSxPQUFPQTs7Ozs7Ozs7OztzQ0F0Q29CQSxJQUFJQTtzQ0FDSkEsSUFBSUE7dUNBQ0hBLElBQUlBO3VDQUNKQSxJQUFJQTs7Ozs4Q0F1REFBLGVBQXdCQSxhQUFzQkE7b0JBRXBGQSxPQUFPQSxDQUFDQSw4R0FBZ0JBLENBQUNBLElBQUlBLFNBQVNBLGtFQUFjQTs7K0JBYTdCQSxRQUFpQkE7b0JBRXhDQSxZQUFZQTtvQkFDWkEsWUFBWUE7b0JBQ1pBLE9BQU9BOztpQ0FHWUEsUUFBcUJBLFFBQXFCQTtvQkFFN0RBLGFBQVdBLGFBQVdBO29CQUN0QkEsYUFBV0EsYUFBV0E7O29DQU9HQSxRQUFpQkE7b0JBRTFDQSxTQUFXQSxXQUFXQSxlQUFlQSxXQUFXQTtvQkFDaERBLE9BQU9BLEFBQU9BLFVBQVVBLENBQUNBLEtBQUtBLE1BQU1BLENBQUNBLEtBQUtBOztzQ0FHbEJBLFFBQXFCQSxRQUFxQkE7b0JBRWxFQSxTQUFXQSxhQUFXQSxpQkFBZUEsYUFBV0E7b0JBQ2hEQSxXQUFTQSxBQUFPQSxVQUFVQSxDQUFDQSxLQUFLQSxNQUFNQSxDQUFDQSxLQUFLQTs7MkNBR1pBLFFBQWlCQTtvQkFFakRBLFNBQVdBLFdBQVdBLGVBQWVBLFdBQVdBO29CQUNoREEsT0FBT0EsQ0FBQ0EsS0FBS0EsTUFBTUEsQ0FBQ0EsS0FBS0E7OzZDQUdNQSxRQUFxQkEsUUFBcUJBO29CQUV6RUEsU0FBV0EsYUFBV0EsaUJBQWVBLGFBQVdBO29CQUNoREEsV0FBU0EsQ0FBQ0EsS0FBS0EsTUFBTUEsQ0FBQ0EsS0FBS0E7O2tDQUdEQSxRQUFpQkE7b0JBRTNDQSxZQUFZQTtvQkFDWkEsWUFBWUE7b0JBQ1pBLE9BQU9BOztvQ0FHZUEsUUFBcUJBLFFBQXFCQTtvQkFFaEVBLGFBQVdBLGFBQVdBO29CQUN0QkEsYUFBV0EsYUFBV0E7O29DQUdJQSxRQUFpQkE7b0JBRTNDQSxhQUFlQSxJQUFJQTtvQkFDbkJBLFlBQVlBO29CQUNaQSxZQUFZQTtvQkFDWkEsT0FBT0E7O29DQUdlQSxRQUFxQkEsU0FBZUE7b0JBRTFEQSxhQUFlQSxJQUFJQTtvQkFDbkJBLGFBQVdBLGFBQVdBO29CQUN0QkEsYUFBV0EsYUFBV0E7OytCQUdGQSxRQUFpQkE7b0JBRXJDQSxPQUFPQSxDQUFDQSxXQUFXQSxZQUFZQSxDQUFDQSxXQUFXQTs7aUNBR3hCQSxRQUFxQkEsUUFBcUJBO29CQUU3REEsV0FBU0EsQ0FBQ0EsYUFBV0EsY0FBWUEsQ0FBQ0EsYUFBV0E7O21DQWtCbEJBLFFBQWlCQTtvQkFFNUNBO29CQUNBQSxVQUFZQSxNQUFPQSxDQUFDQSxDQUFDQSxXQUFXQSxZQUFZQSxDQUFDQSxXQUFXQTtvQkFDeERBLFdBQVdBLFdBQVdBLENBQUNBLFdBQVdBO29CQUNsQ0EsV0FBV0EsV0FBV0EsQ0FBQ0EsV0FBV0E7b0JBQ2xDQSxPQUFPQTs7cUNBR2dCQSxRQUFxQkEsUUFBcUJBO29CQUVqRUEsVUFBWUEsTUFBT0EsQ0FBQ0EsQ0FBQ0EsYUFBV0EsY0FBWUEsQ0FBQ0EsYUFBV0E7b0JBQ3hEQSxhQUFXQSxhQUFXQSxDQUFDQSxhQUFXQTtvQkFDbENBLGFBQVdBLGFBQVdBLENBQUNBLGFBQVdBOzsrQkFtQlhBLFFBQWlCQTtvQkFFeENBLE9BQU9BLElBQUlBLHFDQUFTQSxXQUFXQSxXQUFXQSxXQUFXQSxVQUNsQ0EsV0FBV0EsV0FBV0EsV0FBV0E7O2lDQUdqQ0EsUUFBcUJBLFFBQXFCQTtvQkFFN0RBLGFBQVdBLGFBQVdBLGFBQVdBLGFBQVdBO29CQUM1Q0EsYUFBV0EsYUFBV0EsYUFBV0EsYUFBV0E7OytCQUdyQkEsUUFBaUJBO29CQUV4Q0EsT0FBT0EsSUFBSUEscUNBQVNBLFdBQVdBLFdBQVdBLFdBQVdBLFVBQ2xDQSxXQUFXQSxXQUFXQSxXQUFXQTs7aUNBR2pDQSxRQUFxQkEsUUFBcUJBO29CQUU3REEsYUFBV0EsYUFBV0EsYUFBV0EsYUFBV0E7b0JBQzVDQSxhQUFXQSxhQUFXQSxhQUFXQSxhQUFXQTs7b0NBR2hCQSxRQUFpQkE7b0JBRTdDQSxZQUFZQTtvQkFDWkEsWUFBWUE7b0JBQ1pBLE9BQU9BOztzQ0FHcUJBLFFBQWlCQTtvQkFFN0NBLFlBQVlBO29CQUNaQSxZQUFZQTtvQkFDWkEsT0FBT0E7O3NDQUdpQkEsUUFBcUJBLGFBQW1CQTtvQkFFaEVBLGFBQVdBLGFBQVdBO29CQUN0QkEsYUFBV0EsYUFBV0E7O3NDQUdFQSxRQUFxQkEsUUFBcUJBO29CQUVsRUEsYUFBV0EsYUFBV0E7b0JBQ3RCQSxhQUFXQSxhQUFXQTs7a0NBR0lBO29CQUUxQkEsVUFBVUEsQ0FBQ0E7b0JBQ1hBLFVBQVVBLENBQUNBO29CQUNYQSxPQUFPQTs7b0NBR2VBLE9BQW9CQTtvQkFFMUNBLGFBQVdBLENBQUNBO29CQUNaQSxhQUFXQSxDQUFDQTs7cUNBVWlCQTtvQkFFN0JBLFVBQVlBLE1BQU9BLEFBQU9BLFVBQVVBLENBQUNBLFVBQVVBLFdBQVdBLENBQUNBLFVBQVVBO29CQUNyRUEsV0FBV0E7b0JBQ1hBLFdBQVdBO29CQUNYQSxPQUFPQTs7dUNBR2tCQSxPQUFvQkE7b0JBRTdDQSxVQUFZQSxNQUFPQSxBQUFPQSxVQUFVQSxDQUFDQSxZQUFVQSxhQUFXQSxDQUFDQSxZQUFVQTtvQkFDckVBLGFBQVdBLFlBQVVBO29CQUNyQkEsYUFBV0EsWUFBVUE7O29DQUtPQSxRQUFpQkE7b0JBRTdDQSxZQUFZQTtvQkFDWkEsWUFBWUE7b0JBQ1pBLE9BQU9BOztzQ0FHaUJBLFFBQXFCQSxRQUFxQkE7b0JBRWxFQSxhQUFXQSxhQUFXQTtvQkFDdEJBLGFBQVdBLGFBQVdBOzs0Q0FrQlFBO29CQUU5QkEsVUFBVUEsQ0FBQ0E7b0JBQ1hBLFVBQVVBLENBQUNBO29CQUNYQSxPQUFPQTs7dUNBSW9CQSxRQUFpQkE7b0JBRTVDQSxPQUFPQSxhQUFZQSxZQUFZQSxhQUFZQTs7eUNBSWhCQSxRQUFpQkE7b0JBRTVDQSxPQUFPQSxhQUFZQSxZQUFZQSxhQUFZQTs7dUNBSWJBLFFBQWlCQTtvQkFFL0NBLFlBQVlBO29CQUNaQSxZQUFZQTtvQkFDWkEsT0FBT0E7OzBDQUl1QkEsUUFBaUJBO29CQUUvQ0EsWUFBWUE7b0JBQ1pBLFlBQVlBO29CQUNaQSxPQUFPQTs7dUNBSXVCQSxRQUFpQkE7b0JBRS9DQSxZQUFZQTtvQkFDWkEsWUFBWUE7b0JBQ1pBLE9BQU9BOzt5Q0FJdUJBLE9BQWdCQTtvQkFFOUNBLFdBQVdBO29CQUNYQSxXQUFXQTtvQkFDWEEsT0FBT0E7O3lDQUl1QkEsYUFBbUJBO29CQUVqREEsV0FBV0E7b0JBQ1hBLFdBQVdBO29CQUNYQSxPQUFPQTs7dUNBSXVCQSxRQUFpQkE7b0JBRS9DQSxZQUFZQTtvQkFDWkEsWUFBWUE7b0JBQ1pBLE9BQU9BOzt5Q0FJdUJBLFFBQWlCQTtvQkFFL0NBLGFBQWVBLElBQUlBO29CQUNuQkEsWUFBWUE7b0JBQ1pBLFlBQVlBO29CQUNaQSxPQUFPQTs7Ozs7Ozs7Ozs7OEJBclZLQSxHQUFTQTs7Z0JBRXJCQSxTQUFTQTtnQkFDVEEsU0FBU0E7OzhCQUdHQTs7Z0JBRVpBLFNBQVNBO2dCQUNUQSxTQUFTQTs7Ozs7Ozs7Z0JBVVRBLE9BQU9BLElBQUlBLHFDQUFTQSxBQUFPQSxrQkFBV0EsZUFBSUEsQUFBT0Esa0JBQVdBOzs4QkF1RnBDQTtnQkFFeEJBLElBQUlBO29CQUVBQSxPQUFPQSxhQUFPQSxBQUFVQTs7O2dCQUc1QkE7OytCQUdlQTtnQkFFZkEsT0FBT0EsQ0FBQ0EsV0FBS0EsWUFBWUEsQ0FBQ0EsV0FBS0E7OztnQkFxQi9CQSxPQUFPQSxzQ0FBa0JBOzs7Z0JBTXpCQSxPQUFPQSxBQUFPQSxVQUFVQSxDQUFDQSxTQUFJQSxVQUFLQSxDQUFDQSxTQUFJQTs7O2dCQUt2Q0EsT0FBT0EsQ0FBQ0EsU0FBSUEsVUFBS0EsQ0FBQ0EsU0FBSUE7OztnQkFvRXRCQSxVQUFZQSxNQUFPQSxBQUFPQSxVQUFVQSxDQUFDQSxTQUFJQSxVQUFLQSxDQUFDQSxTQUFJQTtnQkFDbkRBLFVBQUtBO2dCQUNMQSxVQUFLQTs7O2dCQXNDTEEscUJBQTZCQTtnQkFDN0JBLE9BQU9BLG1EQUFjQSwwQ0FBbUNBLG1CQUNwREEsa0NBQWdCQSxpQkFBaUJBLGtDQUFnQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQlJsUXZDQSxLQUFJQTsrQkFDSUEsS0FBSUE7Ozs7NkJBRWRBLEdBQUtBLFFBQWtCQTtnQkFFbkNBLGlCQUFZQTtnQkFDWkEsaUJBQVlBLEFBQTBCQTtnQkFDdENBLFNBQVNBOzsrQkFHa0JBO2dCQUUzQkEscUJBQVFBLEdBQUdBLHFCQUFRQTtnQkFDbkJBLHNCQUFpQkE7Z0JBQ2pCQSxzQkFBaUJBOzs7Ozs7Ozs7OzhDU3dQaUJBO29CQUVsQ0EsU0FBU0E7b0JBQ1RBLElBQUlBLFlBQVdBO3dCQUVYQSxLQUFLQTs7b0JBRVRBLElBQUlBLFlBQVdBO3dCQUVYQSxLQUFLQTs7b0JBRVRBLElBQUlBLFlBQVdBO3dCQUVYQSxLQUFLQTs7O29CQUdUQSxPQUFPQTs7OENBRzJCQTtvQkFFbENBLFNBQVNBO29CQUNUQSxJQUFJQSxZQUFXQTt3QkFFWEEsS0FBS0E7O29CQUVUQSxJQUFJQSxZQUFXQTt3QkFFWEEsS0FBS0E7O29CQUVUQSxJQUFJQSxZQUFXQTt3QkFFWEEsS0FBS0E7OztvQkFHVEEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBclZjQSxPQUFPQTs7O29CQUFlQSxhQUFRQTs7Ozs7Ozs7Ozs7d0NBSVRBLEtBQUlBO3dDQUNLQSxBQUF3RUEsVUFBQ0E7d0JBQU9BLFFBQVFBO3dCQUE2QkEsUUFBUUE7d0JBQTZCQSxPQUFPQTtzQkFBbklBLEtBQUlBOzs7NEJBYXJFQTs7OztnQkFHaEJBOzs7Ozs7OztnQkFDQUEscUJBQWdCQSxrQkFBU0E7Z0JBQ3pCQSxLQUFLQSxXQUFXQSxJQUFJQSxvQkFBb0JBO29CQUVwQ0Esc0NBQWNBLEdBQWRBLHVCQUFtQkEscUNBQVlBLEdBQVpBOzs7Z0JBR3ZCQSxtQkFBY0E7O2dCQUVkQSxpQkFBWUEsSUFBSUE7Z0JBQ2hCQSxlQUFVQSxrRkFBdUVBLElBQUlBO2dCQUNyRkE7Z0JBQ0FBLGlCQUFZQTs7OztnQkFJWkEsZ0JBQWdCQSwwRUFBK0RBLElBQUlBOztnQkFFbkZBLHVCQUFrQkEsa0JBQWVBO2dCQUNqQ0EsS0FBS0EsWUFBV0EsS0FBSUEsNkJBQXdCQTtvQkFFeENBLHdDQUFnQkEsSUFBaEJBLHlCQUFxQkE7OztnQkFHekJBLHdDQUFtQ0EsSUFBSUEsOENBQWtCQSxtTkFBaUVBLCtCQUFDQTtvQkFFdkhBLGVBQWVBLGtDQUFxQkE7b0JBQ3BDQSxlQUFlQSxrQ0FBcUJBO29CQUNwQ0EsY0FBZ0VBLEFBQXVEQTtvQkFDdkhBLFNBQWdCQSx1QkFBa0JBOztvQkFFbENBLFVBQVVBO29CQUNWQSxXQUFXQTtvQkFDWEEsV0FBV0EsU0FBU0EsUUFBUUE7b0JBQzVCQSxXQUFhQSxBQUFPQTs7b0JBRXBCQSxtQkFBWUEsWUFBWUEsT0FBT0EsSUFBSUEsMkRBQy9CQSxrQ0FBNkJBLGdDQUM3QkEsa0NBQTZCQTs7O2dCQUdyQ0Esd0NBQW1DQSxJQUFJQSw4Q0FBa0JBLHFOQUF1Q0EsK0JBQUNBO29CQUU3RkEsZUFBZUEsa0NBQXFCQTtvQkFDcENBLFNBQVNBO29CQUNUQSxtQkFBbUJBO29CQUNuQkEscUJBQXFCQSxrQ0FBNkJBO29CQUNsREEsZ0JBQWNBLGtCQUFtQkE7OztnQkFHckNBLHdDQUFtQ0EsSUFBSUEsOENBQWtCQSxvTkFBc0NBLCtCQUFDQTs7b0JBRzVGQSxlQUFlQSxrQ0FBcUJBO29CQUNwQ0EsY0FBZ0VBLEFBQXVEQTtvQkFDdkhBLFNBQWdCQSx1QkFBa0JBO29CQUNsQ0EsVUFBVUE7b0JBQ1ZBLFdBQVdBO29CQUNYQSxJQUFJQSxrQkFBaUJBO3dCQUNqQkEsU0FBU0E7O3dCQUVUQTs7b0JBQ0pBLFdBQVdBLFNBQVNBLFFBQVFBO29CQUM1QkEsV0FBYUEsQUFBT0E7b0JBQ3BCQSxtQkFBWUEsWUFBWUEsT0FBT0EsSUFBSUEsMkRBQy9CQSxrQ0FBNkJBLGVBQzdCQSxrQ0FBNkJBOzs7Z0JBR3JDQSx3Q0FBbUNBLElBQUlBLDhDQUFrQkEsc05BQXdDQSwrQkFBQ0E7b0JBRTlGQSxVQUFVQTtvQkFDVkEsWUFBWUEsa0NBQXFCQTtvQkFDakNBLFFBQVFBO29CQUNSQSxRQUFRQTtvQkFDUkEsVUFBVUE7b0JBQ1ZBLFdBQVdBLElBQUlBLHFDQUFTQSxHQUFHQTtvQkFDM0JBLFdBQVdBLDZDQUFDQSx3REFBTUE7O29CQUVsQkEsU0FBU0Esd0NBQWdCQSxLQUFoQkE7O29CQUVUQSxtQkFBWUEsa0JBQW1CQSxJQUFJQSwyREFDL0JBLGtDQUE2QkEsNkJBQzdCQSxrQ0FBNkJBOzs7Z0JBR3JDQSxpQkFBWUEsQUFBK0RBLFVBQUNBO3dCQUFPQSxRQUFRQTt3QkFBcUNBLFFBQVFBO3dCQUFvQ0EsUUFBUUE7d0JBQXdDQSxRQUFRQTt3QkFBMkNBLFFBQVFBO3dCQUEwQ0EsUUFBUUE7d0JBQXVDQSxRQUFRQTt3QkFBeUNBLFFBQVFBO3dCQUF5Q0EsUUFBUUE7d0JBQTBDQSxPQUFPQTtzQkFBamVBLEtBQUlBOztnQkFFOUNBLHdCQUFtQkEsQUFBK0RBLFVBQUNBO3dCQUFPQSxRQUFRQTt3QkFBMkNBLFFBQVFBO3dCQUE2Q0EsUUFBUUE7d0JBQW1EQSxRQUFRQTt3QkFBNkNBLFFBQVFBO3dCQUEwQ0EsUUFBUUE7d0JBQXVDQSxRQUFRQTt3QkFBeUNBLFFBQVFBO3dCQUF5Q0EsT0FBT0E7c0JBQTNjQSxLQUFJQTs7Z0JBRXJEQSxtQkFBY0EsQUFBOERBLFVBQUNBO3dCQUFPQSxRQUFRQSxJQUFJQSx5Q0FBTUEsNENBQWdCQTt3QkFBNENBLFFBQVFBLElBQUlBLHlDQUFNQSw0Q0FBZ0JBO3dCQUFzQ0EsUUFBUUEsSUFBSUEseUNBQU1BLDRDQUFnQkE7d0JBQXFDQSxRQUFRQSxJQUFJQSx5Q0FBTUEsNENBQWdCQTt3QkFBeUNBLFFBQVFBLElBQUlBLHlDQUFNQSw0Q0FBZ0JBO3dCQUEyQ0EsUUFBUUEsSUFBSUEseUNBQU1BLDRDQUFnQkE7d0JBQXdDQSxRQUFRQSxJQUFJQSx5Q0FBTUEsNENBQWdCQTt3QkFBMENBLFFBQVFBLElBQUlBLHlDQUFNQSw0Q0FBZ0JBO3dCQUEwQ0EsUUFBUUEsSUFBSUEseUNBQU1BLGtEQUFzQkE7d0JBQStCQSxRQUFRQSxJQUFJQSx5Q0FBTUEsa0RBQXNCQTt3QkFBMkJBLE9BQU9BO3NCQUFoeEJBLEtBQUlBOztnQkFFaERBLGdCQUFXQSxBQUFnRUEsVUFBQ0E7d0JBQU9BLFFBQVFBLElBQUlBLHlDQUFNQSw0Q0FBZ0JBLHFOQUFvQ0E7d0JBQWtCQSxRQUFRQSxJQUFJQSx5Q0FBTUEsNENBQWdCQSxpTkFBZ0NBO3dCQUFjQSxRQUFRQSxJQUFJQSx5Q0FBTUEsNENBQWdCQSxrTkFBaUNBO3dCQUFlQSxRQUFRQSxJQUFJQSx5Q0FBTUEsNENBQWdCQSx3TkFBdUNBO3dCQUFxQkEsUUFBUUEsSUFBSUEseUNBQU1BLDRDQUFnQkEsdU5BQXNDQTt3QkFBZ0JBLFFBQVFBLElBQUlBLHlDQUFNQSw0Q0FBZ0JBLG9OQUFtQ0E7d0JBQWFBLFFBQVFBLElBQUlBLHlDQUFNQSw0Q0FBZ0JBLHNOQUFxQ0E7d0JBQWVBLFFBQVFBLElBQUlBLHlDQUFNQSw0Q0FBZ0JBLHNOQUFxQ0E7d0JBQWVBLFFBQVFBLElBQUlBLHlDQUFNQSxrREFBc0JBLGlMQUFzQkE7d0JBQWVBLFFBQVFBLElBQUlBLHlDQUFNQSxrREFBc0JBLGlMQUFzQkE7d0JBQWVBLE9BQU9BO3NCQUF6M0JBLEtBQUlBOzs7Ozs7eUNBS1pBO2dCQUVqQ0EsU0FBU0E7Z0JBQ1RBLG1CQUFtQkE7Z0JBQ25CQSxtQkFBbUJBLDREQUFtQkE7Z0JBQ3RDQSx1QkFBdUJBO2dCQUN2QkEsT0FBT0E7OzRCQUdNQTs7O2dCQUdiQSxZQUFpQkEsQUFBVUE7Ozs7Ozs7Z0JBTzNCQSxJQUFJQTtvQkFFQUEsUUFBUUE7d0JBRUpBLEtBQUtBOzRCQUNEQTs0QkFDQUE7d0JBQ0pBLEtBQUtBOzRCQUNEQTs0QkFDQUE7d0JBQ0pBLEtBQUtBOzRCQUNEQSwwQkFBcUJBOzs7O29DQUVqQkEsSUFBSUEsZUFBY0E7O3dDQUdkQSwyQkFBc0JBOzs7Ozs7OzZCQUc5QkE7d0JBQ0pBLEtBQUtBOzs0QkFFREE7NEJBQ0FBO3dCQUNKQTs0QkFFSUE7Ozs7Z0JBSVpBLGtCQUFhQTs7O29DQUlRQTtnQkFFckJBLHdCQUFtQkE7O2dCQUVuQkE7O2dCQUVBQTtnQkFDQUE7Z0JBQ0FBO2dCQUNBQSxvQkFBb0JBO2dCQUNwQkE7Z0JBQ0FBLEtBQUtBLFdBQVdBLElBQUlBLGtCQUFJQSxpQkFBV0E7b0JBRS9CQSxLQUFLQSxXQUFXQSxJQUFJQSxrQkFBSUEsaUJBQVdBO3dCQUUvQkEsSUFBSUE7NEJBRUFBLDhCQUVBQSxxQkFBY0EsU0FDZEEscUJBQWNBLFNBQUdBOzRCQUNqQkEsOEJBRUlBLHVCQUFjQSxVQUFJQSxxQkFDbEJBLHFCQUFjQSxTQUFHQTs7d0JBRXpCQSxJQUFJQSxJQUFJQSx3QkFBa0JBLElBQUlBOzs0QkFHMUJBLHdCQUFtQkEsUUFBSUEseUJBQWNBLHFCQUFlQSxNQUFJQSx3QkFBYUEsNEJBQWVBLDRCQUFlQTs0QkFDbkdBLHdCQUFtQkEsTUFBSUEsd0JBQWFBLE1BQUlBLHdCQUFhQSw0QkFBZUEsNEJBQWVBOzs7Ozs7Ozs7Ozs7Ozs7Z0JBZS9GQSxLQUFLQSxZQUFXQSxLQUFJQSxpQ0FBNEJBOztvQkFHNUNBLGlCQUE0Q0Esa0NBQXFCQTs7b0JBRWpFQSxTQUFTQSxhQUFRQTtvQkFDakJBLElBQUlBO3dCQUVBQSxLQUFLQSxZQUFXQSxLQUFJQSxXQUFXQTs0QkFFM0JBLHNCQUFHQSxJQUFIQSxPQUFRQTs7O29CQUdoQkEsVUFBVUE7b0JBQ1ZBLGdCQUFxQkEsa0NBQTZCQTtvQkFDbERBLElBQUlBLG9CQUFtQkE7d0JBRW5CQSxjQUFjQTt3QkFDZEEsY0FBY0E7OztvQkFHbEJBLElBQUlBLG9GQUFnQkEsSUFBaEJBLGlEQUFzQ0EsdUJBQWFBO3dCQUVuREEsbUJBQVlBLHdDQUFnQkEsSUFBaEJBLHVDQUFvQ0EsSUFBSUEsMkRBQStCQSx3Q0FBZ0JBLElBQWhCQSxpREFBb0NBOzs7b0JBRzNIQSxRQUFRQTtvQkFDUkEsSUFBSUEsb0JBQW1CQTt3QkFBZ0VBLElBQUlBOztvQkFDM0ZBLElBQUlBLG9CQUFtQkE7d0JBQWlFQSxJQUFJQTs7b0JBQzVGQSxJQUFJQTt3QkFDQUEsSUFBSUE7O29CQUNSQSxTQUFTQTs7b0JBRVRBLElBQUlBO3dCQUVBQSxjQUFnRUE7d0JBQ2hFQSxLQUFLQSw0REFBbUJBOzs7b0JBRzVCQSx3Q0FBZ0JBLElBQWhCQSxtQ0FBK0JBLFVBQVVBLEdBQUdBOzs7Ozs7Ozs7Ozs7O2dCQWFoREEsc0JBQXNCQSxrQkFBSUE7OztvQkFHdEJBO29CQUNBQSxRQUFRQSxtQkFBSUE7O29CQUVaQSxJQUFJQSx1Q0FBaUNBO3dCQUVqQ0Esa0JBQWFBLEdBQUdBO3dCQUNoQkEsSUFBSUE7NEJBRUFBLFlBQWNBLGdDQUEyQkE7NEJBQ3pDQSxnQ0FBNEJBLEdBQUdBLGdCQUFNQSxrQkFBS0EsQUFBQ0EsZ0JBQWNBLHVEQUFjQTs7O3dCQUszRUEsZ0NBQTRCQSxlQUFPQSx1QkFBZUE7Ozs7Z0JBSTFEQSxpQkFBaUJBLG1CQUFJQTtnQkFDckJBOztnQkFFQUEsbUJBQWNBLFlBQVlBO2dCQUMxQkE7OztnQkFHQUE7Z0JBQ0FBOzs7Z0JBR0FBO2dCQUNBQSwyQkFBc0JBO2dCQUN0QkEsSUFBSUE7b0JBQ0FBOzs7b0RBeUNxQ0E7Z0JBRXpDQSxRQUFRQTtnQkFDUkEsUUFBUUE7Z0JBQ1JBLGdCQUFnQkEsSUFBSUEscUNBQVNBLElBQUlBLGlCQUFZQSw0Q0FBZ0JBLGtCQUFhQSxrQkFBSUEsa0JBQVlBLElBQUlBLGlCQUFZQSw0Q0FBZ0JBO2dCQUMxSEEsT0FBT0E7O29DQUdlQSxHQUFPQTtnQkFFN0JBLHdCQUFtQkEsZUFBT0EsdUJBQWVBO2dCQUN6Q0EsMkJBQXNCQSxHQUFHQTtnQkFDekJBLHlDQUFrQ0E7O2dCQUVsQ0EsS0FBS0EsV0FBV0EsSUFBSUEsK0JBQTBCQTtvQkFFMUNBLFNBQVNBO29CQUNUQSxTQUFTQSxpQkFBUUE7b0JBQ2pCQSxZQUFZQSxnQ0FBbUJBO29CQUMvQkE7b0JBQ0FBLElBQUlBLDZCQUF3QkEsT0FBV0E7O3dCQUtuQ0E7OztvQkFHSkEsa0JBQWtCQTs7b0JBRWxCQSw4QkFBd0JBLGdCQUFRQSxJQUFJQTtvQkFDcENBLDhCQUF3QkEsT0FBS0EsbUJBQWFBLElBQUlBOzs7O29CQUk5Q0Esc0JBQWVBLGNBQVlBLElBQUlBLElBQUlBO29CQUNuQ0Esd0JBQXFCQTtvQkFDckJBLElBQUlBLGVBQWNBO3dCQUVkQSxRQUEyREEsQUFBd0RBO3dCQUNuSEEsa0NBQTZCQSx1SkFBT0E7d0JBQ3BDQSxJQUFJQSxpQkFBZUE7NEJBRWZBLGdCQUFjQTs7OztvQkFJdEJBLElBQUlBLGVBQWNBO3dCQUVkQSxXQUF1QkEsQUFBaUJBO3dCQUN4Q0EsZ0JBQWNBLDBCQUFpQkE7O29CQUVuQ0Esc0JBQWVBLGVBQWFBLG1CQUFTQSxtQkFBYUEsSUFBSUE7Ozs7Ozs7Z0NBUXhDQSxZQUFnQkE7Z0JBRWxDQSx3QkFBbUJBLHdCQUFnQkEsK0JBQXVCQTtnQkFDMURBLDJCQUFzQkEsd0JBQWNBO2dCQUNwQ0EscUNBQThCQTtnQkFDOUJBLDJCQUFzQkEsd0JBQWNBO2dCQUNwQ0Esd0NBQWlDQTtnQkFDakNBLFlBQVlBO2dCQUNaQSxLQUFLQSxXQUFXQSxJQUFJQSxpQ0FBNEJBO29CQUU1Q0E7b0JBQ0FBLFFBQW1DQSxrQ0FBcUJBO29CQUN4REEsSUFBSUEsQ0FBQ0E7d0JBRURBO3dCQUNBQTs7b0JBRUpBLElBQUlBLENBQUNBO3dCQUVEQSxZQUFZQTt3QkFDWkEsSUFBSUEsV0FBVUE7NEJBRVZBLFFBQVFBOzs7d0JBR1pBLFdBQVdBO3dCQUNYQSxXQUFXQSwwQkFBaUJBO3dCQUM1QkEsb0JBQWVBLGFBQVFBLElBQUlBLE1BQU1BLE1BQU1BOzt3QkFFdkNBLDRCQUF1QkEsa0JBQUtBLGFBQVlBLGtCQUFVQSxNQUFNQTt3QkFDeERBLGNBQWlCQTt3QkFDakJBLFFBQVFBOzRCQUVKQSxLQUFLQTtnQ0FDREE7Z0NBQ0FBOzRCQUNKQSxLQUFLQTtnQ0FDREE7Z0NBQ0FBOzRCQUNKQSxLQUFLQTtnQ0FDREE7Z0NBQ0FBOzRCQUNKQSxLQUFLQTtnQ0FDREE7NEJBQ0pBO2dDQUNJQTs7d0JBRVJBLGFBQWFBLDREQUFtQkE7O3dCQUVoQ0Esc0JBQWVBLFNBQVNBLGtCQUFTQSxNQUFNQTs7Ozs7Ozs7cUNBU3hCQSxZQUFnQkE7Z0JBRXZDQSxvQkFBc0JBO2dCQUN0QkEsd0JBQW1CQSx3QkFBZ0JBLDRCQUFvQkEsTUFBSUEsb0VBQWVBO2dCQUMxRUEsMkJBQXNCQSxZQUFZQTtnQkFDbENBLDJDQUFvQ0E7O2dCQUVwQ0EsS0FBS0EsV0FBV0EsSUFBSUEsaUNBQTRCQTtvQkFFNUNBLFFBQW1DQSxrQ0FBcUJBO29CQUN4REEsSUFBSUEsQ0FBQ0E7d0JBRURBOztvQkFFSkEsSUFBSUEsQ0FBQ0E7d0JBRURBLFlBQVlBO3dCQUNaQSxJQUFJQSxXQUFVQTs0QkFFVkEsUUFBUUE7Ozs7d0JBSVpBLFdBQVdBLDBCQUFpQkE7d0JBQzVCQSxvQkFBZUEsYUFBUUEsSUFBSUEsTUFBTUEsd0JBQWdCQTt3QkFDakRBLDJCQUFzQkEsTUFBTUE7O3dCQUU1QkEsS0FBS0EsWUFBWUEsS0FBS0EsOERBQWVBOzRCQUVqQ0EsYUFBYUE7NEJBQ2JBLElBQUlBLE1BQUtBLDZDQUF3Q0EsT0FBTUEsb0ZBQWdDQSx1Q0FBaUNBO2dDQUVwSEEsU0FBU0E7Ozs0QkFHYkEsSUFBSUEsS0FBS0EsZ0VBQWlCQSwyRUFBUUEsSUFBUkEsV0FBZUE7Z0NBRXJDQSxRQUFXQSxtQkFBY0EsR0FBR0E7Z0NBQzVCQSw2QkFBc0JBLEdBQUdBOzs7O2dDQU16QkEsaUNBQTJCQTs7NEJBRS9CQSw2QkFBMkJBOzs7Ozs7OztxQ0FTZEEsR0FBa0NBOzs7Z0JBSTNEQSxVQUFZQSwyQkFBUUEsSUFBUkE7Z0JBQ1pBLElBQUlBO29CQUNBQSxPQUFPQSxtQkFBVUEsNkJBQTRCQTs7b0JBRTdDQTs7OytCQUdjQTtnQkFFbEJBLE9BQU9BLHNDQUFjQSxvQkFBZEE7Ozs7Ozs7Ozs7Ozs7O2tDQWVXQSxNQUFZQTtnQkFFOUJBLElBQUlBO29CQUVBQSxRQUErQkEsa0JBQTRCQTtvQkFDM0RBLGNBQVNBLEdBQUdBOztvQkFJWkE7Ozs7Z0NBS2NBLE1BQWlDQTtnQkFFbkRBLFFBQVFBLG1CQUFVQTtnQkFDbEJBLDZCQUFzQkEsR0FBR0E7OztnQkFLekJBLE9BQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNoaEI4Q0E7OztvQkFBaENBLDhEQUFpQkE7Ozs7Ozs7Ozs7O21DQXJDdEJBO2tDQUNEQTs7OztnQkFJZkEsMkJBQXNCQSxJQUFJQTtnQkFDMUJBO2dCQUNBQSxnQkFBV0E7Ozs7OztnQkFNWEEsV0FBV0E7Z0JBQ1hBLGlCQUFrQkE7O2dCQUVsQkEsbUJBQWNBLElBQUlBLDhDQUFrQkE7Z0JBQ3BDQSxRQUFRQTs7Z0JBRVJBLElBQUlBLEtBQUtBO29CQUFvQkEsSUFBSUE7OztnQkFFakNBLGVBQWVBLG9DQUFZQSxHQUFaQTtnQkFDZkEsNkJBQXdCQSxJQUFJQSxxREFBbURBLFVBQXpCQSxtQ0FBV0EsR0FBWEE7Z0JBQ3REQSxtQkFBcUJBO2dCQUNyQkEsSUFBSUE7b0JBRUFBLGVBQWVBLENBQUNBLE1BQUtBLG1DQUFXQSxHQUFYQSxxQkFBaUJBOztnQkFFMUNBLG1DQUE4QkE7Z0JBQzlCQTtnQkFDQUEsb0JBQWVBLElBQUlBLHlDQUFhQTtnQkFDaENBLGdCQUFXQTtnQkFDWEEsb0JBQWVBLElBQUlBO2dCQUNuQkEsaUNBQTRCQTs7OzRCQU1mQTtnQkFFYkEsMkRBQWNBO2dCQUNkQSxJQUFJQSxzQ0FBWUE7b0JBRVpBLElBQUlBO3dCQUVBQSxJQUFJQTs0QkFFQUE7O3dCQUVKQTt3QkFDQUEsZ0JBQVdBOzs7Z0JBR25CQSxJQUFJQSxzQ0FBWUE7b0JBRVpBLElBQUlBO3dCQUVBQTs7O2dCQUdSQSxJQUFJQSxzQ0FBWUE7b0JBQ1pBLElBQUlBO3dCQUVBQTs7Ozs7O2dCQVFSQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQzFFUEEsaUJBQVlBLElBQUlBO2dCQUNoQkE7Ozs7O2dCQVFBQTs7NEJBR2FBO2dCQUViQSxJQUFJQTtvQkFFQUE7O2dCQUVKQSxjQUFpQkE7Z0JBQ2pCQSxJQUFJQTtvQkFBMEJBLFVBQVVBOztnQkFDeENBLHNDQUFpQ0EsU0FBU0E7OztnQkFLMUNBLE9BQU9BOzs7Ozs7Ozs7Ozs7Z0NMbUlrQkEsS0FBSUE7Ozs7O2dCQUc3QkEsa0JBQWtCQTs7NkJBR05BLFVBQW1CQTtnQkFFL0JBLFNBQVNBO2dCQUNUQSxrQkFBYUE7OzhCQUdXQSxRQUFtQkEsT0FBV0EsVUFBZ0JBO2dCQUV0RUEsY0FBT0EsUUFBUUEsc0JBQVNBLFFBQVFBLFVBQVVBOztnQ0FHbkJBLFFBQW1CQSxVQUFZQSxVQUFnQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JNM0t0RUEsaUJBQVlBLElBQUlBO2dCQUNoQkE7Ozs7O2dCQVdBQTs7NEJBR2FBO2dCQUViQTtnQkFDQUEsU0FBdURBLEFBQW9EQTtnQkFDM0dBLFlBQU9BO2dCQUNQQSxtRUFBNERBO2dCQUM1REEsMERBQW1EQTtnQkFDbkRBLElBQUlBO29CQUVBQSxRQUFRQTt3QkFHSkEsS0FBS0E7NEJBQ0RBOzRCQUNBQTs0QkFDQUE7d0JBQ0pBLEtBQUtBOzRCQUNEQTs0QkFDQUE7NEJBQ0FBO3dCQUNKQSxLQUFLQTs0QkFDREE7NEJBQ0FBOzRCQUNBQTt3QkFDSkEsS0FBS0E7NEJBQ0RBOzRCQUNBQTs0QkFDQUE7d0JBQ0pBOzRCQUNJQTs7b0JBRVJBLHFEQUFnREE7b0JBQ2hEQSx1REFBa0RBO29CQUNsREEsaUVBQTREQTtvQkFDNURBLG1FQUE4REE7O2dCQUVsRUEsSUFBSUE7b0JBRUFBLElBQUlBLE9BQU1BO3dCQUVOQTs7O29CQUdKQSxJQUFJQSxPQUFNQTt3QkFFTkE7O29CQUVKQSx3REFBbURBLDZEQUFnRUE7b0JBQ25IQSwrRkFBMEZBLDZEQUFnRUE7b0JBQzFKQSxrRUFBNkRBO29CQUM3REEsa0dBQTZGQTtvQkFDN0ZBLGtFQUE2REE7b0JBQzdEQSxxREFBZ0RBOzs7O2dCQUlwREEsSUFBSUE7b0JBRUFBOzs7Ozs7Ozs7OztnQkFhSkEsT0FBT0E7Ozs7Ozs7OztxQ0NoRDJCQSxXQUFlQTtvQkFFN0NBLE9BQU9BLElBQUlBLGdEQUFVQSw2Q0FBd0JBLFdBQVdBLDhDQUF5QkEsZUFBZUE7O2dDQUd2RUEsR0FBUUE7b0JBRWpDQSxPQUFPQSxJQUFJQSxnREFBVUEsR0FBR0EsOENBQXlCQSw4Q0FBeUJBLGVBQWVBOzs7Ozs7Ozs7Ozs7OzhCQWhCNUVBLE1BQVdBLFdBQWVBLFdBQWVBLGlCQUF1QkE7O2dCQUU3RUEsWUFBWUE7Z0JBQ1pBLGlCQUFpQkE7Z0JBQ2pCQSxpQkFBaUJBO2dCQUNqQkEsdUJBQXVCQTtnQkFDdkJBLHFCQUFxQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkNuQkhBLFdBQWVBOztnQkFFakNBLGlCQUFpQkE7Z0JBQ2pCQSxlQUFlQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QlI0SENBLGVBQXdCQSxhQUFzQkE7Ozs7Z0JBRTlEQSxxQkFBcUJBO2dCQUNyQkEsbUJBQW1CQTtnQkFDbkJBLGlCQUFpQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQ081SkdBLFFBQW1CQSxVQUFvQkEsVUFBZ0JBO2dCQUUvRUEsNkdBQVlBLFFBQVFBLFVBQVVBLFVBQVVBO2dCQUN4Q0EsVUFBWUE7Z0JBQ1pBO2dCQUNBQTtvQkFFSUEsSUFBSUE7d0JBRUFBLE9BQU9BOzt3QkFJUEEsT0FBT0E7O29CQUVYQSxJQUFJQTt3QkFFQUE7O3dCQUlBQSxRQUFRQSxDQUFDQTs7O2dCQUdqQkEsSUFBSUEsQ0FBQ0E7b0JBRURBLHdCQUF3QkEsZUFBZUEsb0JBQW9CQTs7Ozs7Ozs7O2dDQy9CdkNBLFFBQW1CQSxVQUF5QkEsVUFBZ0JBO2dCQUVwRkEsNEhBQVlBLFFBQVFBLFVBQVVBLFVBQVVBO2dCQUN4Q0EsWUFBY0EsV0FBV0E7Z0JBQ3pCQSxpQkFBbUJBLG9CQUFtQkE7Z0JBQ3RDQSxLQUFLQSxRQUFRQSxvQkFBb0JBLElBQUlBLGtCQUFrQkE7b0JBRW5EQSxlQUFlQTtvQkFDZkE7b0JBQ0FBLFNBQVNBO29CQUNUQSxPQUFPQSxZQUFZQTt3QkFFZkE7d0JBQ0FBLHVCQUFZQTs7b0JBRWhCQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxhQUFhQSxTQUFTQTt3QkFFNUJBLGdCQUFpQkEsVUFBVUE7Ozs7Ozs7Ozs7OztnQ1I2SFhBLFFBQW1CQSxVQUF1QkEsVUFBZ0JBO2dCQUVsRkEsd0hBQVlBLFFBQVFBLFVBQVVBLFVBQVVBO2dCQUN4Q0EsYUFBbUJBO2dCQUNuQkEsSUFBSUE7b0JBQ0FBLFNBQVNBOztnQkFDYkEsa0JBQWtCQSxpREFBNEJBLGlDQUF3QkEsK0JBQXNCQSxXQUFXQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xyXG51c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQ7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG4vL3VzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZDtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2VCdWlsZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50IGJ1ZmZlcjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBib29sIGJ1ZmZlck9uO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBzdGF0aWMgSFRNTFByZUVsZW1lbnQgdGV4dDtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBHYW1lTWFpbiBncjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBUZXh0Qm9hcmQgVGV4dEJvYXJkO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBzdGF0aWMgU3RyaW5nQnVpbGRlciBzYjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBzdHJpbmdbXSBjb2xvcnM7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgU2V0dXBHYW1lKG91dCBHYW1lTWFpbiBnciwgb3V0IFRleHRCb2FyZCBUZXh0Qm9hcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBSYW5kb20gcm5kID0gbmV3IFJhbmRvbSgpO1xyXG4gICAgICAgICAgICBSYW5kb21TdXBwbGllci5HZW5lcmF0ZSA9ICgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoZmxvYXQpcm5kLk5leHREb3VibGUoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZ3IgPSBuZXcgR2FtZU1haW4oKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkID0gZ3IuR2V0Qm9hcmQoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJHYW1lIFN0YXJ0XCIpO1xyXG4gICAgICAgICAgICBTZXR1cEdhbWUob3V0IGdyLCBvdXQgVGV4dEJvYXJkKTtcclxuICAgICAgICAgICAgY29sb3JzID0gbmV3IHN0cmluZ1syMF07XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgY29sb3JzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbG9yc1tpXSA9IFwiIzFmMjAyNlwiO1xyXG4gICAgICAgICAgICAgICAgY29sb3JzW2ldID0gQ29sb3JTdHVmZi5jb2xvcnNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLkJvYXJkXSA9IFwiIzcwNTM3M1wiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tDb2xvcnMuSGVyb10gICAgICA9IFwiIzdlZTVkYVwiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tDb2xvcnMuR3JpZEhlcm9dICA9IFwiIzJkNGViM1wiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tDb2xvcnMuR3JpZEVuZW15XSA9IFwiIzczMmU1Y1wiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tDb2xvcnMuRW5lbXldID0gXCIjZTVjMTdlXCI7XHJcblxyXG4gICAgICAgICAgICAvL2NvbG9yc1tDb2xvcnMuaW5wdXRLZXldID0gXCIjYzJjYzUyXCI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0NvbG9ycy5XaW5kb3dMYWJlbF0gPSBcIiM3MDUzNzNcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLkhlcm9UdXJuXSA9IGNvbG9yc1tDb2xvcnMuSGVyb107XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0NvbG9ycy5FbmVteVR1cm5dID0gY29sb3JzW0NvbG9ycy5FbmVteV07XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgdmFyIHN0eWxlID0gbmV3IEhUTUxTdHlsZUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgc3R5bGUuSW5uZXJIVE1MID0gXCJodG1sLGJvZHkge2ZvbnQtZmFtaWx5OiBDb3VyaWVyOyBiYWNrZ3JvdW5kLWNvbG9yOiMxZjI1MjY7IGhlaWdodDogMTAwJTt9XCIgKyBcIlxcbiAjY2FudmFzLWNvbnRhaW5lciB7d2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsgdGV4dC1hbGlnbjpjZW50ZXI7IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IH0gXCI7XHJcbiAgICAgICAgICAgIERvY3VtZW50LkhlYWQuQXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG4gICAgICAgICAgICBidWZmZXIgPSA5O1xyXG4gICAgICAgICAgICBidWZmZXJPbiA9IGZhbHNlOyBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIERvY3VtZW50Lk9uS2V5UHJlc3MgKz0gKEtleWJvYXJkRXZlbnQgYSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpbnQgdW5pY29kZSA9IGEuS2V5Q29kZTtcclxuICAgICAgICAgICAgICAgIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkgaWsgPSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5Lk5PTkU7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHVuaWNvZGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGlrID0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5ET05FO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdmJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWsgPSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LkZJUkU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2cnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpayA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuTk9STUFMU0hPVDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlrID0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5JQ0U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3QnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpayA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuVEhVTkRFUjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndyc6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzODpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWsgPSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LlVQO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdhJzpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpayA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuTEVGVDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncyc6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0MDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWsgPSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LkRPV047XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzk6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlrID0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5SSUdIVDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlrID0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5SRURPO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9idWZmZXIgPSBhLkNoYXJDb2RlO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyID0gKGludClpaztcclxuICAgICAgICAgICAgICAgIGJ1ZmZlck9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFVwZGF0ZUdhbWUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFmdGVyIGJ1aWxkaW5nIChDdHJsICsgU2hpZnQgKyBCKSB0aGlzIHByb2plY3QsIFxyXG4gICAgICAgICAgICAvLyBicm93c2UgdG8gdGhlIC9iaW4vRGVidWcgb3IgL2Jpbi9SZWxlYXNlIGZvbGRlci5cclxuXHJcbiAgICAgICAgICAgIC8vIEEgbmV3IGJyaWRnZS8gZm9sZGVyIGhhcyBiZWVuIGNyZWF0ZWQgYW5kXHJcbiAgICAgICAgICAgIC8vIGNvbnRhaW5zIHlvdXIgcHJvamVjdHMgSmF2YVNjcmlwdCBmaWxlcy4gXHJcblxyXG4gICAgICAgICAgICAvLyBPcGVuIHRoZSBicmlkZ2UvaW5kZXguaHRtbCBmaWxlIGluIGEgYnJvd3NlciBieVxyXG4gICAgICAgICAgICAvLyBSaWdodC1DbGljayA+IE9wZW4gV2l0aC4uLiwgdGhlbiBjaG9vc2UgYVxyXG4gICAgICAgICAgICAvLyB3ZWIgYnJvd3NlciBmcm9tIHRoZSBsaXN0XHJcblxyXG4gICAgICAgICAgICAvLyBUaGlzIGFwcGxpY2F0aW9uIHdpbGwgdGhlbiBydW4gaW4gYSBicm93c2VyLlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBVcGRhdGVHYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZCA9IGdyLkdldEJvYXJkKCk7XHJcbiAgICAgICAgICAgIGdyLkRyYXcoMC4wMzNmKTtcclxuICAgICAgICAgICAgaWYgKGJ1ZmZlck9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBnci5JbnB1dCA9IChjaGFyKWJ1ZmZlcjtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlck9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBnci5JbnB1dCA9IENoYXIuTWluVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgU2NyaXB0LkNhbGwoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBUZXh0Qm9hcmQuSGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgVGV4dEJvYXJkLldpZHRoOyBpKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgU2NyaXB0LkNhbGwoXCJkcmF3XCIsIGksIGosY29sb3JzW1RleHRCb2FyZC5UZXh0Q29sb3JbaSxqXV0sIGNvbG9yc1tUZXh0Qm9hcmQuQmFja0NvbG9yW2ksal1dLCBcIlwiK1RleHRCb2FyZC5DaGFyQXQoaSwgaikpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc2IuQXBwZW5kKFRleHRCb2FyZC5DaGFyQXQoaSwgaikpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGUoXCIuLi5cIik7XHJcbiAgICAgICAgICAgIC8vdGV4dC5Jbm5lckhUTUwgPSBzYi5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICBXaW5kb3cuU2V0VGltZW91dCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uKVVwZGF0ZUdhbWUsIDMzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucztcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFzeW5jVGFza3NcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEFzeW5jVHJhY2tcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIERlbGF5ZWRBY3Rpb25zXHJcbiAgICB7XHJcbiAgICAgICAgTGlzdDxmbG9hdD4gdGltZXMgPSBuZXcgTGlzdDxmbG9hdD4oKTtcclxuICAgICAgICBMaXN0PElMaXN0PiBsaXN0cyA9IG5ldyBMaXN0PElMaXN0PigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoZmxvYXQgZGVsdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRpbWVzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpbWVzW2ldIC09IGRlbHRhO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbWVzW2ldIDw9IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRXhlY3V0ZShpKTtcclxuICAgICAgICAgICAgICAgICAgICBFbmRUYXNrKGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBhYnN0cmFjdCB2b2lkIEV4ZWN1dGUoaW50IGkpO1xyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEFkZChmbG9hdCB0aW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGltZXMuQWRkKHRpbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSXNEb25lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aW1lcy5Db3VudCA9PSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBFbmRUYXNrKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGltZXMuUmVtb3ZlQXQoaSk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBsIGluIGxpc3RzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsLlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBc3luY1Rhc2tTZXR0ZXI8VD4gOiBEZWxheWVkQWN0aW9uc1xyXG4gICAge1xyXG4gICAgICAgIExpc3Q8VD4gVG9WYWx1ZSA9IG5ldyBMaXN0PFQ+KCk7XHJcbiAgICAgICAgTGlzdDxBY3Rpb248VD4+IHNldHRlcnMgPSBuZXcgTGlzdDxBY3Rpb248VD4+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZChUIGUsIEFjdGlvbjxUPiBzZXR0ZXIsIGZsb2F0IHRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUb1ZhbHVlLkFkZChlKTtcclxuICAgICAgICAgICAgc2V0dGVycy5BZGQoKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxUPilzZXR0ZXIpO1xyXG4gICAgICAgICAgICBiYXNlLkFkZCh0aW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIG92ZXJyaWRlIHZvaWQgRXhlY3V0ZShpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNldHRlcnNbaV0oVG9WYWx1ZVtpXSk7XHJcbiAgICAgICAgICAgIFRvVmFsdWUuUmVtb3ZlQXQoaSk7XHJcbiAgICAgICAgICAgIHNldHRlcnMuUmVtb3ZlQXQoaSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuSGFwcHM7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuXHJcblxyXG4gICAgcHVibGljIGNsYXNzIFR1cm5CYXNlVHJ5VmFsdWVzXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8QmF0dGxlRW50aXR5PiBlbnRpdGllcyA9IG5ldyBMaXN0PEJhdHRsZUVudGl0eT4oKTtcclxuICAgICAgICBwdWJsaWMgQmF0dGxlU3RhdGUgYmF0dGxlU3RhdGUgPSBuZXcgQmF0dGxlU3RhdGUoKTtcclxuICAgICAgICBwdWJsaWMgSGFwcE1hbmFnZXIgaGFwcE1hbmFnZXIgPSBuZXcgSGFwcE1hbmFnZXIoKTtcclxuICAgICAgICBEaWN0aW9uYXJ5PE1vdmVUeXBlLCBQb2ludD4gbW92ZW1lbnRNb3ZlcyA9IG5ldyBEaWN0aW9uYXJ5PE1vdmVUeXBlLCBQb2ludD4oKTtcclxuICAgICAgICAvL0RpY3Rpb25hcnk8TW92ZVR5cGUsIFBvaW50PiBhdHRhY2tNb3ZlcyA9IG5ldyBEaWN0aW9uYXJ5PE1vdmVUeXBlLCBQb2ludD4oKTtcclxuICAgICAgICBNb3ZlVHlwZVtdIGVuZW15TW92ZXM7XHJcbiAgICAgICAgcHVibGljIExpc3Q8SW5wdXQ+IGlucHV0cyA9IG5ldyBMaXN0PFR1cm5iYXNlZC5JbnB1dD4oKTtcclxuICAgICAgICBwdWJsaWMgTGlzdDxNb3ZlVHlwZT4gcGxheWVySGFuZCA9IG5ldyBMaXN0PE1vdmVUeXBlPigpO1xyXG4gICAgICAgIHB1YmxpYyBBdHRhY2tNb3ZlW10gYXR0YWNrRGF0YXMgPSBuZXcgQXR0YWNrTW92ZVtdIHtcclxuICAgICAgICAgICAgbmV3IEF0dGFja01vdmUoRWxlbWVudC5UaHVuZGVyLCBNb3ZlVHlwZS5UaHVuZGVyKSxcclxuICAgICAgICAgICAgbmV3IEF0dGFja01vdmUoRWxlbWVudC5GaXJlLCBNb3ZlVHlwZS5GaXJlKSxcclxuICAgICAgICAgICAgbmV3IEF0dGFja01vdmUoRWxlbWVudC5Ob25lLCBNb3ZlVHlwZS5Ob3JtYWxTaG90KSxcclxuICAgICAgICAgICAgbmV3IEF0dGFja01vdmUoRWxlbWVudC5JY2UsIE1vdmVUeXBlLkljZSksXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgdGltZVRvQ2hvb3NlTWF4ID0gMTVmO1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCB0aW1lVG9DaG9vc2UgPSAtMTtcclxuXHJcbiAgICAgICAgcHVibGljIEJhdHRsZVJlc3VsdCBiYXR0bGVSZXN1bHQgPSBuZXcgQmF0dGxlUmVzdWx0KCk7XHJcbiAgICAgICAgaW50IG5FbmVtaWVzO1xyXG5cclxuICAgICAgICBwdWJsaWMgVHVybkJhc2VUcnlWYWx1ZXMoaW50IG1vZGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb3ZlbWVudE1vdmVzLkFkZChNb3ZlVHlwZS5Nb3ZlVXAsIFBvaW50LnVwKTtcclxuICAgICAgICAgICAgbW92ZW1lbnRNb3Zlcy5BZGQoTW92ZVR5cGUuTW92ZURvd24sIFBvaW50LmRvd24pO1xyXG4gICAgICAgICAgICBtb3ZlbWVudE1vdmVzLkFkZChNb3ZlVHlwZS5Nb3ZlTGVmdCwgUG9pbnQubGVmdCk7XHJcbiAgICAgICAgICAgIG1vdmVtZW50TW92ZXMuQWRkKE1vdmVUeXBlLk1vdmVSaWdodCwgUG9pbnQucmlnaHQpO1xyXG5cclxuICAgICAgICAgICAgcGxheWVySGFuZC5DbGVhcigpO1xyXG4gICAgICAgICAgICBwbGF5ZXJIYW5kLkFkZChNb3ZlVHlwZS5Nb3ZlUmlnaHQpO1xyXG4gICAgICAgICAgICBwbGF5ZXJIYW5kLkFkZChNb3ZlVHlwZS5Nb3ZlTGVmdCk7XHJcbiAgICAgICAgICAgIHBsYXllckhhbmQuQWRkKE1vdmVUeXBlLk1vdmVEb3duKTtcclxuICAgICAgICAgICAgcGxheWVySGFuZC5BZGQoTW92ZVR5cGUuTW92ZVVwKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtb2RlID09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBsYXllckhhbmQuQWRkKE1vdmVUeXBlLk5vcm1hbFNob3QpO1xyXG4gICAgICAgICAgICAgICAgZW5lbXlNb3ZlcyA9IG5ldyBNb3ZlVHlwZVtdIHtcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5Nb3ZlVXAsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZUxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZURvd24sXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZVJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLk5vcm1hbFNob3QsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGxheWVySGFuZC5BZGQoTW92ZVR5cGUuRmlyZSk7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJIYW5kLkFkZChNb3ZlVHlwZS5JY2UpO1xyXG4gICAgICAgICAgICAgICAgcGxheWVySGFuZC5BZGQoTW92ZVR5cGUuVGh1bmRlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgZW5lbXlNb3ZlcyA9IG5ldyBNb3ZlVHlwZVtdIHtcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5Nb3ZlRG93bixcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5Nb3ZlTGVmdCxcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlVHlwZS5Nb3ZlVXAsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuTW92ZVJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLkZpcmUsXHJcbiAgICAgICAgICAgICAgICAgICAgTW92ZVR5cGUuSWNlLFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdmVUeXBlLlRodW5kZXIsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3BsYXllckhhbmQuQWRkKE1vdmVUeXBlLk5vcm1hbFNob3QpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGJvb2wgSXNWaWN0b3J5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBiYXR0bGVSZXN1bHQucmVzdWx0ID09IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBCYXNpY0NvbmZpZyhCYXR0bGVCYXNpY0NvbmZpZyBiYXNpY0NvbmZpZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhdHRsZVN0YXRlLnR1cm5zUGVyUGhhc2UuVmFsID0gYmFzaWNDb25maWcublR1cm5zO1xyXG4gICAgICAgICAgICBuRW5lbWllcyA9IGJhc2ljQ29uZmlnLm5FbmVtaWVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5pdCgpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgQmF0dGxlRW50aXR5IGhlcm8gPSBuZXcgQmF0dGxlRW50aXR5KCk7XHJcblxyXG4gICAgICAgICAgICBoZXJvLnBvcy5TZXQoMSwgMSk7XHJcbiAgICAgICAgICAgIGhlcm8ubWluUG9zLlNldCgwLCAwKTtcclxuICAgICAgICAgICAgaGVyby5tYXhQb3MuU2V0KDIsIDIpO1xyXG4gICAgICAgICAgICBoZXJvLlR5cGUgPSBFbnRpdHlUeXBlLmhlcm87XHJcbiAgICAgICAgICAgIGhlcm8ubGlmZS5WYWwgPSAyO1xyXG5cclxuICAgICAgICAgICAgZW50aXRpZXMuQWRkKGhlcm8pO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBuRW5lbWllczsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBCYXR0bGVFbnRpdHkgZW5lbXkgPSBuZXcgQmF0dGxlRW50aXR5KCk7XHJcbiAgICAgICAgICAgICAgICBlbmVteS5wb3MuU2V0KDMgKyBpLCAxKTtcclxuICAgICAgICAgICAgICAgIGVuZW15Lm1pblBvcy5TZXQoMywgMCk7XHJcbiAgICAgICAgICAgICAgICBlbmVteS5tYXhQb3MuU2V0KDUsIDIpO1xyXG4gICAgICAgICAgICAgICAgZW5lbXkubGlmZS5WYWwgPSAyO1xyXG4gICAgICAgICAgICAgICAgZW5lbXkuZ3JhcGhpYyA9IDEgKyBpO1xyXG4gICAgICAgICAgICAgICAgZW5lbXkuVHlwZSA9IEVudGl0eVR5cGUuZW5lbXk7XHJcbiAgICAgICAgICAgICAgICBlbnRpdGllcy5BZGQoZW5lbXkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL0dhbWVFbnRpdHkgcGlja3VwID0gbmV3IEdhbWVFbnRpdHkoKTtcclxuICAgICAgICAgICAgICAgIC8vcGlja3VwLlR5cGUgPSBFbnRpdHlUeXBlLnBpY2t1cDtcclxuICAgICAgICAgICAgICAgIC8vcGlja3VwLnBvcy5TZXQoMCwgMik7XHJcbiAgICAgICAgICAgICAgICAvL3BpY2t1cC5saWZlLlZhbCA9IDI7XHJcbiAgICAgICAgICAgICAgICAvL3BpY2t1cC5ncmFwaGljID0gNDtcclxuICAgICAgICAgICAgICAgIC8vZW50aXRpZXMuQWRkKHBpY2t1cCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIEJhdHRsZUVudGl0eSBwYW5lbEVmZmVjdCA9IG5ldyBCYXR0bGVFbnRpdHkoKTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuVHlwZSA9IEVudGl0eVR5cGUucGFuZWxlZmZlY3Q7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LnBvcy5TZXQoMCwgMik7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmxpZmUuVmFsID0gNTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuZ3JhcGhpYyA9IDU7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LnJhbmRvbVBvc2l0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuZHJhd0xpZmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgcGFuZWxFZmZlY3QuZHJhd1R1cm4gPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgUmFuZG9tUG9zaXRpb24ocGFuZWxFZmZlY3QpO1xyXG4gICAgICAgICAgICAvLyAgICBlbnRpdGllcy5BZGQocGFuZWxFZmZlY3QpO1xyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICBCYXR0bGVFbnRpdHkgcGFuZWxFZmZlY3QgPSBuZXcgQmF0dGxlRW50aXR5KCk7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LlR5cGUgPSBFbnRpdHlUeXBlLnBhbmVsZWZmZWN0O1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5wb3MuU2V0KDAsIDIpO1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5saWZlLlZhbCA9IDU7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmdyYXBoaWMgPSA1O1xyXG4gICAgICAgICAgICAvLyAgICBwYW5lbEVmZmVjdC5yYW5kb21Qb3NpdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmRyYXdMaWZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgIHBhbmVsRWZmZWN0LmRyYXdUdXJuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgIFJhbmRvbVBvc2l0aW9uKHBhbmVsRWZmZWN0KTtcclxuICAgICAgICAgICAgLy8gICAgZW50aXRpZXMuQWRkKHBhbmVsRWZmZWN0KTtcclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICBSZXNldCgpO1xyXG4gICAgICAgICAgICBFeGVjdXRlUGhhc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVzZXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlbnRpdGllcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbnRpdGllc1tpXS5saWZlLlZhbCA9IDM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQ2hhbmdlUGhhc2UoQmF0dGxlUGhhc2UuRW5lbXlNb3ZlQ2hvaWNlKTtcclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUudHVybi5WYWwgPSAwO1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS5hY3RpbmdFbnRpdHkgPSAwO1xyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ob3cuVmFsID0gMDtcclxuICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfVG90YWwuVmFsID0gMTtcclxuICAgICAgICAgICAgYmF0dGxlUmVzdWx0LnJlc3VsdCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBib29sIElzT3ZlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYmF0dGxlUmVzdWx0LnJlc3VsdCAhPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVGljaygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBGaW5pc2hQcmV2aW91c1RpY2soKTtcclxuICAgICAgICAgICAgYm9vbCBoZXJvQWxpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgYm9vbCBlbmVteUFsaXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5UeXBlID09IEVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGlmZSA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZW15QWxpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uVHlwZSA9PSBFbnRpdHlUeXBlLmhlcm8pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGlmZSA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9BbGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFoZXJvQWxpdmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJhdHRsZVJlc3VsdC5yZXN1bHQgPSAyO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICghZW5lbXlBbGl2ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmF0dGxlUmVzdWx0LnJlc3VsdCA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGJhdHRsZVJlc3VsdC5yZXN1bHQgPT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaGFwcE1hbmFnZXIuVGljaygpO1xyXG4gICAgICAgICAgICAgICAgRXhlY3V0ZVBoYXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoZmxvYXQgZGVsdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGltZVRvQ2hvb3NlID4gMCAmJiBiYXR0bGVTdGF0ZS5waGFzZSA9PSBCYXR0bGVQaGFzZS5QaWNrSGFuZHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpbWVUb0Nob29zZSAtPSBkZWx0YTtcclxuICAgICAgICAgICAgICAgIGlmICh0aW1lVG9DaG9vc2UgPD0gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBUaWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBGaW5pc2hQcmV2aW91c1RpY2soKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQmF0dGxlUGhhc2UgcHJldmlvdXNQaGFzZSA9IGJhdHRsZVN0YXRlLnBoYXNlO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHByZXZpb3VzUGhhc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuRW5lbXlNb3ZlQ2hvaWNlOlxyXG4gICAgICAgICAgICAgICAgICAgIENoYW5nZVBoYXNlKEJhdHRsZVBoYXNlLkhhbmRSZWNoYXJnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLkhhbmRSZWNoYXJnZTpcclxuICAgICAgICAgICAgICAgICAgICBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZS5QaWNrSGFuZHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVQaGFzZS5QaWNrSGFuZHM6XHJcbiAgICAgICAgICAgICAgICAgICAgQ2hhbmdlUGhhc2UoQmF0dGxlUGhhc2UuRXhlY3V0ZU1vdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVQaGFzZS5FeGVjdXRlTW92ZTpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYmF0dGxlU3RhdGUubW92ZVRpY2tfTm93ID49IGJhdHRsZVN0YXRlLm1vdmVUaWNrX1RvdGFsIC0gMSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX05vdy5WYWwgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ub3RhbC5WYWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib29sIG5vTW9yZVVuaXRzVG9BY3RUaGlzVHVybiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBpX2luaXRpYWwgPSBiYXR0bGVTdGF0ZS5hY3RpbmdFbnRpdHkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaV9pbml0aWFsIDwgZW50aXRpZXMuQ291bnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSBpX2luaXRpYWw7IGkgPCBlbnRpdGllcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdGllc1tpXS5BbGl2ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLmFjdGluZ0VudGl0eSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vTW9yZVVuaXRzVG9BY3RUaGlzVHVybiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9Nb3JlVW5pdHNUb0FjdFRoaXNUdXJuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmF0dGxlU3RhdGUudHVybiA+PSBiYXR0bGVTdGF0ZS50dXJuc1BlclBoYXNlIC0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZS5FbmVteU1vdmVDaG9pY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUucmFuZG9tUG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJhbmRvbVBvc2l0aW9uKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLmFjdGluZ0VudGl0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUudHVybiA9IGJhdHRsZVN0YXRlLnR1cm4gKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX05vdy5WYWwgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFJhbmRvbVBvc2l0aW9uKEJhdHRsZUVudGl0eSBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZS5wb3MueC5WYWwgPSBSYW5kb21TdXBwbGllci5SYW5nZSgwLCA1KTtcclxuICAgICAgICAgICAgZS5wb3MueS5WYWwgPSBSYW5kb21TdXBwbGllci5SYW5nZSgwLCAyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBDaGFuZ2VQaGFzZShCYXR0bGVQaGFzZSBwaGFzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJhdHRsZVBoYXNlIHByZXZpb3VzUGhhc2UgPSBiYXR0bGVTdGF0ZS5waGFzZTtcclxuICAgICAgICAgICAgaWYgKHBoYXNlID09IHByZXZpb3VzUGhhc2UpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHBoYXNlID09IEJhdHRsZVBoYXNlLlBpY2tIYW5kcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGltZVRvQ2hvb3NlID0gdGltZVRvQ2hvb3NlTWF4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcmV2aW91c1BoYXNlID09IEJhdHRsZVBoYXNlLkV4ZWN1dGVNb3ZlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS50dXJuLlZhbCA9IDA7XHJcbiAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5hY3RpbmdFbnRpdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfTm93LlZhbCA9IDA7XHJcbiAgICAgICAgICAgICAgICBiYXR0bGVTdGF0ZS5tb3ZlVGlja19Ub3RhbC5WYWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIG0gaW4gZS5tb3ZlcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtLlZhbCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBiYXR0bGVTdGF0ZS5waGFzZSA9IHBoYXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEV4ZWN1dGVQaGFzZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcGhhc2UgPSBiYXR0bGVTdGF0ZS5waGFzZTtcclxuICAgICAgICAgICAgc3dpdGNoIChwaGFzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCYXR0bGVQaGFzZS5FbmVteU1vdmVDaG9pY2U6XHJcbiAgICAgICAgICAgICAgICAgICAgRW5lbXlHZW5lcmF0ZU1vdmVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLkhhbmRSZWNoYXJnZTpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQmF0dGxlUGhhc2UuUGlja0hhbmRzOlxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0cy5DbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBoaSBpbiBwbGF5ZXJIYW5kKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRzLkFkZChuZXcgVHVybmJhc2VkLklucHV0KElucHV0VHlwZS5Nb3ZlLCAoaW50KWhpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0cy5BZGQobmV3IFR1cm5iYXNlZC5JbnB1dChJbnB1dFR5cGUuTWlzY0JhdHRsZSwgTWlzY0JhdHRsZUlucHV0LlJlZG8pKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dHMuQWRkKG5ldyBUdXJuYmFzZWQuSW5wdXQoSW5wdXRUeXBlLk1pc2NCYXR0bGUsIE1pc2NCYXR0bGVJbnB1dC5Eb25lKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJhdHRsZVBoYXNlLkV4ZWN1dGVNb3ZlOlxyXG4gICAgICAgICAgICAgICAgICAgIEV4ZWN1dGVNb3ZlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbnRlcm5hbCB2b2lkIElucHV0KGludCBpbnB1dE51bWJlcilcclxuICAgICAgICAvL3tcclxuICAgICAgICAvLyAgICBNb3ZlVHlwZSBtb3ZlVHlwZSA9IHBsYXllckhhbmRbaW5wdXROdW1iZXJdO1xyXG4gICAgICAgIC8vICAgIE1vdmVDaG9zZW4obW92ZVR5cGUpO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbnB1dERvbmUoSW5wdXQgaW5wdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PSBJbnB1dFR5cGUuTW92ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTW92ZVR5cGUgYXJnMSA9IChNb3ZlVHlwZSlpbnB1dC5hcmcxO1xyXG4gICAgICAgICAgICAgICAgaWYocGxheWVySGFuZC5Db250YWlucyhhcmcxKSlcclxuICAgICAgICAgICAgICAgICAgICBNb3ZlQ2hvc2VuKGFyZzEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGlucHV0LnR5cGUgPT0gSW5wdXRUeXBlLk1pc2NCYXR0bGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE1pc2NCYXR0bGVJbnB1dCBtaXNjID0gKE1pc2NCYXR0bGVJbnB1dClpbnB1dC5hcmcxO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1pc2MgPT0gTWlzY0JhdHRsZUlucHV0LlJlZG8pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUuaGVybylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlLm1vdmVzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLm1vdmVzW2ldID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLm1vdmVzW2ldID0gbmV3IFZhbHVlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubW92ZXNbaV0uVmFsID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZhbHVlIHZhbHVlID0gZS5tb3Zlc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLlZhbCA9PSAtMSB8fCBpID09IGJhdHRsZVN0YXRlLnR1cm5zUGVyUGhhc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubW92ZXNbaSAtIDFdLlZhbCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG1pc2MgPT0gTWlzY0JhdHRsZUlucHV0LkRvbmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBNb3ZlQ2hvc2VuKE1vdmVUeXBlIG1vdmVUeXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChlLlR5cGUgPT0gRW50aXR5VHlwZS5oZXJvKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgZS5tb3Zlcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLm1vdmVzW2ldID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubW92ZXNbaV0gPSBuZXcgVmFsdWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubW92ZXNbaV0uVmFsID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgVmFsdWUgdmFsdWUgPSBlLm1vdmVzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLlZhbCA9PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubW92ZXNbaV0udmFsQXNFbnVtID0gbW92ZVR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRW5lbXlHZW5lcmF0ZU1vdmVzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUuZW5lbXkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBlLm1vdmVzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUubW92ZXNbaV0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5tb3Zlc1tpXSA9IG5ldyBWYWx1ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZS5tb3Zlc1tpXS5WYWwgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLm1vdmVzW2ldLnZhbEFzRW51bSA9IFJhbmRvbVN1cHBsaWVyLlJhbmRvbUVsZW1lbnQ8Z2xvYmFsOjpQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuVHVybkJhc2VUcnlWYWx1ZXMuTW92ZVR5cGU+KGVuZW15TW92ZXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEV4ZWN1dGVNb3ZlcygpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlKFwiYmxhXCIgKyBiYXR0bGVTdGF0ZS50dXJuLlZhbCk7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5SZWFkKCk7XHJcbiAgICAgICAgICAgIEJhdHRsZUVudGl0eSBhdHRhY2tlciA9IGVudGl0aWVzW2JhdHRsZVN0YXRlLmFjdGluZ0VudGl0eV07XHJcbiAgICAgICAgICAgIGludCB0dXJuID0gYmF0dGxlU3RhdGUudHVybjtcclxuICAgICAgICAgICAgRXhlY3V0ZU1vdmUoYXR0YWNrZXIsIHR1cm4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRXhlY3V0ZU1vdmUoQmF0dGxlRW50aXR5IGFjdG9yLCBpbnQgdHVybilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX1RvdGFsLlNldCgxKTsgLy9kZWZhdWx0IHZhbHVlXHJcblxyXG4gICAgICAgICAgICBWYWx1ZSB2YWx1ZSA9IGFjdG9yLm1vdmVzW3R1cm5dO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIG12ID0gKE1vdmVUeXBlKXZhbHVlLlZhbDtcclxuXHJcbiAgICAgICAgICAgICAgICAjcmVnaW9uIGF0dGFjayBoYW5kbGUgY29kZVxyXG5cclxuICAgICAgICAgICAgICAgIGJvb2wgaXNBdHRhY2tNb3ZlID0gbXYgPT0gTW92ZVR5cGUuTm9ybWFsU2hvdDtcclxuICAgICAgICAgICAgICAgIHZhciBhdHRhY2tFbGVtZW50ID0gRWxlbWVudC5Ob25lO1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gYXR0YWNrRGF0YXMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ubW92ZVR5cGUgPT0gbXYpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0F0dGFja01vdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2tFbGVtZW50ID0gaXRlbS5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc0F0dGFja01vdmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQmF0dGxlRW50aXR5IHRhcmdldCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXQgbWluRGlzID0gMTA7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0b3IuZWxlbWVudCA9IGF0dGFja0VsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUyIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlMi5EZWFkKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdG9yLlR5cGUgIT0gZTIuVHlwZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgZTIuVHlwZSAhPSBFbnRpdHlUeXBlLnBhbmVsZWZmZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiBlMi5UeXBlICE9IEVudGl0eVR5cGUucGlja3VwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib29sIHNhbWVIZWlnaHQgPSBhY3Rvci5wb3MueSA9PSBlMi5wb3MueTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2FtZUhlaWdodClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbG9hdCBkaXMgPSBhY3Rvci5wb3MueCAtIGUyLnBvcy54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXMgPCAwKSBkaXMgKj0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpcyA8IG1pbkRpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRpcyA9IGRpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gZTI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib29sIGF0dGFja0RlZmVuc2UgPSBhY3Rvci5lbGVtZW50ID09IHRhcmdldC5lbGVtZW50ICYmIGFjdG9yLmVsZW1lbnQgIT0gRWxlbWVudC5Ob25lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXR0YWNrRGVmZW5zZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICNyZWdpb24gYXR0YWNrIGhpdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhdHRsZVN0YXRlLm1vdmVUaWNrX05vdyA9PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYXR0YWNrRGVmZW5zZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtdWwgPSBDYWxjdWxhdGVBdHRhY2tNdWx0aXBsaWVyKGFjdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXVsICo9IENhbGN1bGF0ZURlZmVuZGVyTXVsdGlwbGllcih0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGFjdG9yLmVsZW1lbnQgPT0gRWxlbWVudC5GaXJlICYmIHRhcmdldC5lbGVtZW50ID09IEVsZW1lbnQuSWNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgKGFjdG9yLmVsZW1lbnQgPT0gRWxlbWVudC5UaHVuZGVyICYmIHRhcmdldC5lbGVtZW50ID09IEVsZW1lbnQuRmlyZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IChhY3Rvci5lbGVtZW50ID09IEVsZW1lbnQuSWNlICYmIHRhcmdldC5lbGVtZW50ID09IEVsZW1lbnQuVGh1bmRlcikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11bCAqPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmxpZmUuVmFsIC09IDEgKiBtdWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdG9yLmRhbWFnZU11bHRpcGxpZXIgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXBwTWFuYWdlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuQWRkKG5ldyBIYXBwKEhhcHBUYWcuRGFtYWdlVGFrZW4pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuQWRkQXR0cmlidXRlKG5ldyBIYXBwLkF0dHJpYnV0ZSgpLlNldFZhbHVlKGVudGl0aWVzLkluZGV4T2YodGFyZ2V0KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFwcE1hbmFnZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuQWRkKG5ldyBIYXBwKEhhcHBUYWcuQXR0YWNrSGl0KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuQWRkQXR0cmlidXRlKG5ldyBIYXBwLkF0dHJpYnV0ZSgpLlNldFZhbHVlKGVudGl0aWVzLkluZGV4T2YodGFyZ2V0KSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZShlbnRpdGllcy5JbmRleE9mKGFjdG9yKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZSgoaW50KWF0dGFja0VsZW1lbnQpKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX1RvdGFsLlNldCgyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICNlbmRyZWdpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVN0YXRlLm1vdmVUaWNrX1RvdGFsLlNldCgxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcE1hbmFnZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5BZGQobmV3IEhhcHAoSGFwcFRhZy5BdHRhY2tNaXNzKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5BZGRBdHRyaWJ1dGUobmV3IEhhcHAuQXR0cmlidXRlKCkuU2V0VmFsdWUoZW50aXRpZXMuSW5kZXhPZihhY3RvcikpKS5BZGRBdHRyaWJ1dGUobmV3IEhhcHAuQXR0cmlidXRlKCkuU2V0VmFsdWUoKGludClhdHRhY2tFbGVtZW50KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgICAgICNyZWdpb24gbW92ZW1lbnQgaGFuZGxlIGNvZGVcclxuICAgICAgICAgICAgICAgIFBvaW50IHA7XHJcbiAgICAgICAgICAgICAgICBpZiAobW92ZW1lbnRNb3Zlcy5UcnlHZXRWYWx1ZShtdiwgb3V0IHApKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdG9yLnBvcyArPSBwO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvb2wgaW52YWxpZE1vdmUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rvci5wb3MueCA8IGFjdG9yLm1pblBvcy54XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IGFjdG9yLnBvcy55IDwgYWN0b3IubWluUG9zLnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgYWN0b3IucG9zLnkgPiBhY3Rvci5tYXhQb3MueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBhY3Rvci5wb3MueCA+IGFjdG9yLm1heFBvcy54O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUgIT0gYWN0b3IgJiYgZS5BbGl2ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdG9yLnBvcyA9PSBlLnBvcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnZhbGlkTW92ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBFbnRpdHlUeXBlLnBpY2t1cClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubGlmZS5WYWwgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rvci5kYW1hZ2VNdWx0aXBsaWVyID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52YWxpZE1vdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBFbnRpdHlUeXBlLnBhbmVsZWZmZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52YWxpZE1vdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGludmFsaWRNb3ZlKSBicmVhaztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnZhbGlkTW92ZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJJbnZhbGlkIG1vdmUgZ2VuZXJhdGVcIiArIGJhdHRsZVN0YXRlLm1vdmVUaWNrX05vdy5WYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYXBwTWFuYWdlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLkFkZChuZXcgSGFwcChIYXBwVGFnLk1vdmVtZW50RmFpbCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuQWRkQXR0cmlidXRlKG5ldyBIYXBwLkF0dHJpYnV0ZSgpLlNldFZhbHVlKGVudGl0aWVzLkluZGV4T2YoYWN0b3IpKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5BZGRBdHRyaWJ1dGUobmV3IEhhcHAuQXR0cmlidXRlKCkuU2V0VmFsdWUoYWN0b3IucG9zLngpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLkFkZEF0dHJpYnV0ZShuZXcgSGFwcC5BdHRyaWJ1dGUoKS5TZXRWYWx1ZShhY3Rvci5wb3MueSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU3RhdGUubW92ZVRpY2tfVG90YWwuU2V0KDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rvci5wb3MgLT0gcDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGZsb2F0IENhbGN1bGF0ZUF0dGFja011bHRpcGxpZXIoQmF0dGxlRW50aXR5IGFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGJhc2VEID0gYWN0b3IuZGFtYWdlTXVsdGlwbGllcjtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGUgaW4gZW50aXRpZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChlICE9IGFjdG9yKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnBvcyA9PSBhY3Rvci5wb3MpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5UeXBlID09IEVudGl0eVR5cGUucGFuZWxlZmZlY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VEICo9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGJhc2VEO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgZmxvYXQgQ2FsY3VsYXRlRGVmZW5kZXJNdWx0aXBsaWVyKEJhdHRsZUVudGl0eSBhY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBiYXNlRCA9IDE7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlIGluIGVudGl0aWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZSAhPSBhY3RvcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5wb3MgPT0gYWN0b3IucG9zKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBFbnRpdHlUeXBlLnBhbmVsZWZmZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlRCAqPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlRDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBCYXR0bGVTdGF0ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIFZhbHVlIHR1cm4gPSBuZXcgVmFsdWUoKTtcclxuICAgICAgICAgICAgcHVibGljIFZhbHVlIHR1cm5zUGVyUGhhc2UgPSBuZXcgVmFsdWUoKTtcclxuICAgICAgICAgICAgcHVibGljIFZhbHVlIG1vdmVUaWNrX05vdyA9IG5ldyBWYWx1ZSgpO1xyXG4gICAgICAgICAgICBwdWJsaWMgVmFsdWUgbW92ZVRpY2tfVG90YWwgPSBuZXcgVmFsdWUoKTtcclxuICAgICAgICAgICAgcHVibGljIGludCBhY3RpbmdFbnRpdHkgPSAwO1xyXG4gICAgICAgICAgICBwdWJsaWMgQmF0dGxlUGhhc2UgcGhhc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2xhc3MgQmF0dGxlRW50aXR5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgVmFsdWUgbGlmZSA9IG5ldyBWYWx1ZSgpO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBWYWx1ZSBhY3RpdmU7XHJcbiAgICAgICAgICAgIHB1YmxpYyBQb2ludCBwb3MgPSBuZXcgUG9pbnQoKTtcclxuICAgICAgICAgICAgcHVibGljIFBvaW50IG1pblBvcyA9IG5ldyBQb2ludCgpO1xyXG4gICAgICAgICAgICBwdWJsaWMgUG9pbnQgbWF4UG9zID0gbmV3IFBvaW50KCk7XHJcbiAgICAgICAgICAgIGludGVybmFsIFZhbHVlIHZhbHVlO1xyXG4gICAgICAgICAgICBwdWJsaWMgVmFsdWVbXSBtb3ZlcyA9IG5ldyBWYWx1ZVsxMF07XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgZ3JhcGhpYztcclxuICAgICAgICAgICAgcHVibGljIGZsb2F0IGRhbWFnZU11bHRpcGxpZXIgPSAxO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBib29sIGRyYXdMaWZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgYm9vbCBkcmF3VHVybiA9IHRydWU7XHJcbiAgICAgICAgICAgIGludGVybmFsIGJvb2wgcmFuZG9tUG9zaXRpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgcHVibGljIEVsZW1lbnQgZWxlbWVudCA9IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5UdXJuQmFzZVRyeVZhbHVlcy5FbGVtZW50Lk5vbmU7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgRW50aXR5VHlwZSBUeXBlIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIFZlY3RvcjJEIFBvc2l0aW9uVjJEIHsgZ2V0IHsgcmV0dXJuIG5ldyBWZWN0b3IyRChwb3MueCwgcG9zLnkpOyB9IH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBib29sIERlYWQgeyBnZXQgeyByZXR1cm4gbGlmZSA8PSAwOyB9IH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBib29sIEFsaXZlIHsgZ2V0IHsgcmV0dXJuICF0aGlzLkRlYWQ7IH0gfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIE1vdmVUeXBlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEb05vdGhpbmcsXHJcbiAgICAgICAgICAgIE1vdmVVcCxcclxuICAgICAgICAgICAgTW92ZURvd24sXHJcbiAgICAgICAgICAgIE1vdmVMZWZ0LFxyXG4gICAgICAgICAgICBNb3ZlUmlnaHQsXHJcbiAgICAgICAgICAgIE5vcm1hbFNob3QsXHJcbiAgICAgICAgICAgIEZpcmUsXHJcbiAgICAgICAgICAgIEljZSxcclxuICAgICAgICAgICAgVGh1bmRlclxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cnVjdCBBdHRhY2tNb3ZlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgRWxlbWVudCBlbGVtZW50O1xyXG4gICAgICAgICAgICBwdWJsaWMgTW92ZVR5cGUgbW92ZVR5cGU7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgQXR0YWNrTW92ZShFbGVtZW50IGVsZW1lbnQsIE1vdmVUeXBlIG1vdmVUeXBlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlVHlwZSA9IG1vdmVUeXBlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZW51bSBIYXBwVGFnXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBdHRhY2tIaXQsXHJcbiAgICAgICAgICAgIEF0dGFja01pc3MsXHJcbiAgICAgICAgICAgIERhbWFnZVRha2VuLFxyXG4gICAgICAgICAgICBNb3ZlbWVudEZhaWxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIEJhdHRsZVBoYXNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBFbmVteU1vdmVDaG9pY2UsXHJcbiAgICAgICAgICAgIEhhbmRSZWNoYXJnZSxcclxuICAgICAgICAgICAgUGlja0hhbmRzLFxyXG4gICAgICAgICAgICBFeGVjdXRlTW92ZSxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIEVudGl0eVR5cGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGhlcm8sIGVuZW15LCBwaWNrdXAsIHBhbmVsZWZmZWN0XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGVudW0gRWxlbWVudFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRmlyZSwgSWNlLCBUaHVuZGVyLFxyXG4gICAgICAgICAgICBOb25lXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBQb2ludFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUG9pbnQgdXAgPSBuZXcgUG9pbnQoMCwgMSk7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBQb2ludCBkb3duID0gbmV3IFBvaW50KDAsIC0xKTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFBvaW50IHJpZ2h0ID0gbmV3IFBvaW50KDEsIDApO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUG9pbnQgbGVmdCA9IG5ldyBQb2ludCgtMSwgMCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBWYWx1ZSB4ID0gbmV3IFZhbHVlKCk7XHJcbiAgICAgICAgcHVibGljIFZhbHVlIHkgPSBuZXcgVmFsdWUoKTtcclxuXHJcbiAgICAgICAgcHVibGljIFBvaW50KGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMueC5WYWwgPSB4O1xyXG4gICAgICAgICAgICB0aGlzLnkuVmFsID0geTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQb2ludCgpIDogdGhpcygwLCAwKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUG9pbnQgb3BlcmF0b3IgKyhQb2ludCBwMSwgUG9pbnQgcDIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwMS54ICs9IHAyLng7XHJcbiAgICAgICAgICAgIHAxLnkgKz0gcDIueTtcclxuICAgICAgICAgICAgcmV0dXJuIHAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFBvaW50IG9wZXJhdG9yIC0oUG9pbnQgcDEsIFBvaW50IHAyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcDEueC5WYWwgLT0gcDIueDtcclxuICAgICAgICAgICAgcDEueS5WYWwgLT0gcDIueTtcclxuICAgICAgICAgICAgcmV0dXJuIHAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0KGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMueC5WYWwgPSB4O1xyXG4gICAgICAgICAgICB0aGlzLnkuVmFsID0geTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciA9PShQb2ludCBjMSwgUG9pbnQgYzIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBib29sIGMybnVsbCA9IG9iamVjdC5SZWZlcmVuY2VFcXVhbHMoYzIsIG51bGwpO1xyXG4gICAgICAgICAgICBib29sIGMxbnVsbCA9IG9iamVjdC5SZWZlcmVuY2VFcXVhbHMoYzEsIG51bGwpO1xyXG4gICAgICAgICAgICBpZiAoYzJudWxsICYmIGMxbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoYzFudWxsIHx8IGMybnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjMS54ID09IGMyLnggJiYgYzEueSA9PSBjMi55O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yICE9KFBvaW50IGMxLCBQb2ludCBjMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJvb2wgYzJudWxsID0gb2JqZWN0LlJlZmVyZW5jZUVxdWFscyhjMiwgbnVsbCk7XHJcbiAgICAgICAgICAgIGJvb2wgYzFudWxsID0gb2JqZWN0LlJlZmVyZW5jZUVxdWFscyhjMSwgbnVsbCk7XHJcbiAgICAgICAgICAgIGlmIChjMm51bGwgJiYgYzFudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoYzFudWxsIHx8IGMybnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuICEoYzEueCA9PSBjMi54ICYmIGMxLnkgPT0gYzIueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVmFsdWVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgVmFsIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEVudW0gdmFsQXNFbnVtIHsgc2V0IHsgVmFsID0gQ29udmVydC5Ub1NpbmdsZSh2YWx1ZSk7IH0gfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldChpbnQgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZhbCA9IHY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZhbHVlIG9wZXJhdG9yICsoVmFsdWUgYzEsIGZsb2F0IGMyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYzEuVmFsICs9IGMyO1xyXG4gICAgICAgICAgICByZXR1cm4gYzE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IG9wZXJhdG9yIC0oVmFsdWUgYzEsIGZsb2F0IGMyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGMxLlZhbCAtIGMyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yID09KFZhbHVlIGMxLCBWYWx1ZSBjMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJvb2wgYzJudWxsID0gb2JqZWN0LlJlZmVyZW5jZUVxdWFscyhjMiwgbnVsbCk7XHJcbiAgICAgICAgICAgIGJvb2wgYzFudWxsID0gb2JqZWN0LlJlZmVyZW5jZUVxdWFscyhjMSwgbnVsbCk7XHJcbiAgICAgICAgICAgIGlmIChjMm51bGwgJiYgYzFudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGlmIChjMW51bGwgfHwgYzJudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGMxLlZhbCA9PSBjMi5WYWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgIT0oVmFsdWUgYzEsIFZhbHVlIGMyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYm9vbCBjMm51bGwgPSBvYmplY3QuUmVmZXJlbmNlRXF1YWxzKGMyLCBudWxsKTtcclxuICAgICAgICAgICAgYm9vbCBjMW51bGwgPSBvYmplY3QuUmVmZXJlbmNlRXF1YWxzKGMxLCBudWxsKTtcclxuICAgICAgICAgICAgaWYgKGMybnVsbCAmJiBjMW51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChjMW51bGwgfHwgYzJudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYzEuVmFsICE9IGMyLlZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW1wbGljaXQgb3BlcmF0b3IgZmxvYXQoVmFsdWUgZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBkLlZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW1wbGljaXQgb3BlcmF0b3IgaW50KFZhbHVlIGQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGludClkLlZhbDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGNsYXNzIEJhdHRsZVJlc3VsdFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBpbnQgcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdHJ1Y3QgQmF0dGxlQmFzaWNDb25maWdcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IG5FbmVtaWVzO1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpbnQgblR1cm5zO1xyXG5cclxuICAgICAgICBwdWJsaWMgQmF0dGxlQmFzaWNDb25maWcoaW50IG5FbmVtaWVzLCBpbnQgblR1cm5zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5uRW5lbWllcyA9IG5FbmVtaWVzO1xyXG4gICAgICAgICAgICB0aGlzLm5UdXJucyA9IG5UdXJucztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0cnVjdCBJbnB1dFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBJbnB1dFR5cGUgdHlwZTtcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IGFyZzE7XHJcblxyXG4gICAgICAgIHB1YmxpYyBJbnB1dChJbnB1dFR5cGUgdHlwZSwgaW50IGFyZzEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICB0aGlzLmFyZzEgPSBhcmcxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIElucHV0KElucHV0VHlwZSB0eXBlLCBFbnVtIGFyZzEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICB0aGlzLmFyZzEgPSBDb252ZXJ0LlRvSW50MzIoYXJnMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnVtIElucHV0VHlwZVxyXG4gICAge1xyXG4gICAgICAgIE1vdmUsIE1pc2NCYXR0bGVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBNaXNjQmF0dGxlSW5wdXRcclxuICAgIHtcclxuICAgICAgICBEb25lLCBSZWRvXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDb2xvclN0dWZmXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgc3RyaW5nIEdvb2RNYWluO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIG5ldXRyYWxEYXJrID0gXCIjMTkwMTNiXCI7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgbmV1dHJhbFN0cm9uZyA9IFwiIzJjM2U0M1wiO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHN0cmluZyBHb29kU3ViO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHN0cmluZyBFdmlsTWFpbjtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZ1tdIGNvbG9ycyA9IG5ldyBzdHJpbmdbMjBdO1xyXG5cclxuICAgICAgICBzdGF0aWMgQ29sb3JTdHVmZigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGNvbG9ycy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29sb3JzW2ldID0gXCIjMTMxMzEzXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLkhlcm9dID0gXCIjMDA5YzhkXCI7XHJcbiAgICAgICAgICAgIC8vY29uc3Qgc3RyaW5nIGhlcm9TdWIgPSBcIiMwMDVmOTFcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLkhlcm9UdXJuXSA9IGhlcm9TdWI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0NvbG9ycy5FbmVteV0gPSBcIiNmZjAzNTNcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQ29sb3JzLkdyaWRIZXJvXSA9IGhlcm9TdWI7XHJcbiAgICAgICAgICAgIC8vY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEVuZW15XSA9IFwiIzhlMDA2MFwiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkVuZW15VHVybl0gPSBcIiM4ZTAwNjBcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5Cb2FyZF0gPSBcIiMxZTQ4NmVcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5pbnB1dEtleV0gPSBcIiM2ODg2OTBcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5XaW5kb3dMYWJlbF0gPSBcIiMxZTQ4NmVcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5GaXJlQXVyYV0gPSBcIiM3OTMxMDBcIjtcclxuICAgICAgICAgICAgLy9jb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5JY2VBdXJhXSA9IFwiIzAwNTU5MFwiO1xyXG4gICAgICAgICAgICAvL2NvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLlRodW5kZXJBdXJhXSA9IFwiIzAwNTgzZFwiO1xyXG5cclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkhlcm9dID0gXCIjOGFkODk2XCI7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0cmluZyBoZXJvU3ViID0gXCIjNGM2ZDUwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5IZXJvVHVybl0gPSBoZXJvU3ViO1xyXG4gICAgICAgICAgICBjb2xvcnNbUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuRW5lbXldID0gXCIjZmY3Njk0XCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVyb10gPSBoZXJvU3ViO1xyXG4gICAgICAgICAgICBjb25zdCBzdHJpbmcgZW5lbXlzdWIgPSBcIiNhNzQ2NGZcIjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRFbmVteV0gPSBlbmVteXN1YjtcclxuICAgICAgICAgICAgY29sb3JzW1BpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkVuZW15VHVybl0gPSBlbmVteXN1YjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuQm9hcmRdID0gXCIjMWU0ODZlXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLmlucHV0S2V5XSA9IFwiIzY4ODY5MFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5XaW5kb3dMYWJlbF0gPSBcIiMxZTQ4NmVcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuRmlyZUF1cmFdID0gXCIjNzkzMTAwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLkljZUF1cmFdID0gXCIjMDA1NTkwXCI7XHJcbiAgICAgICAgICAgIGNvbG9yc1tCYXR0bGVSZW5kZXIuQ29sb3JzLlRodW5kZXJBdXJhXSA9IFwiIzAwNTgzZFwiO1xyXG4gICAgICAgICAgICBjb2xvcnNbQmF0dGxlUmVuZGVyLkNvbG9ycy5GaXJlU2hvdF0gPSBcIiNmODJiMzZcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuSWNlU2hvdF0gPSBcIiMwMDdlZmZcIjtcclxuICAgICAgICAgICAgY29sb3JzW0JhdHRsZVJlbmRlci5Db2xvcnMuVGh1bmRlclNob3RdID0gXCIjYTM3YzAwXCI7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkRlYnVnRXh0cmFcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBEZWJ1Z0V4XHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIExpc3Q8c3RyaW5nPiBtZXNzYWdlcyA9IG5ldyBMaXN0PHN0cmluZz4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIExvZyhzdHJpbmcgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VzLkFkZCh2KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTaG93KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbnNvbGUuQ2xlYXIoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbWVzc2FnZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQ29uc29sZS5SZWFkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5EZWJ1Z0V4dHJhO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkhhcHBzXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgSGFwcE1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IEN1cnJlbnRUaW1lIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIExpc3Q8SGFwcD4gSGFwcHMgPSBuZXcgTGlzdDxIYXBwPigpO1xyXG4gICAgICAgIExpc3Q8SGFwcEhhbmRsZXI+IGhhbmRsZXJzID0gbmV3IExpc3Q8SGFwcEhhbmRsZXI+KCk7XHJcbiAgICAgICAgaW50IGxhdGVzdEhhbmRsZWQgPSAtMTtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkSGFuZGxlcihIYXBwSGFuZGxlciBoaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGhhbmRsZXJzLkFkZChoaCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBUcnlIYW5kbGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYobGF0ZXN0SGFuZGxlZCAhPSBDdXJyZW50VGltZSlcclxuICAgICAgICAgICAgICAgIEhhbmRsZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEhhbmRsZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsYXRlc3RIYW5kbGVkID0gQ3VycmVudFRpbWU7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBoIGluIGhhbmRsZXJzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gSGFwcHMuQ291bnQgLSAxOyBpID49IDA7IGktLSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMgY2hlY2sgYXNzdW1lcyBoYXBwcyBhcmUgb3JkZXJlZCBieSB0aW1lIHN0YW1wXHJcbiAgICAgICAgICAgICAgICAgICAgLy93aGljaCB0aGV5IHNob3VsZCBiZSBhdXRvbWF0aWNhbGx5XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEhhcHBzW2ldLlRpbWVTdGFtcCAhPSBDdXJyZW50VGltZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERlYnVnRXguTG9nKFwiSGFwcGVuaW5nIG5vdCBlcXVhbCB0byBjdXJyZW50IHRpbWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoSGFwcHNbaV0uTWFpblRhZyA9PSBoLm1haW5UYWcpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBEZWJ1Z0V4LkxvZyhcIkhhcHBlbmluZyBoYW5kbGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoLkhhbmRsZShIYXBwc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERlYnVnRXguTG9nKFwiSGFwcGVuaW5nIHRhZyBpcyBkaWZmZXJlbnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcCBBZGQoSGFwcCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaC5UaW1lU3RhbXAgPSBDdXJyZW50VGltZTtcclxuICAgICAgICAgICAgSGFwcHMuQWRkKGgpO1xyXG4gICAgICAgICAgICByZXR1cm4gaDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFRpY2soKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3VycmVudFRpbWUrKztcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIE1haW5UYWc7XHJcbiAgICAgICAgcHVibGljIGludCBUaW1lU3RhbXA7XHJcbiAgICAgICAgTGlzdDxBdHRyaWJ1dGU+IGF0dHJzID0gbmV3IExpc3Q8QXR0cmlidXRlPigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcChvYmplY3QgbWFpblRhZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE1haW5UYWcgPSBtYWluVGFnLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2xhc3MgQXR0cmlidXRlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgZmxvYXQgVmFsdWUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBBdHRyaWJ1dGUgU2V0VmFsdWUoZmxvYXQgZilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVmFsdWUgPSBmO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHVibGljIFRhZ0hvbGRlciB0YWdzID0gbmV3IFRhZ0hvbGRlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEhhcHAgQWRkQXR0cmlidXRlKEF0dHJpYnV0ZSBhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYXR0cnMuQWRkKGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIGludCBHZXRBdHRyaWJ1dGVfSW50KGludCBpbmRleClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoaW50KWF0dHJzW2luZGV4XS5WYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhhcHBIYW5kbGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBtYWluVGFnO1xyXG4gICAgICAgIHB1YmxpYyBBY3Rpb248SGFwcD4gSGFuZGxlO1xyXG5cclxuICAgICAgICBwdWJsaWMgSGFwcEhhbmRsZXIob2JqZWN0IG1haW5UYWcsIEFjdGlvbjxIYXBwPiBoYW5kbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1haW5UYWcgPSBtYWluVGFnLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIEhhbmRsZSA9IGhhbmRsZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFRhZ0hvbGRlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PG9iamVjdD4gVGFncyB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSGFzVGFnKG9iamVjdCB0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFRhZ3MuQ29udGFpbnModCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEFkZChvYmplY3QgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRhZ3MuQWRkKHYpO1xyXG4gICAgICAgIH1cclxuXG4gICAgXG5wcml2YXRlIExpc3Q8b2JqZWN0PiBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fVGFncz1uZXcgTGlzdDxvYmplY3Q+KCk7fVxyXG5cclxuXHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBzdGF0aWMgcHVibGljIGNsYXNzIFJhbmRvbVN1cHBsaWVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBGdW5jPGZsb2F0PiBHZW5lcmF0ZXsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbnQgUmFuZ2UoaW50IG1pbiwgaW50IG1heCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKGludCkgKEdlbmVyYXRlKCkgKiAobWF4LW1pbikrbWluKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBSYW5kb21FbGVtZW50PFQ+KFRbXSBhcnJheSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcnJheVtSYW5nZSgwLCBhcnJheS5MZW5ndGgpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRleHRXb3JsZFxyXG4gICAge1xyXG4gICAgICAgIExpc3Q8VGV4dEVudGl0eT4gYWN0aXZlQWdlbnRzID0gbmV3IExpc3Q8VGV4dEVudGl0eT4oKTtcclxuICAgICAgICBMaXN0PFRleHRFbnRpdHk+IGZyZWVCb2FyZHMgPSBuZXcgTGlzdDxUZXh0RW50aXR5PigpO1xyXG4gICAgICAgIExpc3Q8VGV4dEFuaW1hdGlvbj4gYW5pbWF0aW9ucyA9IG5ldyBMaXN0PFRleHRBbmltYXRpb24+KCk7XHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBtYWluQm9hcmQ7XHJcbiAgICAgICAgaW50IGxhdGVzdElkID0gLTE7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUIEFkZEFuaW1hdGlvbjxUPihUIHRhKSB3aGVyZSBUIDogVGV4dEFuaW1hdGlvblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYW5pbWF0aW9ucy5BZGQodGEpO1xyXG4gICAgICAgICAgICB0YS5SZWdpc3Rlckxpc3RzKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXQoaW50IHdpZHRoLCBpbnQgaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbWFpbkJvYXJkID0gbmV3IFRleHRCb2FyZCh3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1haW5Cb2FyZC5SZXNldCgpO1xyXG4gICAgICAgICAgICBEcmF3Q2hpbGRyZW4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdDaGlsZHJlbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGFjdGl2ZUFnZW50cy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVBZ2VudHNbaV0uUmVzZXRBbmltYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhbmltIGluIGFuaW1hdGlvbnMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbS5Nb2RpZnkoYWN0aXZlQWdlbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVBZ2VudHNbaV0uZnJlZUlmSWRsZSAmJiAhYWN0aXZlQWdlbnRzW2ldLmFuaW1hdGluZylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmcmVlQm9hcmRzLkFkZChhY3RpdmVBZ2VudHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUFnZW50cy5SZW1vdmUoYWN0aXZlQWdlbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkJvYXJkLkluc2VydChhY3RpdmVBZ2VudHNbaV0uYW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0RW50aXR5IEdldEZyZWVFbnRpdHkoaW50IHcsIGludCBoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dEVudGl0eSB0ZTtcclxuICAgICAgICAgICAgaWYgKGZyZWVCb2FyZHMuQ291bnQgPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZSA9IGZyZWVCb2FyZHNbZnJlZUJvYXJkcy5Db3VudCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgZnJlZUJvYXJkcy5SZW1vdmVBdChmcmVlQm9hcmRzLkNvdW50IC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZSA9IG5ldyBUZXh0RW50aXR5KCk7XHJcbiAgICAgICAgICAgICAgICB0ZS5pZCA9ICsrbGF0ZXN0SWQ7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhY3RpdmVBZ2VudHMuQWRkKHRlKTtcclxuICAgICAgICAgICAgdGUuZnJlZUlmSWRsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0ZS5TZXRTaXplKHcsIGgpO1xyXG4gICAgICAgICAgICB0ZS5SZXNldEZ1bGwoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRFbnRpdHkgR2V0VGVtcEVudGl0eShpbnQgdywgaW50IGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGUgPSBHZXRGcmVlRW50aXR5KHcsIGgpO1xyXG4gICAgICAgICAgICB0ZS5mcmVlSWZJZGxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWR2YW5jZVRpbWUoZmxvYXQgdilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBhbmltIGluIGFuaW1hdGlvbnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFuaW0uVXBkYXRlKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc0RvbmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGFuaW0gaW4gYW5pbWF0aW9ucylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFhbmltLklzRG9uZSgpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0RW50aXR5XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGludCBpZDtcclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIG9yaWdpbjtcclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIGFuaW1hdGlvbjtcclxuICAgICAgICBwdWJsaWMgYm9vbCBmcmVlSWZJZGxlID0gZmFsc2U7XHJcbiAgICAgICAgaW50ZXJuYWwgYm9vbCBhbmltYXRpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0QW5pbWF0aW9uLkJhc2VEYXRhIEFuaW1CYXNlKGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGV4dEFuaW1hdGlvbi5CYXNlRGF0YShsZW5ndGgsIDAsIGlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVzZXRBbmltYXRpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYW5pbWF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbi5TZXQob3JpZ2luKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVzZXRGdWxsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG9yaWdpbi5SZXNldEludmlzaWJsZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXRTaXplKGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChvcmlnaW4gPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luID0gbmV3IFRleHRCb2FyZCh3LCBoKTtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbiA9IG5ldyBUZXh0Qm9hcmQodywgaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3JpZ2luLlJlc2l6ZSh3LCBoKTtcclxuICAgICAgICAgICAgYW5pbWF0aW9uLlJlc2l6ZSh3LCBoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgUG9zaXRpb25BbmltYXRpb24gOiBUZXh0QW5pbWF0aW9uPFBvc2l0aW9uQW5pbWF0aW9uLlBvc2l0aW9uRGF0YT5cclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBQb3NpdGlvbkRhdGEgbWFpbkRhdGEsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk1vZGlmeShlbnRpdHksIG1haW5EYXRhLCBwcm9ncmVzcywgbGVuZ3RoKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkIHRhcmdldCA9IGVudGl0eS5hbmltYXRpb247XHJcbiAgICAgICAgICAgIGlmIChtYWluRGF0YS5wZXJtYW5lbnQpXHJcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSBlbnRpdHkub3JpZ2luO1xyXG4gICAgICAgICAgICB0YXJnZXQuUG9zaXRpb24gPSBWZWN0b3IyRC5JbnRlcnBvbGF0ZVJvdW5kZWQobWFpbkRhdGEuc3RhcnRQb3NpdGlvbiwgbWFpbkRhdGEuZW5kUG9zaXRpb24sIHByb2dyZXNzIC8gbGVuZ3RoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RydWN0IFBvc2l0aW9uRGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGJvb2wgcGVybWFuZW50O1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgVmVjdG9yMkQgc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb247XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgUG9zaXRpb25EYXRhKFZlY3RvcjJEIHN0YXJ0UG9zaXRpb24sIFZlY3RvcjJEIGVuZFBvc2l0aW9uLCBib29sIHBlcm0gPSBmYWxzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFBvc2l0aW9uID0gc3RhcnRQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kUG9zaXRpb24gPSBlbmRQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVybWFuZW50ID0gcGVybTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgVGV4dEFuaW1hdGlvbjxUPiA6IFRleHRBbmltYXRpb25cclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgTGlzdDxUPiBtYWluRGF0YSA9IG5ldyBMaXN0PFQ+KCk7XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgUmVxdWVzdFJlZ2lzdGVyTGlzdHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5SZWdpc3Rlckxpc3QobWFpbkRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkKEJhc2VEYXRhIGJhc2VEYXRhLCBUIG1haW5EKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5BZGQoYmFzZURhdGEpO1xyXG4gICAgICAgICAgICBtYWluRGF0YS5BZGQobWFpbkQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBpbnQgaW5kZXgsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBNb2RpZnkoZW50aXR5LCBtYWluRGF0YVtpbmRleF0sIHByb2dyZXNzLCBsZW5ndGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIFQgbWFpbkRhdGEsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbnRlcm5hbCBvdmVycmlkZSB2b2lkIEV4ZWN1dGUoaW50IGluZGV4LCBCYXNlRGF0YSBiYXNlRGF0YSlcclxuICAgICAgICAvL3tcclxuICAgICAgICAvLyAgICB0aGlzLkV4ZWN1dGUobWFpbkRhdGFbaW5kZXhdLCBiYXNlRGF0YSk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8vcHVibGljIGFic3RyYWN0IHZvaWQgRXhlY3V0ZShUIG1haW5EYXRhLCBCYXNlRGF0YSBiYXNlRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIFRleHRBbmltYXRpb25cclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIHN0cnVjdCBCYXNlRGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGZsb2F0IGxlbmd0aDtcclxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGZsb2F0IHByb2dyZXNzO1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IHRhcmdldDtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBCYXNlRGF0YShmbG9hdCBsZW5ndGgsIGZsb2F0IHByb2dyZXNzLCBpbnQgdGFyZ2V0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBwcm9ncmVzcztcclxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExpc3Q8ZmxvYXQ+IGxlbmd0aCA9IG5ldyBMaXN0PGZsb2F0PigpO1xyXG4gICAgICAgIExpc3Q8ZmxvYXQ+IHByb2dyZXNzID0gbmV3IExpc3Q8ZmxvYXQ+KCk7XHJcbiAgICAgICAgTGlzdDxpbnQ+IHRhcmdldHMgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgTGlzdDxJTGlzdD4gbGlzdHMgPSBuZXcgTGlzdDxJTGlzdD4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXJMaXN0cygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsaXN0cy5BZGQobGVuZ3RoKTtcclxuICAgICAgICAgICAgbGlzdHMuQWRkKHByb2dyZXNzKTtcclxuICAgICAgICAgICAgbGlzdHMuQWRkKHRhcmdldHMpO1xyXG4gICAgICAgICAgICBSZXF1ZXN0UmVnaXN0ZXJMaXN0cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IHZvaWQgUmVxdWVzdFJlZ2lzdGVyTGlzdHMoKTtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBwcm9ncmVzcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzc1tpXSArPSBkZWx0YTtcclxuICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzc1tpXSA+PSBsZW5ndGhbaV0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRW5kVGFzayhpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0V4ZWN1dGUoaSwgbmV3IEJhc2VEYXRhKGxlbmd0aFtpXSxwcm9ncmVzc1tpXSwgdGFyZ2V0c1tpXSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2ludGVybmFsIGFic3RyYWN0IHZvaWQgRXhlY3V0ZShpbnQgaW5kZXgsIEJhc2VEYXRhIGJhc2VEYXRhKTtcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBBZGQoQmFzZURhdGEgYmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwcm9ncmVzcy5BZGQoYmQucHJvZ3Jlc3MpO1xyXG4gICAgICAgICAgICB0YXJnZXRzLkFkZChiZC50YXJnZXQpO1xyXG4gICAgICAgICAgICBsZW5ndGguQWRkKGJkLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc0RvbmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbGlzdHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLkNvdW50ICE9IHByb2dyZXNzLkNvdW50KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBzLlRyaW0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvZ3Jlc3MuQ291bnQgPT0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRW5kVGFzayhpbnQgaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBsIGluIGxpc3RzKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgbC5SZW1vdmVBdChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBSZWdpc3Rlckxpc3QoSUxpc3QgbWFpbkRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsaXN0cy5BZGQobWFpbkRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBwcm9ncmVzcy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYS5pZCA9PSB0YXJnZXRzW2ldKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE1vZGlmeShhLCBpLCBwcm9ncmVzc1tpXSwgbGVuZ3RoW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBhLmFuaW1hdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgTW9kaWZ5KFRleHRFbnRpdHkgZW50aXR5LCBpbnQgaW5kZXgsIGZsb2F0IHByb2dyZXNzLCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRleHRCb2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBjaGFyIE5PQ0hBTkdFQ0hBUiA9IChjaGFyKTE7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGNoYXIgSU5WSVNJQkxFQ0hBUiA9IChjaGFyKTI7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBOT0NIQU5HRUNPTE9SID0gLTI7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBJTlZJU0lCTEVDT0xPUiA9IC0xO1xyXG4gICAgICAgIGNoYXJbLF0gY2hhcnM7XHJcbiAgICAgICAgcHVibGljIGludFssXSBUZXh0Q29sb3IgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludFssXSBCYWNrQ29sb3IgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgLy9TdHJpbmdCdWlsZGVyIHN0cmluZ0J1aWxkZXIgPSBuZXcgU3RyaW5nQnVpbGRlcigpO1xyXG4gICAgICAgIGludCBjdXJzb3JYID0gMDtcclxuICAgICAgICBpbnQgY3Vyc29yWSA9IDA7XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjJEIFBvc2l0aW9uIHsgZ2V0OyBzZXQ7IH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm9hcmQoaW50IHdpZHRoLCBpbnQgaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9TZXRNYXhTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICBSZXNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3T25DZW50ZXIoc3RyaW5nIG1lc3NhZ2UsIGludCBjb2xvciwgaW50IHhPZmYgPSAwLCBpbnQgeU9mZiA9IDAsIGJvb2wgYWxpZ25TdHJpbmcgPSB0cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IHggPSAoV2lkdGgpIC8gMjtcclxuICAgICAgICAgICAgaWYgKGFsaWduU3RyaW5nKSB4IC09IG1lc3NhZ2UuTGVuZ3RoIC8gMjtcclxuICAgICAgICAgICAgaW50IHkgPSBIZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICBEcmF3KG1lc3NhZ2UsIHggKyB4T2ZmLCB5ICsgeU9mZiwgY29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFNldE1heFNpemUoaW50IHdpZHRoLCBpbnQgaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2hhcnMgPSBuZXcgY2hhclt3aWR0aCwgaGVpZ2h0XTtcclxuICAgICAgICAgICAgVGV4dENvbG9yID0gbmV3IGludFt3aWR0aCwgaGVpZ2h0XTtcclxuICAgICAgICAgICAgQmFja0NvbG9yID0gbmV3IGludFt3aWR0aCwgaGVpZ2h0XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlc2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgnICcsIDAsIDAsIFdpZHRoLCBIZWlnaHQsIDAsIDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVzZXRJbnZpc2libGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKElOVklTSUJMRUNIQVIsIDAsIDAsIFdpZHRoLCBIZWlnaHQsIElOVklTSUJMRUNPTE9SLCBJTlZJU0lCTEVDT0xPUik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGludCBXaWR0aCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5zZXJ0KFRleHRCb2FyZCBzZWNvbmRCb2FyZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgc2Vjb25kQm9hcmQuV2lkdGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBzZWNvbmRCb2FyZC5IZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgeCA9IChpbnQpc2Vjb25kQm9hcmQuUG9zaXRpb24uWCArIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHkgPSAoaW50KXNlY29uZEJvYXJkLlBvc2l0aW9uLlkgKyBqO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRCb2FyZC5jaGFyc1tpLCBqXSAhPSBJTlZJU0lCTEVDSEFSKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFyc1t4LCB5XSA9IHNlY29uZEJvYXJkLmNoYXJzW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRCb2FyZC5UZXh0Q29sb3JbaSwgal0gIT0gSU5WSVNJQkxFQ09MT1IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRleHRDb2xvclt4LCB5XSA9IHNlY29uZEJvYXJkLlRleHRDb2xvcltpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kQm9hcmQuQmFja0NvbG9yW2ksIGpdICE9IElOVklTSUJMRUNPTE9SKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYWNrQ29sb3JbeCwgeV0gPSBzZWNvbmRCb2FyZC5CYWNrQ29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSGVpZ2h0IHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgQ3Vyc29yWFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGN1cnNvclg7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclggPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgaW50IEN1cnNvclkgeyBnZXQgeyByZXR1cm4gY3Vyc29yWTsgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yWSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3T25lRGlnaXQoaW50IGksIGludCB4LCBpbnQgeSwgaW50IGNvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNoYXIgYyA9IChjaGFyKShpICsgJzAnKTtcclxuICAgICAgICAgICAgRHJhd0NoYXIoYywgeCwgeSwgY29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXQoVGV4dEJvYXJkIG9yaWdpbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUG9zaXRpb24gPSBvcmlnaW4uUG9zaXRpb247XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgV2lkdGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBIZWlnaHQ7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXJzW2ksIGpdID0gb3JpZ2luLmNoYXJzW2ksIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQmFja0NvbG9yW2ksIGpdID0gb3JpZ2luLkJhY2tDb2xvcltpLCBqXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRleHRDb2xvcltpLCBqXSA9IG9yaWdpbi5UZXh0Q29sb3JbaSwgal07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVzaXplKGludCB3LCBpbnQgaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjaGFycyA9PSBudWxsIHx8IHcgPiBjaGFycy5HZXRMZW5ndGgoMCkgfHwgaCA+IGNoYXJzLkdldExlbmd0aCgxKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU2V0TWF4U2l6ZSh3LCBoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBXaWR0aCA9IHc7XHJcbiAgICAgICAgICAgIEhlaWdodCA9IGg7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNoYXIgQ2hhckF0KGludCBpLCBpbnQgailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBjaGFyc1tpLCBqXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldEN1cnNvckF0KGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN1cnNvclggPSB4O1xyXG4gICAgICAgICAgICBjdXJzb3JZID0geTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdfQ3Vyc29yKHN0cmluZyB2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGMgaW4gdilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd19DdXJzb3IoYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdfQ3Vyc29yKHN0cmluZyB2LCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYyBpbiB2KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEcmF3X0N1cnNvcihjLCBjb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdPbmVEaWdpdF9DdXJzb3IoaW50IGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3X0N1cnNvcigoY2hhcikoaSArICcwJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd19DdXJzb3IoY2hhciBjKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIERyYXdDaGFyKGMsIGN1cnNvclgsIGN1cnNvclkpO1xyXG4gICAgICAgICAgICBBZHZhbmNlQ3Vyc29yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3X0N1cnNvcihjaGFyIGMsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBEcmF3Q2hhcihjLCBjdXJzb3JYLCBjdXJzb3JZLCBjb2xvcik7XHJcbiAgICAgICAgICAgIEFkdmFuY2VDdXJzb3IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBBZHZhbmNlQ3Vyc29yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN1cnNvclgrKztcclxuICAgICAgICAgICAgaWYgKGN1cnNvclggPj0gV2lkdGgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvclggPSAwO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yWSsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBDdXJzb3JOZXdMaW5lKGludCB4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3Vyc29yWSsrO1xyXG4gICAgICAgICAgICBjdXJzb3JYID0geDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdDaGFyKGNoYXIgdiwgaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHYgIT0gTk9DSEFOR0VDSEFSKVxyXG4gICAgICAgICAgICAgICAgY2hhcnNbeCwgeV0gPSB2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd0NoYXIoY2hhciB2LCBpbnQgeCwgaW50IHksIGludCBjb2xvciwgaW50IGJhY2tDb2xvciA9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgRHJhd0NoYXIodiwgeCwgeSk7XHJcbiAgICAgICAgICAgIFNldENvbG9yKGNvbG9yLCB4LCB5KTtcclxuICAgICAgICAgICAgU2V0QmFja0NvbG9yKGJhY2tDb2xvciwgeCwgeSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNldEFsbChjaGFyIHRleHQsIGludCB0ZXh0Q29sb3IsIGludCBiYWNrQ29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQodGV4dCwgMCwgMCwgV2lkdGgsIEhlaWdodCwgdGV4dENvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd1dpdGhHcmlkKHN0cmluZyB0ZXh0LCBpbnQgeCwgaW50IHksIGludCBncmlkQ29sb3IsIGludCB0ZXh0Q29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgd2lkdGggPSB0ZXh0Lkxlbmd0aDtcclxuICAgICAgICAgICAgRHJhd0dyaWQoeCwgeSwgd2lkdGggKyAyLCAzLCBncmlkQ29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3KHRleHQsIHggKyAxLCB5ICsgMSwgdGV4dENvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoc3RyaW5nIHYsIGludCB4LCBpbnQgeSwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdi5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRHJhd0NoYXIodltpXSwgeCArIGksIHksIGNvbG9yLCBiYWNrQ29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KElFbnVtZXJhYmxlPGNoYXI+IHYsIGludCB4LCBpbnQgeSwgaW50IGNvbG9yLCBpbnQgYmFja0NvbG9yID0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Db3VudDxjaGFyPih2KTsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEcmF3Q2hhcihTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkVsZW1lbnRBdDxjaGFyPih2LGkpLCB4ICsgaSwgeSwgY29sb3IsIGJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdHcmlkKGludCB4LCBpbnQgeSwgaW50IHdpZHRoLCBpbnQgaGVpZ2h0LCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgRHJhd1JlcGVhdGVkKCd8JywgeCwgeSwgMSwgaGVpZ2h0LCBjb2xvcik7XHJcbiAgICAgICAgICAgIERyYXdSZXBlYXRlZCgnfCcsIHggKyB3aWR0aCAtIDEsIHksIDEsIGhlaWdodCwgY29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoJy0nLCB4LCB5LCB3aWR0aCwgMSwgY29sb3IpO1xyXG4gICAgICAgICAgICBEcmF3UmVwZWF0ZWQoJy0nLCB4LCB5ICsgaGVpZ2h0IC0gMSwgd2lkdGgsIDEsIGNvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdSZXBlYXRlZChjaGFyIGMsIGludCB4LCBpbnQgeSwgaW50IHdpZHRoLCBpbnQgaGVpZ2h0LCBpbnQgY29sb3IsIGludCBiYWNrQ29sb3IgPSBOT0NIQU5HRUNPTE9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IHg7IGkgPCB4ICsgd2lkdGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IHk7IGogPCB5ICsgaGVpZ2h0OyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRHJhd0NoYXIoYywgaSwgaiwgY29sb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBTZXRCYWNrQ29sb3IoYmFja0NvbG9yLCBpLCBqKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0Q29sb3IoaW50IGNvbG9yLCBpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY29sb3IgIT0gTk9DSEFOR0VDT0xPUilcclxuICAgICAgICAgICAgICAgIFRleHRDb2xvclt4LCB5XSA9IGNvbG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0QmFja0NvbG9yKGludCBjb2xvciwgaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNvbG9yICE9IE5PQ0hBTkdFQ09MT1IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEJhY2tDb2xvclt4LCB5XSA9IGNvbG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KHN0cmluZyB2LCBpbnQgeDIsIGludCB5Miwgb2JqZWN0IGlucHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3R3JpZChpbnQgdjEsIGludCB2MiwgaW50IHYzLCBpbnQgdjQsIG9iamVjdCBib2FyZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG4vL3VzaW5nIFN5c3RlbS5EcmF3aW5nO1xyXG51c2luZyBTeXN0ZW0uR2xvYmFsaXphdGlvbjtcclxuXHJcbm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBbU2VyaWFsaXphYmxlXVxyXG4gICAgcHVibGljIHN0cnVjdCBWZWN0b3IyRCA6IElFcXVhdGFibGU8VmVjdG9yMkQ+XHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBWZWN0b3IyRCB6ZXJvVmVjdG9yID0gbmV3IFZlY3RvcjJEKDBmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yMkQgdW5pdFZlY3RvciA9IG5ldyBWZWN0b3IyRCgxZiwgMWYpO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFZlY3RvcjJEIHVuaXRYVmVjdG9yID0gbmV3IFZlY3RvcjJEKDFmLCAwZik7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVmVjdG9yMkQgdW5pdFlWZWN0b3IgPSBuZXcgVmVjdG9yMkQoMGYsIDFmKTtcclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQcml2YXRlIEZpZWxkc1xyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQdWJsaWMgRmllbGRzXHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBYO1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBZO1xyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBGaWVsZHNcclxuXHJcbiAgICAgICAgI3JlZ2lvbiBDb25zdGFudHNcclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFByb3BlcnRpZXNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBaZXJvXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gemVyb1ZlY3RvcjsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBPbmVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB1bml0VmVjdG9yOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIFVuaXRYXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdW5pdFhWZWN0b3I7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgVW5pdFlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB1bml0WVZlY3RvcjsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBQcm9wZXJ0aWVzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMkQoZmxvYXQgeCwgZmxvYXQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuWCA9IHg7XHJcbiAgICAgICAgICAgIHRoaXMuWSA9IHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMkQoZmxvYXQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlggPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5ZID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIEludGVycG9sYXRlUm91bmRlZChWZWN0b3IyRCBzdGFydFBvc2l0aW9uLCBWZWN0b3IyRCBlbmRQb3NpdGlvbiwgZmxvYXQgcmF0aW8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKHN0YXJ0UG9zaXRpb24gKiAoMSAtIHJhdGlvKSArIGVuZFBvc2l0aW9uICogcmF0aW8pLlJvdW5kKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFZlY3RvcjJEIFJvdW5kKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQoKGZsb2F0KU1hdGguUm91bmQoWCksIChmbG9hdClNYXRoLlJvdW5kKFkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb24gQ29uc3RydWN0b3JzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgQWRkKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKz0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICs9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIEFkZChyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCArIHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICsgdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEaXN0YW5jZShWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHYxID0gdmFsdWUxLlggLSB2YWx1ZTIuWCwgdjIgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gKGZsb2F0KU1hdGguU3FydCgodjEgKiB2MSkgKyAodjIgKiB2MikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpc3RhbmNlKHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBmbG9hdCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2MSA9IHZhbHVlMS5YIC0gdmFsdWUyLlgsIHYyID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gKGZsb2F0KU1hdGguU3FydCgodjEgKiB2MSkgKyAodjIgKiB2MikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEaXN0YW5jZVNxdWFyZWQoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB2MSA9IHZhbHVlMS5YIC0gdmFsdWUyLlgsIHYyID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuICh2MSAqIHYxKSArICh2MiAqIHYyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXN0YW5jZVNxdWFyZWQocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IGZsb2F0IHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHYxID0gdmFsdWUxLlggLSB2YWx1ZTIuWCwgdjIgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXN1bHQgPSAodjEgKiB2MSkgKyAodjIgKiB2Mik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIERpdmlkZShWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC89IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAvPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEaXZpZGUocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggLyB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAvIHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBEaXZpZGUoVmVjdG9yMkQgdmFsdWUxLCBmbG9hdCBkaXZpZGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgZmFjdG9yID0gMSAvIGRpdmlkZXI7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERpdmlkZShyZWYgVmVjdG9yMkQgdmFsdWUxLCBmbG9hdCBkaXZpZGVyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgZmFjdG9yID0gMSAvIGRpdmlkZXI7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggKiBmYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKiBmYWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERvdChWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAodmFsdWUxLlggKiB2YWx1ZTIuWCkgKyAodmFsdWUxLlkgKiB2YWx1ZTIuWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRG90KHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBmbG9hdCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQgPSAodmFsdWUxLlggKiB2YWx1ZTIuWCkgKyAodmFsdWUxLlkgKiB2YWx1ZTIuWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBFcXVhbHMob2JqZWN0IG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChvYmogaXMgVmVjdG9yMkQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBFcXVhbHMoKFZlY3RvcjJEKXRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBFcXVhbHMoVmVjdG9yMkQgb3RoZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKFggPT0gb3RoZXIuWCkgJiYgKFkgPT0gb3RoZXIuWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIFJlZmxlY3QoVmVjdG9yMkQgdmVjdG9yLCBWZWN0b3IyRCBub3JtYWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBWZWN0b3IyRCByZXN1bHQ7XHJcbiAgICAgICAgICAgIGZsb2F0IHZhbCA9IDIuMGYgKiAoKHZlY3Rvci5YICogbm9ybWFsLlgpICsgKHZlY3Rvci5ZICogbm9ybWFsLlkpKTtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2ZWN0b3IuWCAtIChub3JtYWwuWCAqIHZhbCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmVjdG9yLlkgLSAobm9ybWFsLlkgKiB2YWwpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFJlZmxlY3QocmVmIFZlY3RvcjJEIHZlY3RvciwgcmVmIFZlY3RvcjJEIG5vcm1hbCwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHZhbCA9IDIuMGYgKiAoKHZlY3Rvci5YICogbm9ybWFsLlgpICsgKHZlY3Rvci5ZICogbm9ybWFsLlkpKTtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2ZWN0b3IuWCAtIChub3JtYWwuWCAqIHZhbCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmVjdG9yLlkgLSAobm9ybWFsLlkgKiB2YWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGludCBHZXRIYXNoQ29kZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gWC5HZXRIYXNoQ29kZSgpICsgWS5HZXRIYXNoQ29kZSgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBMZW5ndGgoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChmbG9hdClNYXRoLlNxcnQoKFggKiBYKSArIChZICogWSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IExlbmd0aFNxdWFyZWQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChYICogWCkgKyAoWSAqIFkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE1heChWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQodmFsdWUxLlggPiB2YWx1ZTIuWCA/IHZhbHVlMS5YIDogdmFsdWUyLlgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTEuWSA+IHZhbHVlMi5ZID8gdmFsdWUxLlkgOiB2YWx1ZTIuWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWF4KHJlZiBWZWN0b3IyRCB2YWx1ZTEsIHJlZiBWZWN0b3IyRCB2YWx1ZTIsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YID4gdmFsdWUyLlggPyB2YWx1ZTEuWCA6IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZID4gdmFsdWUyLlkgPyB2YWx1ZTEuWSA6IHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBNaW4oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHZhbHVlMS5YIDwgdmFsdWUyLlggPyB2YWx1ZTEuWCA6IHZhbHVlMi5YLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUxLlkgPCB2YWx1ZTIuWSA/IHZhbHVlMS5ZIDogdmFsdWUyLlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1pbihyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCA8IHZhbHVlMi5YID8gdmFsdWUxLlggOiB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSA8IHZhbHVlMi5ZID8gdmFsdWUxLlkgOiB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgTXVsdGlwbHkoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE11bHRpcGx5KFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgc2NhbGVGYWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTXVsdGlwbHkocmVmIFZlY3RvcjJEIHZhbHVlMSwgZmxvYXQgc2NhbGVGYWN0b3IsIG91dCBWZWN0b3IyRCByZXN1bHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQuWCA9IHZhbHVlMS5YICogc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gdmFsdWUxLlkgKiBzY2FsZUZhY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNdWx0aXBseShyZWYgVmVjdG9yMkQgdmFsdWUxLCByZWYgVmVjdG9yMkQgdmFsdWUyLCBvdXQgVmVjdG9yMkQgcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZTEuWCAqIHZhbHVlMi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlMS5ZICogdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE5lZ2F0ZShWZWN0b3IyRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlLlggPSAtdmFsdWUuWDtcclxuICAgICAgICAgICAgdmFsdWUuWSA9IC12YWx1ZS5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTmVnYXRlKHJlZiBWZWN0b3IyRCB2YWx1ZSwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gLXZhbHVlLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ZID0gLXZhbHVlLlk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBOb3JtYWxpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgdmFsID0gMS4wZiAvIChmbG9hdClNYXRoLlNxcnQoKFggKiBYKSArIChZICogWSkpO1xyXG4gICAgICAgICAgICBYICo9IHZhbDtcclxuICAgICAgICAgICAgWSAqPSB2YWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIE5vcm1hbGl6ZShWZWN0b3IyRCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHZhbCA9IDEuMGYgLyAoZmxvYXQpTWF0aC5TcXJ0KCh2YWx1ZS5YICogdmFsdWUuWCkgKyAodmFsdWUuWSAqIHZhbHVlLlkpKTtcclxuICAgICAgICAgICAgdmFsdWUuWCAqPSB2YWw7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gdmFsO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTm9ybWFsaXplKHJlZiBWZWN0b3IyRCB2YWx1ZSwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHZhbCA9IDEuMGYgLyAoZmxvYXQpTWF0aC5TcXJ0KCh2YWx1ZS5YICogdmFsdWUuWCkgKyAodmFsdWUuWSAqIHZhbHVlLlkpKTtcclxuICAgICAgICAgICAgcmVzdWx0LlggPSB2YWx1ZS5YICogdmFsO1xyXG4gICAgICAgICAgICByZXN1bHQuWSA9IHZhbHVlLlkgKiB2YWw7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgU3VidHJhY3QoVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAtPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLT0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU3VidHJhY3QocmVmIFZlY3RvcjJEIHZhbHVlMSwgcmVmIFZlY3RvcjJEIHZhbHVlMiwgb3V0IFZlY3RvcjJEIHJlc3VsdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5YID0gdmFsdWUxLlggLSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgcmVzdWx0LlkgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDdWx0dXJlSW5mbyBjdXJyZW50Q3VsdHVyZSA9IEN1bHR1cmVJbmZvLkN1cnJlbnRDdWx0dXJlO1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChjdXJyZW50Q3VsdHVyZSwgXCJ7e1g6ezB9IFk6ezF9fX1cIiwgbmV3IG9iamVjdFtdIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuWC5Ub1N0cmluZyhjdXJyZW50Q3VsdHVyZSksIHRoaXMuWS5Ub1N0cmluZyhjdXJyZW50Q3VsdHVyZSkgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIFB1YmxpYyBNZXRob2RzXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIE9wZXJhdG9yc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yIC0oVmVjdG9yMkQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZS5YID0gLXZhbHVlLlg7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgPSAtdmFsdWUuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciA9PShWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTEuWCA9PSB2YWx1ZTIuWCAmJiB2YWx1ZTEuWSA9PSB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgIT0oVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxLlggIT0gdmFsdWUyLlggfHwgdmFsdWUxLlkgIT0gdmFsdWUyLlk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciArKFZlY3RvcjJEIHZhbHVlMSwgVmVjdG9yMkQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKz0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICs9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgLShWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC09IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAtPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yICooVmVjdG9yMkQgdmFsdWUxLCBWZWN0b3IyRCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyRCBvcGVyYXRvciAqKFZlY3RvcjJEIHZhbHVlLCBmbG9hdCBzY2FsZUZhY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlLlggKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHZhbHVlLlkgKj0gc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yICooZmxvYXQgc2NhbGVGYWN0b3IsIFZlY3RvcjJEIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUuWCAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUuWSAqPSBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMkQgb3BlcmF0b3IgLyhWZWN0b3IyRCB2YWx1ZTEsIFZlY3RvcjJEIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC89IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAvPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjJEIG9wZXJhdG9yIC8oVmVjdG9yMkQgdmFsdWUxLCBmbG9hdCBkaXZpZGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgZmFjdG9yID0gMSAvIGRpdmlkZXI7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBPcGVyYXRvcnNcclxuICAgIH1cclxufSIsInVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCYXR0bGVSZW5kZXIgOiBJVGV4dFNjcmVlblxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgVHVybkJhc2VUcnlWYWx1ZXMgdHVybkJhc2VUcnk7XHJcbiAgICAgICAgcHJpdmF0ZSBQb3NpdGlvbkFuaW1hdGlvbiBwb3NBbmltO1xyXG4gICAgICAgIHByaXZhdGUgVGV4dFdvcmxkIHRleHRXb3JsZDtcclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBUZXh0Qm9hcmQgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIGludCBpbnB1dDtcclxuICAgICAgICBwdWJsaWMgaW50IElucHV0IHsgZ2V0IHsgcmV0dXJuIGlucHV0OyB9IHNldCB7IGlucHV0ID0gdmFsdWU7IC8vQ29uc29sZS5Xcml0ZUxpbmUodmFsdWUpO1xyXG4gICAgICAgICAgICB9IH1cclxuICAgICAgICAvL3B1YmxpYyBMaXN0PERlbGF5ZWRBY3Rpb25zPiB0YXNrcyA9IG5ldyBMaXN0PERlbGF5ZWRBY3Rpb25zPigpO1xyXG4gICAgICAgIERpY3Rpb25hcnk8b2JqZWN0LCBzdHJpbmc+IG1vdmVDaGFycztcclxuICAgICAgICBEaWN0aW9uYXJ5PG9iamVjdCwgc3RyaW5nPiBtb3ZlRGVzY3JpcHRpb25zID0gbmV3IERpY3Rpb25hcnk8b2JqZWN0LCBzdHJpbmc+KCk7XHJcbiAgICAgICAgRGljdGlvbmFyeTxNaXNjQmF0dGxlSW5wdXQsIHN0cmluZz4gbWlzY0Rlc2NyaXB0aW9ucyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PE1pc2NCYXR0bGVJbnB1dCwgc3RyaW5nPigpLChfbzEpPT57X28xLkFkZChNaXNjQmF0dGxlSW5wdXQuRG9uZSxcIkRvbmVcIik7X28xLkFkZChNaXNjQmF0dGxlSW5wdXQuUmVkbyxcIlJlZG9cIik7cmV0dXJuIF9vMTt9KTtcclxuICAgICAgICBwcml2YXRlIERpY3Rpb25hcnk8SW5wdXQsIHN0cmluZz4gbW92ZUJ1dHRvbnM7XHJcbiAgICAgICAgcHJpdmF0ZSBEaWN0aW9uYXJ5PElucHV0LCBJbnB1dEtleT4gbW92ZUtleXM7XHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBkZWJ1Z09uID0gdHJ1ZTtcclxuICAgICAgICBwcml2YXRlIGludCBncmlkU2NhbGU7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgZ3JpZE9mZnNldHg7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgZ3JpZE9mZnNldHk7XHJcbiAgICAgICAgVGV4dEVudGl0eVtdIGJhdHRsZXJFbnRpdGllcztcclxuXHJcbiAgICAgICAgY2hhcltdW10gZW50aXRpZXNDaGFycztcclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVSZW5kZXIoVHVybkJhc2VUcnlWYWx1ZXMgYmF0dGxlTG9naWMpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgc3RyaW5nW10gZW50aXR5VGV4dHMgPSB7IFwiQFwiLCBcIiZcIiwgXCIlXCIsIFwiJFwiLCBcIlgyXCIsIFwiWDNcIiB9O1xyXG4gICAgICAgICAgICBlbnRpdGllc0NoYXJzID0gbmV3IGNoYXJbZW50aXR5VGV4dHMuTGVuZ3RoXVtdO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGVudGl0eVRleHRzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbnRpdGllc0NoYXJzW2ldID0gZW50aXR5VGV4dHNbaV0uVG9DaGFyQXJyYXkoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdHVybkJhc2VUcnkgPSBiYXR0bGVMb2dpYztcclxuXHJcbiAgICAgICAgICAgIHRleHRXb3JsZCA9IG5ldyBUZXh0V29ybGQoKTtcclxuICAgICAgICAgICAgcG9zQW5pbSA9IHRleHRXb3JsZC5BZGRBbmltYXRpb248Z2xvYmFsOjpQaWRyb2guVGV4dFJlbmRlcmluZy5Qb3NpdGlvbkFuaW1hdGlvbj4obmV3IFBvc2l0aW9uQW5pbWF0aW9uKCkpO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQuSW5pdCg3MCwgMjUpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQgPSB0ZXh0V29ybGQubWFpbkJvYXJkO1xyXG4gICAgICAgICAgICAvL1RleHRCb2FyZCA9IG5ldyBUZXh0Qm9hcmQoNzAsIDI1KTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIHBvc0FuaW0gPSB0ZXh0V29ybGQuQWRkQW5pbWF0aW9uKG5ldyBQb3NpdGlvbkFuaW1hdGlvbigpKTtcclxuICAgICAgICAgICAgdmFyIGJsaW5rQW5pbSA9IHRleHRXb3JsZC5BZGRBbmltYXRpb248Z2xvYmFsOjpQaWRyb2guVGV4dFJlbmRlcmluZy5CbGlua0FuaW0+KG5ldyBCbGlua0FuaW0oKSk7XHJcblxyXG4gICAgICAgICAgICBiYXR0bGVyRW50aXRpZXMgPSBuZXcgVGV4dEVudGl0eVt0dXJuQmFzZVRyeS5lbnRpdGllcy5Db3VudF07XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgYmF0dGxlckVudGl0aWVzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYXR0bGVyRW50aXRpZXNbaV0gPSB0ZXh0V29ybGQuR2V0RnJlZUVudGl0eSgyLCAyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdHVybkJhc2VUcnkuaGFwcE1hbmFnZXIuQWRkSGFuZGxlcihuZXcgSGFwcHMuSGFwcEhhbmRsZXIoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLlR1cm5CYXNlVHJ5VmFsdWVzLkhhcHBUYWcuQXR0YWNrSGl0LCAoaCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGF0dGFja2VyID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaC5HZXRBdHRyaWJ1dGVfSW50KDEpXTtcclxuICAgICAgICAgICAgICAgIHZhciBkZWZlbmRlciA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW2guR2V0QXR0cmlidXRlX0ludCgwKV07XHJcbiAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuVHVybkJhc2VUcnlWYWx1ZXMuRWxlbWVudCBlbGVtZW50ID0gKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5UdXJuQmFzZVRyeVZhbHVlcy5FbGVtZW50KWguR2V0QXR0cmlidXRlX0ludCgyKTtcclxuICAgICAgICAgICAgICAgIFRleHRFbnRpdHkgZmUgPSBHZXRQcm9qVGV4dEVudGl0eShlbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zID0gYXR0YWNrZXIuUG9zaXRpb25WMkQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zMiA9IGRlZmVuZGVyLlBvc2l0aW9uVjJEO1xyXG4gICAgICAgICAgICAgICAgdmFyIHhEaXMgPSBNYXRoLkFicyhwb3MuWCAtIHBvczIuWCk7XHJcbiAgICAgICAgICAgICAgICBmbG9hdCB0aW1lID0gKGZsb2F0KXhEaXMgKiAwLjFmO1xyXG5cclxuICAgICAgICAgICAgICAgIHBvc0FuaW0uQWRkKGZlLkFuaW1CYXNlKHRpbWUpLCBuZXcgUG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhKFxyXG4gICAgICAgICAgICAgICAgICAgIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oYXR0YWNrZXIuUG9zaXRpb25WMkQpLFxyXG4gICAgICAgICAgICAgICAgICAgIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24oZGVmZW5kZXIuUG9zaXRpb25WMkQpKSk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIHR1cm5CYXNlVHJ5LmhhcHBNYW5hZ2VyLkFkZEhhbmRsZXIobmV3IEhhcHBzLkhhcHBIYW5kbGVyKFR1cm5CYXNlVHJ5VmFsdWVzLkhhcHBUYWcuRGFtYWdlVGFrZW4sIChoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVmZW5kZXIgPSB0dXJuQmFzZVRyeS5lbnRpdGllc1toLkdldEF0dHJpYnV0ZV9JbnQoMCldO1xyXG4gICAgICAgICAgICAgICAgdmFyIGZlID0gdGV4dFdvcmxkLkdldFRlbXBFbnRpdHkoMSwgMSk7XHJcbiAgICAgICAgICAgICAgICBmZS5vcmlnaW4uRHJhd0NoYXIoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgMCwgMCk7XHJcbiAgICAgICAgICAgICAgICBmZS5vcmlnaW4uUG9zaXRpb24gPSBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKGRlZmVuZGVyLlBvc2l0aW9uVjJEKTtcclxuICAgICAgICAgICAgICAgIGJsaW5rQW5pbS5BZGQoZmUuQW5pbUJhc2UoMC41ZiksIEJsaW5rQW5pbS5CbGlua0RhdGEuQ2hhcignICcsIDAuMWYpKTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgdHVybkJhc2VUcnkuaGFwcE1hbmFnZXIuQWRkSGFuZGxlcihuZXcgSGFwcHMuSGFwcEhhbmRsZXIoVHVybkJhc2VUcnlWYWx1ZXMuSGFwcFRhZy5BdHRhY2tNaXNzLCAoaCkgPT5cclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhdHRhY2tlciA9IHR1cm5CYXNlVHJ5LmVudGl0aWVzW2guR2V0QXR0cmlidXRlX0ludCgwKV07XHJcbiAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuVHVybkJhc2VUcnlWYWx1ZXMuRWxlbWVudCBlbGVtZW50ID0gKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5UdXJuQmFzZVRyeVZhbHVlcy5FbGVtZW50KWguR2V0QXR0cmlidXRlX0ludCgxKTtcclxuICAgICAgICAgICAgICAgIFRleHRFbnRpdHkgZmUgPSBHZXRQcm9qVGV4dEVudGl0eShlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIHZhciBwb3MgPSBhdHRhY2tlci5Qb3NpdGlvblYyRDtcclxuICAgICAgICAgICAgICAgIHZhciBwb3MyID0gcG9zO1xyXG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja2VyLlR5cGUgPT0gVHVybkJhc2VUcnlWYWx1ZXMuRW50aXR5VHlwZS5lbmVteSlcclxuICAgICAgICAgICAgICAgICAgICBwb3MyLlggPSAtMTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBwb3MyLlggPSA2O1xyXG4gICAgICAgICAgICAgICAgdmFyIHhEaXMgPSBNYXRoLkFicyhwb3MuWCAtIHBvczIuWCk7XHJcbiAgICAgICAgICAgICAgICBmbG9hdCB0aW1lID0gKGZsb2F0KXhEaXMgKiAwLjFmO1xyXG4gICAgICAgICAgICAgICAgcG9zQW5pbS5BZGQoZmUuQW5pbUJhc2UodGltZSksIG5ldyBQb3NpdGlvbkFuaW1hdGlvbi5Qb3NpdGlvbkRhdGEoXHJcbiAgICAgICAgICAgICAgICAgICAgQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihwb3MpLFxyXG4gICAgICAgICAgICAgICAgICAgIEJhdHRsZUVudGl0eVRvU2NyZWVuUG9zaXRpb24ocG9zMikpKTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgdHVybkJhc2VUcnkuaGFwcE1hbmFnZXIuQWRkSGFuZGxlcihuZXcgSGFwcHMuSGFwcEhhbmRsZXIoVHVybkJhc2VUcnlWYWx1ZXMuSGFwcFRhZy5Nb3ZlbWVudEZhaWwsIChoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgZUlkID0gaC5HZXRBdHRyaWJ1dGVfSW50KDApO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vdmVyID0gdHVybkJhc2VUcnkuZW50aXRpZXNbZUlkXTtcclxuICAgICAgICAgICAgICAgIHZhciB4ID0gaC5HZXRBdHRyaWJ1dGVfSW50KDEpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHkgPSBoLkdldEF0dHJpYnV0ZV9JbnQoMik7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zID0gbW92ZXIuUG9zaXRpb25WMkQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zMiA9IG5ldyBWZWN0b3IyRCh4LCB5KTtcclxuICAgICAgICAgICAgICAgIHZhciBwb3NGID0gKHBvcyArIHBvczIpIC8gMjtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZmUgPSBiYXR0bGVyRW50aXRpZXNbZUlkXTtcclxuICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJNb3ZlIGZhaWxcIik7XHJcbiAgICAgICAgICAgICAgICBwb3NBbmltLkFkZChmZS5BbmltQmFzZSgwLjJmKSwgbmV3IFBvc2l0aW9uQW5pbWF0aW9uLlBvc2l0aW9uRGF0YShcclxuICAgICAgICAgICAgICAgICAgICBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKG1vdmVyLlBvc2l0aW9uVjJEKSxcclxuICAgICAgICAgICAgICAgICAgICBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKHBvc0YpKSk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIG1vdmVDaGFycyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PG9iamVjdCwgc3RyaW5nPigpLChfbzIpPT57X28yLkFkZChUdXJuQmFzZVRyeVZhbHVlcy5Nb3ZlVHlwZS5GaXJlLFwiRlwiKTtfbzIuQWRkKFR1cm5CYXNlVHJ5VmFsdWVzLk1vdmVUeXBlLkljZSxcIklcIik7X28yLkFkZChUdXJuQmFzZVRyeVZhbHVlcy5Nb3ZlVHlwZS5UaHVuZGVyLFwiVFwiKTtfbzIuQWRkKFR1cm5CYXNlVHJ5VmFsdWVzLk1vdmVUeXBlLk5vcm1hbFNob3QsXCJHXCIpO19vMi5BZGQoVHVybkJhc2VUcnlWYWx1ZXMuTW92ZVR5cGUuTW92ZVJpZ2h0LFwiPlwiKTtfbzIuQWRkKFR1cm5CYXNlVHJ5VmFsdWVzLk1vdmVUeXBlLk1vdmVVcCxcIl5cIik7X28yLkFkZChUdXJuQmFzZVRyeVZhbHVlcy5Nb3ZlVHlwZS5Nb3ZlRG93bixcInZcIik7X28yLkFkZChUdXJuQmFzZVRyeVZhbHVlcy5Nb3ZlVHlwZS5Nb3ZlTGVmdCxcIjxcIik7X28yLkFkZChUdXJuQmFzZVRyeVZhbHVlcy5Nb3ZlVHlwZS5Eb05vdGhpbmcsXCIgXCIpO3JldHVybiBfbzI7fSk7XHJcblxyXG4gICAgICAgICAgICBtb3ZlRGVzY3JpcHRpb25zID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8b2JqZWN0LCBzdHJpbmc+KCksKF9vMyk9PntfbzMuQWRkKFR1cm5CYXNlVHJ5VmFsdWVzLk1vdmVUeXBlLkljZSxcIkljZSBTaG90XCIpO19vMy5BZGQoVHVybkJhc2VUcnlWYWx1ZXMuTW92ZVR5cGUuRmlyZSxcIkZpcmUgU2hvdFwiKTtfbzMuQWRkKFR1cm5CYXNlVHJ5VmFsdWVzLk1vdmVUeXBlLlRodW5kZXIsXCJUaHVuZGVyIFNob3RcIik7X28zLkFkZChUdXJuQmFzZVRyeVZhbHVlcy5Nb3ZlVHlwZS5Ob3JtYWxTaG90LFwiR3VuXCIpO19vMy5BZGQoVHVybkJhc2VUcnlWYWx1ZXMuTW92ZVR5cGUuTW92ZVJpZ2h0LFwiPlwiKTtfbzMuQWRkKFR1cm5CYXNlVHJ5VmFsdWVzLk1vdmVUeXBlLk1vdmVVcCxcIl5cIik7X28zLkFkZChUdXJuQmFzZVRyeVZhbHVlcy5Nb3ZlVHlwZS5Nb3ZlRG93bixcInZcIik7X28zLkFkZChUdXJuQmFzZVRyeVZhbHVlcy5Nb3ZlVHlwZS5Nb3ZlTGVmdCxcIjxcIik7cmV0dXJuIF9vMzt9KTtcclxuXHJcbiAgICAgICAgICAgIG1vdmVCdXR0b25zID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8SW5wdXQsIHN0cmluZz4oKSwoX280KT0+e19vNC5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBUdXJuQmFzZVRyeVZhbHVlcy5Nb3ZlVHlwZS5Ob3JtYWxTaG90KSxcImdcIik7X280LkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIFR1cm5CYXNlVHJ5VmFsdWVzLk1vdmVUeXBlLkZpcmUpLFwiZlwiKTtfbzQuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgVHVybkJhc2VUcnlWYWx1ZXMuTW92ZVR5cGUuSWNlKSxcImlcIik7X280LkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIFR1cm5CYXNlVHJ5VmFsdWVzLk1vdmVUeXBlLlRodW5kZXIpLFwidFwiKTtfbzQuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgVHVybkJhc2VUcnlWYWx1ZXMuTW92ZVR5cGUuTW92ZVJpZ2h0KSxcImRcIik7X280LkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIFR1cm5CYXNlVHJ5VmFsdWVzLk1vdmVUeXBlLk1vdmVVcCksXCJ3XCIpO19vNC5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBUdXJuQmFzZVRyeVZhbHVlcy5Nb3ZlVHlwZS5Nb3ZlRG93biksXCJzXCIpO19vNC5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBUdXJuQmFzZVRyeVZhbHVlcy5Nb3ZlVHlwZS5Nb3ZlTGVmdCksXCJhXCIpO19vNC5BZGQobmV3IElucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuRG9uZSksXCJTcGFjZVwiKTtfbzQuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTWlzY0JhdHRsZSwgTWlzY0JhdHRsZUlucHV0LlJlZG8pLFwiclwiKTtyZXR1cm4gX280O30pO1xyXG5cclxuICAgICAgICAgICAgbW92ZUtleXMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxJbnB1dCwgSW5wdXRLZXk+KCksKF9vNSk9PntfbzUuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgVHVybkJhc2VUcnlWYWx1ZXMuTW92ZVR5cGUuVGh1bmRlciksSW5wdXRLZXkuVEhVTkRFUik7X281LkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIFR1cm5CYXNlVHJ5VmFsdWVzLk1vdmVUeXBlLkljZSksSW5wdXRLZXkuSUNFKTtfbzUuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgVHVybkJhc2VUcnlWYWx1ZXMuTW92ZVR5cGUuRmlyZSksSW5wdXRLZXkuRklSRSk7X281LkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIFR1cm5CYXNlVHJ5VmFsdWVzLk1vdmVUeXBlLk5vcm1hbFNob3QpLElucHV0S2V5Lk5PUk1BTFNIT1QpO19vNS5BZGQobmV3IElucHV0KElucHV0VHlwZS5Nb3ZlLCBUdXJuQmFzZVRyeVZhbHVlcy5Nb3ZlVHlwZS5Nb3ZlUmlnaHQpLElucHV0S2V5LlJJR0hUKTtfbzUuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgVHVybkJhc2VUcnlWYWx1ZXMuTW92ZVR5cGUuTW92ZVVwKSxJbnB1dEtleS5VUCk7X281LkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1vdmUsIFR1cm5CYXNlVHJ5VmFsdWVzLk1vdmVUeXBlLk1vdmVEb3duKSxJbnB1dEtleS5ET1dOKTtfbzUuQWRkKG5ldyBJbnB1dChJbnB1dFR5cGUuTW92ZSwgVHVybkJhc2VUcnlWYWx1ZXMuTW92ZVR5cGUuTW92ZUxlZnQpLElucHV0S2V5LkxFRlQpO19vNS5BZGQobmV3IElucHV0KElucHV0VHlwZS5NaXNjQmF0dGxlLCBNaXNjQmF0dGxlSW5wdXQuRG9uZSksSW5wdXRLZXkuRE9ORSk7X281LkFkZChuZXcgSW5wdXQoSW5wdXRUeXBlLk1pc2NCYXR0bGUsIE1pc2NCYXR0bGVJbnB1dC5SZWRvKSxJbnB1dEtleS5SRURPKTtyZXR1cm4gX281O30pO1xyXG5cclxuICAgICAgICAgICAgLy9Db25zb2xlLlJlYWRMaW5lKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFRleHRFbnRpdHkgR2V0UHJvalRleHRFbnRpdHkoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLlR1cm5CYXNlVHJ5VmFsdWVzLkVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBmZSA9IHRleHRXb3JsZC5HZXRUZW1wRW50aXR5KDEsIDEpO1xyXG4gICAgICAgICAgICBmZS5vcmlnaW4uRHJhd0NoYXIoVGV4dEJvYXJkLklOVklTSUJMRUNIQVIsIDAsIDApO1xyXG4gICAgICAgICAgICBpbnQgZWxlbWVudENvbG9yID0gRWxlbWVudFRvUHJvakNvbG9yKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBmZS5vcmlnaW4uU2V0QmFja0NvbG9yKGVsZW1lbnRDb2xvciwgMCwgMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoZmxvYXQgZGVsdGEpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgSW5wdXRLZXkgaW5wdXQgPSAoSW5wdXRLZXkpSW5wdXQ7XHJcbiAgICAgICAgICAgIC8vaWYgKGlucHV0ICE9IElucHV0S2V5Lk5PTkUpIENvbnNvbGUuV3JpdGVMaW5lKGlucHV0KTtcclxuICAgICAgICAgICAgLy9pbnQgaW5wdXROdW1iZXIgPSBpbnB1dCAtICcwJztcclxuICAgICAgICAgICAgLy9pZiAoZGVidWdPbiAmJiBpbnB1dCA9PSAnaycpXHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICBEZWJ1Z0V4dHJhLkRlYnVnRXguU2hvdygpO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgaWYgKHRleHRXb3JsZC5Jc0RvbmUoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFR1cm5CYXNlVHJ5VmFsdWVzLkJhdHRsZVBoYXNlLkVuZW15TW92ZUNob2ljZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHVybkJhc2VUcnkuVGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFR1cm5CYXNlVHJ5VmFsdWVzLkJhdHRsZVBoYXNlLkhhbmRSZWNoYXJnZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHVybkJhc2VUcnkuVGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFR1cm5CYXNlVHJ5VmFsdWVzLkJhdHRsZVBoYXNlLlBpY2tIYW5kczpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gbW92ZUtleXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLlZhbHVlID09IGlucHV0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dXJuQmFzZVRyeS5JbnB1dERvbmUoaXRlbS5LZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVHVybkJhc2VUcnlWYWx1ZXMuQmF0dGxlUGhhc2UuRXhlY3V0ZU1vdmU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vU3lzdGVtLlRocmVhZGluZy5UaHJlYWQuU2xlZXAoMzAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHVybkJhc2VUcnkuVGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIERyYXdHcmFwaGljcyhkZWx0YSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhd0dyYXBoaWNzKGZsb2F0IGRlbHRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHVybkJhc2VUcnkuVXBkYXRlKGRlbHRhKTtcclxuICAgICAgICAgICAgLy9jbGVhciBncmlkXHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5SZXNldCgpO1xyXG5cclxuICAgICAgICAgICAgZ3JpZFNjYWxlID0gNDtcclxuICAgICAgICAgICAgZ3JpZE9mZnNldHggPSAyO1xyXG4gICAgICAgICAgICBncmlkT2Zmc2V0eSA9IDE7XHJcbiAgICAgICAgICAgIGludCBlbmVteUdyaWRPZmZYID0gZ3JpZFNjYWxlICogMztcclxuICAgICAgICAgICAgYm9vbCBkcmF3RG90ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgMyAqIGdyaWRTY2FsZTsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IDMgKiBncmlkU2NhbGU7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZHJhd0RvdClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3Q2hhcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgJy4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkT2Zmc2V0eCArIGksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRPZmZzZXR5ICsgaiwgQ29sb3JzLkdyaWRIZXJvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdDaGFyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZE9mZnNldHggKyBpICsgZW5lbXlHcmlkT2ZmWCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRPZmZzZXR5ICsgaiwgQ29sb3JzLkdyaWRFbmVteSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpICUgZ3JpZFNjYWxlID09IDAgJiYgaiAlIGdyaWRTY2FsZSA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3R3JpZChpICsgZ3JpZE9mZnNldHggKyBlbmVteUdyaWRPZmZYLCBqICsgZ3JpZE9mZnNldHksIGdyaWRTY2FsZSArIDEsIGdyaWRTY2FsZSArIDEsIENvbG9ycy5HcmlkRW5lbXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd0dyaWQoaSArIGdyaWRPZmZzZXR4LCBqICsgZ3JpZE9mZnNldHksIGdyaWRTY2FsZSArIDEsIGdyaWRTY2FsZSArIDEsIENvbG9ycy5HcmlkSGVybyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vZm9yIChpbnQgaSA9IDA7IGkgPCA2OyBpKyspXHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICBmb3IgKGludCBqID0gMDsgaiA8IDM7IGorKylcclxuICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgVGV4dEJvYXJkLkRyYXdDaGFyKFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICcgJyxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBpICogc2NhbGUgKyBzY2FsZSAvIDIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgMiAqIHNjYWxlIC0gaiAqIHNjYWxlICsgc2NhbGUgLyAyKTtcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgLy8gRHJhd01vdmUgZW50aXR5XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdHVybkJhc2VUcnkuZW50aXRpZXMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIFR1cm5CYXNlVHJ5VmFsdWVzLkJhdHRsZUVudGl0eSBnYW1lRW50aXR5ID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVjID0gR2V0Q2hhcihnYW1lRW50aXR5KTtcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lRW50aXR5LkRlYWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBlYy5MZW5ndGg7IGorKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVjW2pdID0gVGV4dEJvYXJkLklOVklTSUJMRUNIQVI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IGdhbWVFbnRpdHkuUG9zaXRpb25WMkQ7XHJcbiAgICAgICAgICAgICAgICBWZWN0b3IyRCBzY3JlZW5Qb3MgPSBCYXR0bGVFbnRpdHlUb1NjcmVlblBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZUVudGl0eS5UeXBlID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5UdXJuQmFzZVRyeVZhbHVlcy5FbnRpdHlUeXBlLnBhbmVsZWZmZWN0KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcmVlblBvcy5ZID0gc2NyZWVuUG9zLlkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcmVlblBvcy5YID0gc2NyZWVuUG9zLlggLSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9iYXR0bGVyRW50aXRpZXNbaV0ub3JpZ2luLlBvc2l0aW9uID0gc2NyZWVuUG9zO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhdHRsZXJFbnRpdGllc1tpXS5vcmlnaW4uUG9zaXRpb24gIT0gc2NyZWVuUG9zICYmIHRleHRXb3JsZC5Jc0RvbmUoKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwb3NBbmltLkFkZChiYXR0bGVyRW50aXRpZXNbaV0uQW5pbUJhc2UoMC4xNWYpLCBuZXcgUG9zaXRpb25BbmltYXRpb24uUG9zaXRpb25EYXRhKGJhdHRsZXJFbnRpdGllc1tpXS5vcmlnaW4uUG9zaXRpb24sIHNjcmVlblBvcywgdHJ1ZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjID0gQ29sb3JzLkhlcm87XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZUVudGl0eS5UeXBlID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5UdXJuQmFzZVRyeVZhbHVlcy5FbnRpdHlUeXBlLmVuZW15KSBjID0gQ29sb3JzLkVuZW15O1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVFbnRpdHkuVHlwZSA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuVHVybkJhc2VUcnlWYWx1ZXMuRW50aXR5VHlwZS5waWNrdXApIGMgPSBDb2xvcnMuaW5wdXRLZXk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZUVudGl0eS5EZWFkKVxyXG4gICAgICAgICAgICAgICAgICAgIGMgPSBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1I7XHJcbiAgICAgICAgICAgICAgICBpbnQgYmMgPSBUZXh0Qm9hcmQuSU5WSVNJQkxFQ09MT1I7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVFbnRpdHkuQWxpdmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLlR1cm5CYXNlVHJ5VmFsdWVzLkVsZW1lbnQgZWxlbWVudCA9IGdhbWVFbnRpdHkuZWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBiYyA9IEVsZW1lbnRUb0F1cmFDb2xvcihlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJhdHRsZXJFbnRpdGllc1tpXS5vcmlnaW4uRHJhdyhlYywgMCwgMCwgYywgYmMpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vYmF0dGxlckVudGl0aWVzW2ldLm9yaWdpbi5TZXRDb2xvcihjLCAwLCAwKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdDaGFyKFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZWMsXHJcbiAgICAgICAgICAgICAgICAvLyAgICB4MSxcclxuICAgICAgICAgICAgICAgIC8vICAgIHkxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGludCB0ZXh0Qm9hcmRIZWlnaHQgPSAzICogZ3JpZFNjYWxlO1xyXG5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IHkgPSAyO1xyXG4gICAgICAgICAgICAgICAgaW50IHggPSA2ICogZ3JpZFNjYWxlICsgMjY7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnBoYXNlID09IFR1cm5CYXNlVHJ5VmFsdWVzLkJhdHRsZVBoYXNlLlBpY2tIYW5kcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBEcmF3Q29udHJvbHMoeSwgeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR1cm5CYXNlVHJ5LnRpbWVUb0Nob29zZSA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbG9hdCByYXRpbyA9IHR1cm5CYXNlVHJ5LnRpbWVUb0Nob29zZSAvIHR1cm5CYXNlVHJ5LnRpbWVUb0Nob29zZU1heDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdSZXBlYXRlZCgnICcsIHgsIHkrMTYsIChpbnQpKHJhdGlvKjE1KSwgMSwgQ29sb3JzLkJvYXJkLCBDb2xvcnMuR3JpZEhlcm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd1JlcGVhdGVkKCcgJywgeCAtIDEsIHkgLSAxLCAxNSwgMTUsIENvbG9ycy5Cb2FyZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGludCB0dXJuT3JkZXJYID0gNiAqIGdyaWRTY2FsZSArIDEwO1xyXG4gICAgICAgICAgICBpbnQgdHVybk9yZGVyWSA9IDI7XHJcblxyXG4gICAgICAgICAgICBEcmF3VHVybk9yZGVyKHR1cm5PcmRlclgsIHR1cm5PcmRlclkpO1xyXG4gICAgICAgICAgICBEcmF3TGlmZSgzLCAxNik7XHJcblxyXG5cclxuICAgICAgICAgICAgVGV4dEJvYXJkLkN1cnNvck5ld0xpbmUoMSk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5DdXJzb3JOZXdMaW5lKDEpO1xyXG4gICAgICAgICAgICAvL3RleHRCb2FyZC5EcmF3X0N1cnNvcih0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZS5Ub1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5EcmF3Q2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLkFkdmFuY2VUaW1lKGRlbHRhKTtcclxuICAgICAgICAgICAgaWYgKHRleHRXb3JsZC5Jc0RvbmUoKSlcclxuICAgICAgICAgICAgICAgIHR1cm5CYXNlVHJ5LmhhcHBNYW5hZ2VyLlRyeUhhbmRsZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50IEVsZW1lbnRUb0F1cmFDb2xvcihQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuVHVybkJhc2VUcnlWYWx1ZXMuRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGJjID0gVGV4dEJvYXJkLklOVklTSUJMRUNPTE9SO1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuVHVybkJhc2VUcnlWYWx1ZXMuRWxlbWVudC5GaXJlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYyA9IENvbG9ycy5GaXJlQXVyYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuVHVybkJhc2VUcnlWYWx1ZXMuRWxlbWVudC5JY2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJjID0gQ29sb3JzLkljZUF1cmE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLlR1cm5CYXNlVHJ5VmFsdWVzLkVsZW1lbnQuVGh1bmRlcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmMgPSBDb2xvcnMuVGh1bmRlckF1cmE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBiYztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGludCBFbGVtZW50VG9Qcm9qQ29sb3IoUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLlR1cm5CYXNlVHJ5VmFsdWVzLkVsZW1lbnQgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBiYyA9IENvbG9ycy5pbnB1dEtleTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLlR1cm5CYXNlVHJ5VmFsdWVzLkVsZW1lbnQuRmlyZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmMgPSBDb2xvcnMuRmlyZVNob3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLlR1cm5CYXNlVHJ5VmFsdWVzLkVsZW1lbnQuSWNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYyA9IENvbG9ycy5JY2VBdXJhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5UdXJuQmFzZVRyeVZhbHVlcy5FbGVtZW50LlRodW5kZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJjID0gQ29sb3JzLlRodW5kZXJBdXJhO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYmM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMkQgQmF0dGxlRW50aXR5VG9TY3JlZW5Qb3NpdGlvbihWZWN0b3IyRCBwb3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgeCA9IHBvcy5YO1xyXG4gICAgICAgICAgICB2YXIgeSA9IHBvcy5ZO1xyXG4gICAgICAgICAgICB2YXIgc2NyZWVuUG9zID0gbmV3IFZlY3RvcjJEKHggKiBncmlkU2NhbGUgKyBncmlkU2NhbGUgLyAyICsgZ3JpZE9mZnNldHgsIDIgKiBncmlkU2NhbGUgLSB5ICogZ3JpZFNjYWxlICsgZ3JpZFNjYWxlIC8gMiArIGdyaWRPZmZzZXR5KTtcclxuICAgICAgICAgICAgcmV0dXJuIHNjcmVlblBvcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEcmF3Q29udHJvbHMoaW50IHksIGludCB4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdHcmlkKHggLSAyLCB5IC0gMSwgMjAsIDE1LCBDb2xvcnMuQm9hcmQpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuU2V0Q3Vyc29yQXQoeCwgeSk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcihcIkNvbnRyb2xzXCIsIENvbG9ycy5XaW5kb3dMYWJlbCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHR1cm5CYXNlVHJ5LmlucHV0cy5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgeDIgPSB4ICsgMTtcclxuICAgICAgICAgICAgICAgIGludCB5MiA9IHkgKyAyICsgaTtcclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHR1cm5CYXNlVHJ5LmlucHV0c1tpXTtcclxuICAgICAgICAgICAgICAgIHN0cmluZyBidXR0b25OYW1lO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vdmVCdXR0b25zLlRyeUdldFZhbHVlKGlucHV0LCBvdXQgYnV0dG9uTmFtZSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uTmFtZSA9IFwiVU5cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpbnQgbGVuZ3RoQm5hbWUgPSBidXR0b25OYW1lLkxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd0NoYXIoJ1snLCB4MiAtIDEsIHkyLCBDb2xvcnMuSGVyb1R1cm4pO1xyXG4gICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXdDaGFyKCddJywgeDIgKyBsZW5ndGhCbmFtZSwgeTIsIENvbG9ycy5IZXJvVHVybik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9UdXJuQmFzZVRyeVZhbHVlcy5Nb3ZlVHlwZSBtb3ZlID0gdHVybkJhc2VUcnkucGxheWVySGFuZFtpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhdyhidXR0b25OYW1lLCB4MiwgeTIsIENvbG9ycy5pbnB1dEtleSk7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgZGVzY3JpcHRpb24gPSBzdHJpbmcuRW1wdHk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQudHlwZSA9PSBJbnB1dFR5cGUuTW92ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuVHVybkJhc2VUcnlWYWx1ZXMuTW92ZVR5cGUgbSA9IChQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuVHVybkJhc2VUcnlWYWx1ZXMuTW92ZVR5cGUpaW5wdXQuYXJnMTtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlRGVzY3JpcHRpb25zLlRyeUdldFZhbHVlKG0sIG91dCBkZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlc2NyaXB0aW9uID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9IG0uVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlucHV0LnR5cGUgPT0gSW5wdXRUeXBlLk1pc2NCYXR0bGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgTWlzY0JhdHRsZUlucHV0IGFyZzEgPSAoTWlzY0JhdHRsZUlucHV0KWlucHV0LmFyZzE7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBtaXNjRGVzY3JpcHRpb25zW2FyZzFdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXcoZGVzY3JpcHRpb24sIHgyICsgMiArIGxlbmd0aEJuYW1lLCB5MiwgQ29sb3JzLkhlcm9UdXJuKTtcclxuICAgICAgICAgICAgICAgIC8vdmFyIGMgPSBtb3ZlQ2hhcnNbbW92ZV07XHJcbiAgICAgICAgICAgICAgICAvL0RyYXdNb3ZlKG1vdmUsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3KGMsIHgyICsgMywgeTIsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3V2l0aEdyaWQoYytcIlwiLCB4MiwgeSArIDIsIENvbG9ycy5IZXJvVHVybik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEcmF3TGlmZShpbnQgdHVybk9yZGVyWCwgaW50IHR1cm5PcmRlclkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd0dyaWQodHVybk9yZGVyWCAtIDEsIHR1cm5PcmRlclkgLSAxLCAyMCwgOSwgQ29sb3JzLldpbmRvd0xhYmVsKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLlNldEN1cnNvckF0KHR1cm5PcmRlclgrMSwgdHVybk9yZGVyWSk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcihcIkxpZmVcIiwgQ29sb3JzLldpbmRvd0xhYmVsKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLlNldEN1cnNvckF0KHR1cm5PcmRlclgrOCwgdHVybk9yZGVyWSk7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcihcIkVsZW1lbnRcIiwgQ29sb3JzLldpbmRvd0xhYmVsKTtcclxuICAgICAgICAgICAgaW50IGluZGV4ID0gLTE7IC8vdXNpbmcgdGhpcyBiZWNhdXNlIG5vdCBhbGwgdW5pdHMgZ2V0IGRyYXduXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdHVybkJhc2VUcnkuZW50aXRpZXMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgICAgIFR1cm5CYXNlVHJ5VmFsdWVzLkJhdHRsZUVudGl0eSBlID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlLmRyYXdMaWZlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4LS07XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWUuRGVhZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgY29sb3IgPSBDb2xvcnMuSGVyb1R1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBUdXJuQmFzZVRyeVZhbHVlcy5FbnRpdHlUeXBlLmVuZW15KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IgPSBDb2xvcnMuRW5lbXlUdXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3T25lRGlnaXRfQ3Vyc29yKChpbnQpZS5saWZlLlZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHhPZmYgPSB0dXJuT3JkZXJYKzE7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IHlPZmYgPSB0dXJuT3JkZXJZICsgMiArIGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3KEdldENoYXIoZSksIHhPZmYsIHlPZmYsIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3Q2hhcihHZXRDaGFyKGUpLCB4T2ZmLCB0dXJuT3JkZXJZICsgMiwgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3T25lRGlnaXQoKGludCllLmxpZmUuVmFsLCB4T2ZmICsgMywgeU9mZiwgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBlbGVtZW50ID0gc3RyaW5nLkVtcHR5O1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZS5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuVHVybkJhc2VUcnlWYWx1ZXMuRWxlbWVudC5GaXJlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IFwiRmlyZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLlR1cm5CYXNlVHJ5VmFsdWVzLkVsZW1lbnQuSWNlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IFwiSWNlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuVHVybkJhc2VUcnlWYWx1ZXMuRWxlbWVudC5UaHVuZGVyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IFwiVGh1bmRlclwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLlR1cm5CYXNlVHJ5VmFsdWVzLkVsZW1lbnQuTm9uZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlQ29sb3IgPSBFbGVtZW50VG9BdXJhQ29sb3IoZS5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkRyYXcoZWxlbWVudCwgeE9mZiArNywgeU9mZiwgZUNvbG9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5EcmF3T25lRGlnaXRfQ3Vyc29yKChpbnQpZS5saWZlLlZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuQ3Vyc29yTmV3TGluZSh4OiAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdUdXJuT3JkZXIoaW50IHR1cm5PcmRlclgsIGludCB0dXJuT3JkZXJZKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmFsdWUgdHVybnNQZXJQaGFzZSA9IHR1cm5CYXNlVHJ5LmJhdHRsZVN0YXRlLnR1cm5zUGVyUGhhc2U7XHJcbiAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3R3JpZCh0dXJuT3JkZXJYIC0gMSwgdHVybk9yZGVyWSAtIDEsIDE0LCA2ICsgdHVybnNQZXJQaGFzZSwgQ29sb3JzLkJvYXJkKTtcclxuICAgICAgICAgICAgVGV4dEJvYXJkLlNldEN1cnNvckF0KHR1cm5PcmRlclgsIHR1cm5PcmRlclkpO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoXCJUdXJuIE9yZGVyXCIsIENvbG9ycy5XaW5kb3dMYWJlbCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHR1cm5CYXNlVHJ5LmVudGl0aWVzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFR1cm5CYXNlVHJ5VmFsdWVzLkJhdHRsZUVudGl0eSBlID0gdHVybkJhc2VUcnkuZW50aXRpZXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoIWUuZHJhd1R1cm4pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWUuRGVhZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgY29sb3IgPSBDb2xvcnMuSGVyb1R1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuVHlwZSA9PSBUdXJuQmFzZVRyeVZhbHVlcy5FbnRpdHlUeXBlLmVuZW15KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IgPSBDb2xvcnMuRW5lbXlUdXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9UZXh0Qm9hcmQuRHJhd09uZURpZ2l0X0N1cnNvcigoaW50KWUubGlmZS5WYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCB4T2ZmID0gdHVybk9yZGVyWCArIDEgKyBpICogMztcclxuICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhdyhHZXRDaGFyKGUpLCB4T2ZmLCB0dXJuT3JkZXJZICsgMiwgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5TZXRDdXJzb3JBdCh4T2ZmLCB0dXJuT3JkZXJZICsgMyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkyID0gMDsgaTIgPCB0dXJuc1BlclBoYXNlOyBpMisrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGNvbG9yMiA9IGNvbG9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSB0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5hY3RpbmdFbnRpdHkgJiYgaTIgPT0gdHVybkJhc2VUcnkuYmF0dGxlU3RhdGUudHVybiAmJiB0dXJuQmFzZVRyeS5iYXR0bGVTdGF0ZS5waGFzZSA9PSBUdXJuQmFzZVRyeVZhbHVlcy5CYXR0bGVQaGFzZS5FeGVjdXRlTW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IyID0gQ29sb3JzLkhlcm87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpMiA8IHR1cm5zUGVyUGhhc2UgJiYgZS5tb3Zlc1tpMl0gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGMgPSBHZXRDaGFyT2ZNb3ZlKGUsIGkyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcihjLCBjb2xvcjIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVGV4dEJvYXJkLkRyYXdfQ3Vyc29yKCcgJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoJyAnLCBjb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgVGV4dEJvYXJkLkN1cnNvck5ld0xpbmUoeDogeE9mZik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvL1RleHRCb2FyZC5DdXJzb3JOZXdMaW5lKHg6IDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0cmluZyBHZXRDaGFyT2ZNb3ZlKFR1cm5CYXNlVHJ5VmFsdWVzLkJhdHRsZUVudGl0eSBlLCBpbnQgaTIpXHJcbiAgICAgICAge1xyXG5cclxuXHJcbiAgICAgICAgICAgIGZsb2F0IHZhbCA9IGUubW92ZXNbaTJdLlZhbDtcclxuICAgICAgICAgICAgaWYgKHZhbCA+PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vdmVDaGFyc1soVHVybkJhc2VUcnlWYWx1ZXMuTW92ZVR5cGUpdmFsXTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiIFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNoYXJbXSBHZXRDaGFyKFR1cm5CYXNlVHJ5VmFsdWVzLkJhdHRsZUVudGl0eSBnYW1lRW50aXR5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVudGl0aWVzQ2hhcnNbZ2FtZUVudGl0eS5ncmFwaGljXTtcclxuICAgICAgICAgICAgLy9jaGFyIGVjID0gJ0AnO1xyXG4gICAgICAgICAgICAvL2lmIChnYW1lRW50aXR5LlR5cGUgPT0gVHVybkJhc2VUcnlWYWx1ZXMuRW50aXR5VHlwZS5lbmVteSlcclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIGlmKGdhbWVFbnRpdHkuZ3JhcGhpYyA9PSAxKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgZWMgPSAnJic7XHJcbiAgICAgICAgICAgIC8vICAgIGlmIChnYW1lRW50aXR5LmdyYXBoaWMgPT0gMilcclxuICAgICAgICAgICAgLy8gICAgICAgIGVjID0gJyUnO1xyXG4gICAgICAgICAgICAvLyAgICBpZiAoZ2FtZUVudGl0eS5ncmFwaGljID09IDMpXHJcbiAgICAgICAgICAgIC8vICAgICAgICBlYyA9ICckJztcclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICAvL3JldHVybiBlYztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEcmF3TW92ZShWYWx1ZSBtb3ZlLCBpbnQgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAobW92ZS5WYWwgPj0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVHVybkJhc2VUcnlWYWx1ZXMuTW92ZVR5cGUgbSA9IChUdXJuQmFzZVRyeVZhbHVlcy5Nb3ZlVHlwZSltb3ZlLlZhbDtcclxuICAgICAgICAgICAgICAgIERyYXdNb3ZlKG0sIGNvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFRleHRCb2FyZC5EcmF3X0N1cnNvcignICcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdNb3ZlKFR1cm5CYXNlVHJ5VmFsdWVzLk1vdmVUeXBlIG1vdmUsIGludCBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjID0gbW92ZUNoYXJzW21vdmVdO1xyXG4gICAgICAgICAgICBUZXh0Qm9hcmQuRHJhd19DdXJzb3IoYywgY29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBHZXRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVGV4dEJvYXJkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBjbGFzcyBDb2xvcnNcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgR3JpZEhlcm8gPSAxO1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IEdyaWRFbmVteSA9IDI7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgSGVybyA9IDM7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgRW5lbXkgPSA0O1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IEhlcm9UdXJuID0gNTtcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBFbmVteVR1cm4gPSA2O1xyXG4gICAgICAgICAgICBwdWJsaWMgY29uc3QgaW50IGlucHV0S2V5ID0gNztcclxuICAgICAgICAgICAgcHVibGljIGNvbnN0IGludCBCb2FyZCA9IDg7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjb25zdCBpbnQgV2luZG93TGFiZWwgPSA5O1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBzdGF0aWMgaW50IEZpcmVBdXJhID0gMTA7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgSWNlQXVyYSA9IDExO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBzdGF0aWMgaW50IFRodW5kZXJBdXJhID0gMTI7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgRmlyZVNob3QgPSAxMztcclxuICAgICAgICAgICAgaW50ZXJuYWwgc3RhdGljIGludCBJY2VTaG90ID0gMTQ7XHJcbiAgICAgICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgVGh1bmRlclNob3QgPSAxNTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIElucHV0S2V5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOT05FLCBMRUZULCBSSUdIVCwgRE9XTiwgVVAsIEZJUkUsIFJFRE8sIERPTkUsXHJcbiAgICAgICAgICAgIElDRSxcclxuICAgICAgICAgICAgVEhVTkRFUixcclxuICAgICAgICAgICAgTk9STUFMU0hPVFxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFBpZHJvaC5UZXh0UmVuZGVyaW5nO1xyXG51c2luZyBQaWRyb2guVHVybkJhc2VkLlRleHRSZW5kZXJpbmc7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBHYW1lTWFpbiA6IElUZXh0U2NyZWVuXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBUdXJuQmFzZVRyeVZhbHVlcyBiYXR0bGVMb2dpYztcclxuICAgICAgICBwcml2YXRlIEJhdHRsZVJlbmRlciBiYXR0bGVSZW5kZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBNb2RlU2VsZWN0aW9uU2NyZWVuIG1vZGVTZWxlY3Rpb25TY3JlZW47XHJcbiAgICAgICAgSVRleHRTY3JlZW4gbWFpbkRyYXc7XHJcbiAgICAgICAgcHJpdmF0ZSBSZXN1bHRTY3JlZW4gcmVzdWx0U2NyZWVuO1xyXG4gICAgICAgIC8vSVRleHRTY3JlZW5bXSBzY3JlZW5zID0gbmV3IElUZXh0U2NyZWVuWzVdO1xyXG4gICAgICAgIGludCBkaWZmaWN1bHR5O1xyXG4gICAgICAgIGludFtdIGVuZW15QW1vdW50ID0gbmV3IGludFtdICAgeyAxLCAxLCAyLCAxLCAyLCAzLCAyLCAzLCAxLCAyLCAzLCAzIH07XHJcbiAgICAgICAgaW50W10gdHVybkFtb3VudCA9IG5ldyBpbnRbXSAgICB7IDIsIDQsIDIsIDYsIDQsIDIsIDYsIDQsIDgsIDgsIDYsIDggfTtcclxuXHJcbiAgICAgICAgcHVibGljIEdhbWVNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZGVTZWxlY3Rpb25TY3JlZW4gPSBuZXcgTW9kZVNlbGVjdGlvblNjcmVlbigpO1xyXG4gICAgICAgICAgICBSZXNldCgpO1xyXG4gICAgICAgICAgICBtYWluRHJhdyA9IG1vZGVTZWxlY3Rpb25TY3JlZW47XHJcbiAgICAgICAgICAgIC8vUmVzZXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBSZXNldCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgbW9kZSA9IG1vZGVTZWxlY3Rpb25TY3JlZW4ubW9kZTtcclxuICAgICAgICAgICAgYm9vbCB0aW1lQXR0YWNrID0gbW9kZVNlbGVjdGlvblNjcmVlbi50aW1lQXR0YWNrO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgYmF0dGxlTG9naWMgPSBuZXcgVHVybkJhc2VUcnlWYWx1ZXMobW9kZSk7XHJcbiAgICAgICAgICAgIGludCBkID0gZGlmZmljdWx0eTtcclxuICAgICAgICAgICAgLy9kID0gMjAwO1xyXG4gICAgICAgICAgICBpZiAoZCA+PSBlbmVteUFtb3VudC5MZW5ndGgpIGQgPSBlbmVteUFtb3VudC5MZW5ndGgtMTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGludCBuRW5lbWllcyA9IGVuZW15QW1vdW50W2RdO1xyXG4gICAgICAgICAgICBiYXR0bGVMb2dpYy5CYXNpY0NvbmZpZyhuZXcgQmF0dGxlQmFzaWNDb25maWcoblR1cm5zOiB0dXJuQW1vdW50W2RdLCBuRW5lbWllczogbkVuZW1pZXMpKTtcclxuICAgICAgICAgICAgZmxvYXQgdGltZVRvQ2hvb3NlID0gLTE7XHJcbiAgICAgICAgICAgIGlmICh0aW1lQXR0YWNrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aW1lVG9DaG9vc2UgPSAoNWYgKiB0dXJuQW1vdW50W2RdKSAqIG5FbmVtaWVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJhdHRsZUxvZ2ljLnRpbWVUb0Nob29zZU1heCA9IHRpbWVUb0Nob29zZTtcclxuICAgICAgICAgICAgYmF0dGxlTG9naWMuSW5pdCgpO1xyXG4gICAgICAgICAgICBiYXR0bGVSZW5kZXIgPSBuZXcgQmF0dGxlUmVuZGVyKGJhdHRsZUxvZ2ljKTtcclxuICAgICAgICAgICAgbWFpbkRyYXcgPSBiYXR0bGVSZW5kZXI7XHJcbiAgICAgICAgICAgIHJlc3VsdFNjcmVlbiA9IG5ldyBSZXN1bHRTY3JlZW4oKTtcclxuICAgICAgICAgICAgcmVzdWx0U2NyZWVuLmJhdHRsZVJlc3VsdCA9IGJhdHRsZUxvZ2ljLmJhdHRsZVJlc3VsdDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IElucHV0IHsgc2V0IHsgbWFpbkRyYXcuSW5wdXQgPSB2YWx1ZTsgfSBnZXQgeyByZXR1cm4gJ2MnOyB9IH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhmbG9hdCBmKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbWFpbkRyYXcuRHJhdyhmKTtcclxuICAgICAgICAgICAgaWYgKG1haW5EcmF3ID09IGJhdHRsZVJlbmRlcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhdHRsZUxvZ2ljLklzT3ZlcigpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiYXR0bGVMb2dpYy5Jc1ZpY3RvcnkoKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZmZpY3VsdHkrKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0U2NyZWVuLkVudGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkRyYXcgPSByZXN1bHRTY3JlZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1haW5EcmF3ID09IHJlc3VsdFNjcmVlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdFNjcmVlbi53YW5uYUxlYXZlID09IDEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWFpbkRyYXcgPT0gbW9kZVNlbGVjdGlvblNjcmVlbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vZGVTZWxlY3Rpb25TY3JlZW4ud2FubmFMZWF2ZSA9PSAxKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIEdldEJvYXJkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBtYWluRHJhdy5HZXRCb2FyZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUmVzdWx0U2NyZWVuIDogSVRleHRTY3JlZW5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIFRleHRXb3JsZCB0ZXh0V29ybGQ7XHJcbiAgICAgICAgc3RyaW5nIHlvdVdpbiA9IFwiWW91IFdpblwiO1xyXG4gICAgICAgIHN0cmluZyB5b3VMb3NlID0gXCJZb3UgbG9zZVwiO1xyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVSZXN1bHQgYmF0dGxlUmVzdWx0O1xyXG4gICAgICAgIHB1YmxpYyBSZXN1bHRTY3JlZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dFdvcmxkID0gbmV3IFRleHRXb3JsZCgpO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQuSW5pdCg3MCwgMjUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgaW50IHdhbm5hTGVhdmU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5wdXQgeyBzZXQ7IGdldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBFbnRlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3YW5uYUxlYXZlID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoZmxvYXQgZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChJbnB1dCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHdhbm5hTGVhdmUgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0cmluZyBtZXNzYWdlID0geW91V2luO1xyXG4gICAgICAgICAgICBpZiAoYmF0dGxlUmVzdWx0LnJlc3VsdCA9PSAyKSBtZXNzYWdlID0geW91TG9zZTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIobWVzc2FnZSwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuQm9hcmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHRCb2FyZCBHZXRCb2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dFdvcmxkLm1haW5Cb2FyZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkO1xyXG51c2luZyBQaWRyb2guVGV4dFJlbmRlcmluZztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIFBpZHJvaC5UdXJuQmFzZWQuVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTW9kZVNlbGVjdGlvblNjcmVlbiA6IElUZXh0U2NyZWVuXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0V29ybGQgdGV4dFdvcmxkO1xyXG4gICAgICAgIHN0cmluZyB5b3VXaW4gPSBcIllvdSBXaW5cIjtcclxuICAgICAgICBzdHJpbmcgeW91TG9zZSA9IFwiWW91IGxvc2VcIjtcclxuICAgICAgICBpbnQgc2VsZWN0aW9uO1xyXG4gICAgICAgIHB1YmxpYyBCYXR0bGVSZXN1bHQgYmF0dGxlUmVzdWx0O1xyXG4gICAgICAgIHB1YmxpYyBNb2RlU2VsZWN0aW9uU2NyZWVuKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZCA9IG5ldyBUZXh0V29ybGQoKTtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLkluaXQoNzAsIDI1KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGludCB3YW5uYUxlYXZlO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgbW9kZTtcclxuICAgICAgICBwdWJsaWMgYm9vbCB0aW1lQXR0YWNrID0gZmFsc2U7XHJcbiAgICAgICAgcHVibGljIGludCBzY3JlZW5TdGFnZTtcclxuXHJcbiAgICAgICAgcHVibGljIGludCBJbnB1dCB7IHNldDsgZ2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEVudGVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdhbm5hTGVhdmUgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhmbG9hdCBmKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5SZXNldCgpO1xyXG4gICAgICAgICAgICBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5IGlrID0gKFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkpIElucHV0O1xyXG4gICAgICAgICAgICBtb2RlID0gLTE7XHJcbiAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhdyhcIlByb2dCYXR0bGUgUHJvdG90eXBlIHYwLjJcIiwgMSwgMSwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8pO1xyXG4gICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXcoXCJBIGdhbWUgYnkgUGlkcm9oXCIsIDEsIDIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvKTtcclxuICAgICAgICAgICAgaWYgKHNjcmVlblN0YWdlID09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoaWspXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5JbnB1dEtleS5MRUZUOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JlZW5TdGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVBdHRhY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LlJJR0hUOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JlZW5TdGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVBdHRhY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuRE9XTjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZUF0dGFjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuVVA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lQXR0YWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJbd10gVmFuaWxsYVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogNCwgYWxpZ25TdHJpbmc6IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiW2FdIEVsZW1lbnRhbFwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogNSwgYWxpZ25TdHJpbmc6IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiW3NdIFZhbmlsbGEgVGltZSBBdHRhY2tcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDYsIGFsaWduU3RyaW5nOiBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIltkXSBFbGVtZW50YWwgVGltZSBBdHRhY2tcIiwgUGlkcm9oLkNvbnNvbGVBcHAuVHVybmJhc2VkLkJhdHRsZVJlbmRlci5Db2xvcnMuR3JpZEhlcm8sIHlPZmY6IDcsIGFsaWduU3RyaW5nOiBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNjcmVlblN0YWdlID09IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpayA9PSBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLklucHV0S2V5LlVQKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlrID09IFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuSW5wdXRLZXkuRE9XTilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JlZW5TdGFnZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIkVsZW1lbnRhbCBNb2RlXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiAtNSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIkZpcmUgYmVhdHMgSWNlLCBJY2UgYmVhdHMgVGh1bmRlciwgVGh1bmRlciBiZWF0cyBmaXJlXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiAtMik7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIlNhbWUgZWxlbWVudCA9IG5vIGRhbWFnZVwiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogMCk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0V29ybGQubWFpbkJvYXJkLkRyYXdPbkNlbnRlcihcIkl0IGlzIGJlc3QgdG8gaGF2ZSBoYWQgc29tZSBleHBlcmllbmNlIHdpdGggdmFuaWxsYSBtb2RlXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiAxKTtcclxuICAgICAgICAgICAgICAgIHRleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKFwiW3ddIFN0YXJ0IEVsZW1lbnRhbCBNb2RlXCIsIFBpZHJvaC5Db25zb2xlQXBwLlR1cm5iYXNlZC5CYXR0bGVSZW5kZXIuQ29sb3JzLkdyaWRIZXJvLCB5T2ZmOiA0LCBhbGlnblN0cmluZzogZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGV4dFdvcmxkLm1haW5Cb2FyZC5EcmF3T25DZW50ZXIoXCJbc10gR28gYmFja1wiLCBQaWRyb2guQ29uc29sZUFwcC5UdXJuYmFzZWQuQmF0dGxlUmVuZGVyLkNvbG9ycy5HcmlkSGVybywgeU9mZjogNSwgYWxpZ25TdHJpbmc6IGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChtb2RlID49IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHdhbm5hTGVhdmUgPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAvL3N0cmluZyBtZXNzYWdlID0geW91V2luO1xyXG4gICAgICAgICAgICAvL2lmIChiYXR0bGVSZXN1bHQucmVzdWx0ID09IDIpIG1lc3NhZ2UgPSB5b3VMb3NlO1xyXG4gICAgICAgICAgICAvL3RleHRXb3JsZC5tYWluQm9hcmQuRHJhd09uQ2VudGVyKG1lc3NhZ2UsIENvbG9ycy5Cb2FyZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dEJvYXJkIEdldEJvYXJkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXh0V29ybGQubWFpbkJvYXJkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgUGlkcm9oLlRleHRSZW5kZXJpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEJsaW5rQW5pbSA6IFRleHRBbmltYXRpb248QmxpbmtBbmltLkJsaW5rRGF0YT5cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIEJsaW5rRGF0YSBtYWluRGF0YSwgZmxvYXQgcHJvZ3Jlc3MsIGZsb2F0IGxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuTW9kaWZ5KGVudGl0eSwgbWFpbkRhdGEsIHByb2dyZXNzLCBsZW5ndGgpO1xyXG4gICAgICAgICAgICBmbG9hdCBhdXggPSBwcm9ncmVzcztcclxuICAgICAgICAgICAgYm9vbCBibGluayA9IHRydWU7XHJcbiAgICAgICAgICAgIHdoaWxlICh0cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmxpbmspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4IC09IG1haW5EYXRhLmJsaW5rQWN0aXZlVGltZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdXggLT0gbWFpbkRhdGEuYmxpbmtJbmFjdGl2ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhdXggPCAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJsaW5rID0gIWJsaW5rO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghYmxpbmspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGVudGl0eS5hbmltYXRpb24uU2V0QWxsKG1haW5EYXRhLnRleHQsIG1haW5EYXRhLnRleHRDb2xvciwgbWFpbkRhdGEuYmFja0NvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJ1Y3QgQmxpbmtEYXRhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY2hhciB0ZXh0O1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaW50IGJhY2tDb2xvciwgdGV4dENvbG9yO1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZmxvYXQgYmxpbmtBY3RpdmVUaW1lO1xyXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZmxvYXQgYmxpbmtJbmFjdGl2ZTtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBCbGlua0RhdGEoY2hhciB0ZXh0LCBpbnQgYmFja0NvbG9yLCBpbnQgdGV4dENvbG9yLCBmbG9hdCBibGlua0FjdGl2ZVRpbWUsIGZsb2F0IGJsaW5rSW5hY3RpdmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhY2tDb2xvciA9IGJhY2tDb2xvcjtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbG9yID0gdGV4dENvbG9yO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ibGlua0FjdGl2ZVRpbWUgPSBibGlua0FjdGl2ZVRpbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJsaW5rSW5hY3RpdmUgPSBibGlua0luYWN0aXZlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIEJsaW5rRGF0YSBCYWNrQ29sb3IoaW50IGJhY2tDb2xvciwgZmxvYXQgYmxpbmtEdXJhdGlvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCbGlua0RhdGEoVGV4dEJvYXJkLk5PQ0hBTkdFQ0hBUiwgYmFja0NvbG9yLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgYmxpbmtEdXJhdGlvbiwgYmxpbmtEdXJhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgQmxpbmtEYXRhIENoYXIoY2hhciBjLCBmbG9hdCBibGlua0R1cmF0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJsaW5rRGF0YShjLCBUZXh0Qm9hcmQuTk9DSEFOR0VDT0xPUiwgVGV4dEJvYXJkLk5PQ0hBTkdFQ09MT1IsIGJsaW5rRHVyYXRpb24sIGJsaW5rRHVyYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIm5hbWVzcGFjZSBQaWRyb2guVGV4dFJlbmRlcmluZ1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQ2hhckJ5Q2hhckFuaW1hdGlvbiA6IFRleHRBbmltYXRpb248Q2hhckJ5Q2hhckFuaW1hdGlvbi5DaGFyQnlDaGFyRGF0YT5cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBNb2RpZnkoVGV4dEVudGl0eSBlbnRpdHksIENoYXJCeUNoYXJEYXRhIG1haW5EYXRhLCBmbG9hdCBwcm9ncmVzcywgZmxvYXQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Nb2RpZnkoZW50aXR5LCBtYWluRGF0YSwgcHJvZ3Jlc3MsIGxlbmd0aCk7XHJcbiAgICAgICAgICAgIGZsb2F0IHJhdGlvID0gcHJvZ3Jlc3MgLyBsZW5ndGg7XHJcbiAgICAgICAgICAgIGZsb2F0IGxlbmd0aFRleHQgPSBtYWluRGF0YS5jaGFyRW5kIC0gbWFpbkRhdGEuY2hhclN0YXJ0O1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gbWFpbkRhdGEuY2hhclN0YXJ0OyBpIDwgbWFpbkRhdGEuY2hhckVuZDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgb2Zmc2V0ZWQgPSBpO1xyXG4gICAgICAgICAgICAgICAgaW50IGxpbmUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRiID0gZW50aXR5LmFuaW1hdGlvbjtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChvZmZzZXRlZCA+PSB0Yi5XaWR0aClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lKys7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ZWQgLT0gdGIuV2lkdGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA+ICgobGVuZ3RoVGV4dCAqIHJhdGlvKSArIG1haW5EYXRhLmNoYXJTdGFydCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGIuRHJhd0NoYXIoJyAnLCBvZmZzZXRlZCwgbGluZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90Yi5EcmF3KFwiXCIgKyBpLCA2LCA1LCAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgY2xhc3MgQ2hhckJ5Q2hhckRhdGFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludGVybmFsIGludCBjaGFyU3RhcnQ7XHJcbiAgICAgICAgICAgIGludGVybmFsIGludCBjaGFyRW5kO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIENoYXJCeUNoYXJEYXRhKGludCBjaGFyU3RhcnQsIGludCBjaGFyRW5kKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXJTdGFydCA9IGNoYXJTdGFydDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhckVuZCA9IGNoYXJFbmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0KfQo=

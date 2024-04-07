package com.example.demo.Estados.domain;


import com.example.demo.Usuario.domain.Usuario;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "estados")
public class Estados {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Size(max = 50)
    private String nickname;

    @ElementCollection
    @CollectionTable(name = "estados_contenidos", joinColumns = @JoinColumn(name = "estado_id"))
    @Column(name = "url")
    private List<String> contenidos = new ArrayList<>();

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "fecha_creacion", nullable = false) // Configura el nombre de la columna
    private Date fechaCreacion;


    private String user_profilepicture;

    private int cantidadReacciones;

    private boolean isReport;


    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario; // Relación con Usuario

    public Estados() {
    }

    public Estados(Long id, String nickname, String contenido, Date fechaCreacion, String user_profilepicture, int cantidadReacciones, boolean isReport, Usuario usuario,
                   List<String> contenidos) {
        this.id = id;
        this.nickname = nickname;
        this.contenidos = contenidos;
        this.fechaCreacion = fechaCreacion;
        this.user_profilepicture = user_profilepicture;
        this.cantidadReacciones = cantidadReacciones;
        this.isReport = isReport;
        this.usuario = usuario;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public List<String> getContenidos() {
        return contenidos;
    }

    public void setContenidos(List<String> contenidos) {
        this.contenidos = contenidos;
    }

    public Date getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(Date fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }



    public int getCantidadReacciones() {
        return cantidadReacciones;
    }

    public void setCantidadReacciones(int cantidadReacciones) {
        this.cantidadReacciones = cantidadReacciones;
    }

    public boolean isReport() {
        return isReport;
    }

    public void setReport(boolean report) {
        isReport = report;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getUser_profilepicture() {
        return user_profilepicture;
    }

    public void setUser_profilepicture(String user_profilepicture) {
        this.user_profilepicture = user_profilepicture;
    }

}

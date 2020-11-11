package lab3.model;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Table(name = "points")
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    @Column(name = "x", nullable = false)
    private Double x;
    @Column(name = "y", nullable = false)
    private Double y;
    @Column(name = "r", nullable = false)
    private int r;
    @Column(name = "result", nullable = false)
    private String result;
    @Column(name = "time", nullable = false)
    private String time;

    public Point() {
    }

    public Point(Double x, Double y, int r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = checkArea() ? "Попала" : "Не попала";
        this.time = new SimpleDateFormat("HH:mm:ss dd.MM.yyyy").format(new Date());
    }

    private boolean checkArea() {
        if (y >= 0)
            return ((x >= -r && x <= 0 && y <= r / 2d)// rectangle
                    || (x >= 0 && y <= (r - x) / 2)); // triangle
        if (y <= 0)
            return (x >= 0 && x * x + y * y <= r * r / 4d);

        return false;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Double getX() {
        return x;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public Double getY() {
        return y;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public int getR() {
        return r;
    }

    public void setR(int r) {
        this.r = r;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
